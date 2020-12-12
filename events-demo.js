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
}

var destroy = function() {
}
