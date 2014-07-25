goldfish.api.inbox = (function() {
    var inbox = goldfish.api.base.list.bind({
        path: "inbox"
    });

    return inbox;
})();