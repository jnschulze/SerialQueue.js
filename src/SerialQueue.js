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

        push: function(item)
        {
            this._q.push(item);
            this._run();
        },

        _runNext: function(done)
        {
            var self = this;

            var workerDone = function()
            {
                if(self._q.length)
                    self._worker(self._q.shift(), workerDone);
                else
                    done();
            }

            workerDone();
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
