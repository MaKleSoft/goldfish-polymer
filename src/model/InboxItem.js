(function() {
    function InboxItem() {
        Model.apply(this, arguments);
    }
    InboxItem.prototype = Object.create(Model.prototype);
    InboxItem.prototype.constructor = InboxItem;

    InboxItem.prototype = {
        get shortTime() {
            var dt = new Date().getTime() - new Date(this.recentEvent.activityDate),
                s = Math.floor(dt / 1000),
                mi = Math.floor(s / 60),
                h = Math.floor(mi / 60),
                d = Math.floor(h / 24),
                mo = Math.floor(d / 30), // Not 100% precise but should be sufficient,
                y = Math.floor(mo / 12);

            if (mi < 1) {
                return s + "s";
            } else if (h < 1) {
                return mi + "mi";
            } else if (d < 1) {
                return h + "h";
            } else if (mo < 1) {
                return d + "d";
            } else if (y < 1) {
                return mo + "m";
            } else {
                return y + "y";
            }
        }
    };

    module.register("model.InboxItem", InboxItem);
})();