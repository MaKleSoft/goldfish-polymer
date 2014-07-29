window.goldfish = window.goldfish || {};

goldfish.api = (function() {
    var baseUrl = "https://beta.goldfishapp.co/app/rest/v2/",
        apiKey = "49545-a101b6dd-2fa6-4c50-8db2-044438a5165b";

    function objToUrl(obj) {
        return Object.keys(obj).map(function(key){
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }).join('&');
    }

    function request(path, method, data) {
        var url = baseUrl + path,
            req = new XMLHttpRequest(),
            deferred = Q.defer();

        if (method === "GET" && data) {
            url += "?" + objToUrl(data);
            data = "";
        }

        function handleError(e) {
            deferred.reject(e);
            if (errorHandler) {
                errorHandler(e);
            }
        }

        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    try {
                        var res = JSON.parse(req.responseText);
                        deferred.resolve(res);
                    } catch(e) {
                        deferred.reject(e);
                    }
                } else {
                    deferred.reject(req);
                }
            }
        }.bind(this);

        req.open(method, url, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Authorization", apiKey);
        req.send(JSON.stringify(data));

        return deferred.promise;
    }

    /**
     * Copies over all properties from the _source_ to the _target_. Properties
     * will only be overwritten if _overwrite_ is true. Returns the _target_ object
     */
    function mixin(target, source, overwrite) {
        for (var prop in source) {
            if (source.hasOwnProperty(prop) && (overwrite || !target.hasOwnProperty(prop))) {
                target[prop] = source[prop];
            }
        }
        return target;
    }

    var store = {};

    var base = {
        path: "",
        model: "",
        pk: "id",
        store: function(obj) {
            var pk = obj[this.pk],
                st = store[this.model] = store[this.model] || {},
                o = st[pk] = st[pk] || {};

            return mixin(o, obj, true);
        },
        list: function(opts) {
            return request(this.path, "GET", opts).then(function(res) {
                return res.data.map(this.store.bind(this));
            }.bind(this));
        }
    };

    return {
        request: request,
        base: base
    };
})();