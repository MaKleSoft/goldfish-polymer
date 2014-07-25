Polymer("goldfish-inbox", {
    ready: function() {
        goldfish.api.inbox().done(function(items) {
            this.items = items;
        }.bind(this));
    }
});