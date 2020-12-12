var onReceiveEvent = function(event) {
    log.info("Demo received event: "+event.getMessage());
}

var init = function() {
    plugins.load("log");
    plugins.load("eventbus");
    log.info("Loaded event demo.");
    eventbus.register(onReceiveEvent, "scripts.executed");
}

var run = function() {
}

var destroy = function() {
}
