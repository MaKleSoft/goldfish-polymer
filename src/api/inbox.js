goldfish.api.inbox = (function(base) {
    var inbox = Object.create(base);
    inbox.path = "inbox";
    inbox.model = "inbox";
    inbox.pk = "date";

    return inbox.list.bind(inbox);
})(goldfish.api.base);