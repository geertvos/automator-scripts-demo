var init = function() {
    plugins.load("log");
    plugins.load("k8s");
    plugins.load("slack");
    plugins.load("rabbitmq");
    log.info("Loaded demo plugin.");
    slack.send("#dev-monitoring","Hi this is Automator! From now on I am running all your Automator scripts to help automate your k8s cluster.");
}

var run = function() {
    services = k8s.services().list();
    for (i=0; i< services.getItems().size(); i++) {
      service = services.getItems().get(i);
      log.info(service.getMetadata().getName());
    }
    slack.send("#dev-monitoring","Hi this is Automator! You now have "+services.getItems().size()+" services running.");
    
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
