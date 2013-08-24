;(function(undefined){
    'use strict';

    function extend(target) {
        var i = 0,
            args = [].slice.call(arguments, 1),
            _len = args.length,
            _curObj;

        for(; i < _len; i++) {
            _curObj = args[i];
            if(_curObj) {
                for(var prop in _curObj) {
                    target[prop] = _curObj[prop];
                }
            }
        }

        return target;
    }

    function inherit(parent, protoProps) {
        var child; 

        if(protoProps && hasOwnProperty.call(protoProps, 'constructor')) {
            child = protoProp.constructor;
        } else {
            child = function(){ return parent.apply(this, arguments); };
        }

        extend(child, parent);

        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();

        if(protoProps) extend(child.prototype, protoProps);

        child.__super__ = parent.prototype;

        return child;
    }


    this.Clustering = {
        _extend: extend,
        _inherit: inherit
    };

}).call(typeof window !== undefined ? window : module.exports);