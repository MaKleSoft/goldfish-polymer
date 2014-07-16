Polymer("goldfish-inbox", {
    ready: function() {
        console.log("ready!");
    },
    handleResponse: function() {
        console.log("response!", arguments);
    }
});