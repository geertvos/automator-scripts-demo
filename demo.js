var init = function() {
    plugins.load("log");
    plugins.load("k8s");
    plugins.load("slack");
    plugins.load("rabbitmq");
    log.info("Loaded demo plugin.");
    slack.send("#dev-monitoring","Hi this is Automator! From now on I am running all your Automator scripts to help automate your k8s cluster.");
}

var run = function() {
    list = k8s.listPodForAllNamespaces(null, null, null, null, null, null, null, null, null);
    for (i=0; i< list.getItems().size(); i++) {
      var item = list.getItems().get(i);
      log.info(item.getMetadata().getName());
    }
    slack.send("#dev-monitoring","Hi this is Automator! You now have "+list.getItems().size()+" pods running. Test Update!");
    
    nodes = rabbitmq.getNodes();
    for(i=0; i < nodes.size(); i++) {
        var node = nodes.get(i);
        log.info("RabbitMQ Node: "+node.getName());
    }
}

var destroy = function() {
    slack.send("#dev-monitoring","Goodbye. I am unloaded and will no longer run on your cluster.");
}
