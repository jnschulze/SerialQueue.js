SerialQueue.js
==============

Enables serial processing of enqueued items using an asynchronous worker function.

```javascript

var myWorker = function(item, next) {
    // Process your item (FOO, BAR, etc.) here.
    
    // call next() when finished.
    next();
};

var queue = new SerialQueue(myWorker);
queue.push('FOO');
queue.push('BAR');
```

All enqueued items are processed using the specified worker function which is expected to call 'next' when it has finished processing the respective item.
