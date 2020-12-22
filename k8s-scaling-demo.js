var init = function() {
    plugins.load("k8s");
    plugins.load("log");
    log.info("Running k8s scaling demo");
}

var run = function() {
    
    // Demonstrator script that uses a label value to automatically verify the minimum number of replica's for a deployment.
    
    deployments = k8s.apps().deployments().withLabel("automator/min-replicas").list();
    count = deployments.getItems().size();
    for( i=0 ; i < count ; i++ ) {
      var deployment = deployments.getItems().get(i);
      var name = deployment.getMetadata().getName();
      var replica = deployment.getSpec().getReplicas();
      var expected = parseInt(deployment.getMetadata().getLabels().get("automator/min-replicas"));
      if( replica < expected ) {
        log.info("Bumping up replica for "+name+" from "+replica+" to "+expected);
        k8s.apps().deployments().inNamespace("default").withName(name).scale(expected);
      }
   }
}

var destroy = function() {
}