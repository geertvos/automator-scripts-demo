var init = function() {
    plugins.load("log");
    plugins.load("eventbus");
    log.info("Loaded event demo.");
    eventbus.register(this, "scripts.executed");
}

var onReceiveEvent = function(event) {
    log.info("Demo received event: "+event.getMessage());
}

var run = function() {
}

var destroy = function() {
}
