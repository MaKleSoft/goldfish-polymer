window.goldfish = window.goldfish || {};

goldfish.api = (function() {
    var baseUrl = "https://proofing.goldfishapp.co/app/rest/v2/",
        apiKey = "173019-2eb263fc-35ae-42ca-9721-7869745c7720";

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

    var base = {
        path: "",
        list: function(opts) {
            return request(this.path, "GET", opts).then(function(res) {
                return res.data;
            });
        }
    };

    return {
        request: request,
        base: base
    };
})();