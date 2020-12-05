var init = function() {
    log.info("Loaded demo plugin.");
    slack.send("#dev-monitoring","Hi this is Automator! From now on I am running on Automator to help automate your k8s cluster.");
}

var run = function() {
    list = k8s.listPodForAllNamespaces(null, null, null, null, null, null, null, null, null);
    for (i=0; i< list.getItems().size(); i++) {
      var item = list.getItems().get(i);
      log.info(item.getMetadata().getName());
    }
    //slack.send("#dev-monitoring","Hi this is Automator! You now have "+list.getItems().size()+" pods running. Test Update!");
}

var destroy = function() {
    slack.send("#dev-monitoring","Goodbye. I am unloaded and will no longer run on your cluster.");
}
