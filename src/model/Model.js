window.Model = (function() {
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

    function Model(opts) {
        mixin(this, opts);
    }

    return Model;
})();