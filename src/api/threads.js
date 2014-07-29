goldfish.api.threads = (function(base) {
    var threads = Object.create(base);

    threads.path = "threads";
    threads.model = "thread";

    return threads;
})(goldfish.api.base);