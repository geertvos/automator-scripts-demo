var init = function() {
    plugins.load("log");
    plugins.load("events");
    log.info("Loaded event demo.");
    events.register(this, "scripts.executed");
}

var onReceiveEvent = function(event) {
    log.info("Demo received event: "+event.getMessage());
}

var run = function() {
    list = k8s.listPodForAllNamespaces(null, null, null, null, null, null, null, null, null);
    for (i=0; i< list.getItems().size(); i++) {
      var item = list.getItems().get(i);
      log.info(item.getMetadata().getName());
    }
    slack.send("#dev-monitoring","Hi this is Automator! You now have "+list.getItems().size()+" pods running.");
    
    nodes = rabbitmq.getNodes();
    for(i=0; i < nodes.size(); i++) {
        var node = nodes.get(i);
        log.info("RabbitMQ Node: "+node.getName()+" memory used: "+node.getMemoryUsed());
        slack.send("#dev-monitoring","Your RabbitMQ node "+node.getName()+" is using this much memory: "+node.getMemoryUsed());
    }
}

var destroy = function() {
    slack.send("#dev-monitoring","Goodbye. I am unloaded and will no longer run on your cluster.");
}
