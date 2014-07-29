goldfish.api.inbox = (function(base, threads) {
    var inbox = Object.create(base);
    inbox.path = "inbox";
    inbox.model = "inbox";
    inbox.pk = "date";
    inbox.related = {
        thread: threads
    };

    return inbox.list.bind(inbox);
})(goldfish.api.base, goldfish.api.threads);