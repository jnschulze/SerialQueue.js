;(function (name, definition) {
    var theModule = definition(),
    hasDefine = typeof define === 'function' && define.amd,
    hasExports = typeof module !== 'undefined' && module.exports;

    if(hasDefine) // AMD Module
        define(theModule);
    else if(hasExports) // Node.js Module
        module.exports = theModule;
    else
        this[name] = theModule;
})('SerialQueue', function() {

    'use strict';

    var Q = function(worker)
    {
        this._running = false;
        this._worker  = worker;
        this._q = [];
    };

    Q.prototype = {
        constructor: Q,

        push: function(item, worker)
        {
            this._q.push({item: item, worker: worker});
            this._run();
        },

        _runNext: function(done)
        {
            var self = this;
            var next = function()
            {
                if(self._q.length)
                {
                    var task = self._q.shift();
                    (task.worker || self._worker)(task.item, next);
                }
                else
                {
                    done();
                }

            };

            next();
        },

        _run: function()
        {
            var self = this;
            if(!self._running)
            {
                self._running = true;
                self._runNext(function()
                {
                    self._running = false;
                });
            }
        }
    };

    return Q;
});
