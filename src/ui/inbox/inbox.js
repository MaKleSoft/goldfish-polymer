(function(inbox) {

Polymer("goldfish-inbox", {
    ready: function() {
        inbox().done(function(items) {
            this.items = items;
        }.bind(this));
    }
});

})(goldfish.inbox);