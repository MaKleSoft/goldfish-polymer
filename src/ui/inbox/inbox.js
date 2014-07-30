(function(Polymer, inbox) {
"use strict";

Polymer("goldfish-inbox", {
    ready: function() {
        inbox().done(function(items) {
            this.items = items;
        }.bind(this));
    }
});

})(Polymer, goldfish.inbox);