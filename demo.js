var init = function() {
    log.info("Loaded demo plugin");
}

var run = function() {
    
    
    list = k8s.listPodForAllNamespaces(null, null, null, null, null, null, null, null, null);
    for (i=0; i< list.getItems().size(); i++) {
      var item = list.getItems().get(i);
      log.info(item.getMetadata().getName());
    }
    
    slack.send("#dev-monitoring","Hi this is Automator! You now have "+list.getItems().size()+" pods running. Test Update!");
}
