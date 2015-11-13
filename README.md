# promises-pubsub

It's a simple pub/sub bus with the capacity of making a rpc in the pub.

Yo can use in the **backend** or in the **frontend** with **browserify** or similars.
Aditionally, you can generate a bundle for linking directly in the HTML with `gulp build`.

The tests are in jasmine and can be executed with `gulp test`.

```js
var Bus = require('promises-pubsub'); //On Node or Browserify
var bus = new Bus();

bus.on('test', function(name, done){
      done('Hello ' + name);
});

bus.send('test')('David')
.then(function (response) {
    console.log(response); //"Hello David"
});
```

The first response is the response that receive the resolved Promise

If you opted for make a bundle and linking directly in the HTML the code would look like:

```js
var bus = new PubSubBus();

bus.on('test', function(name, done){
      done('Hello ' + name);
});

bus.send('test')('David')
.then(function (response) {
    console.log(response); //"Hello David"
});
```

## API

### bus.off(String, Function)

Unsubscribe a function

### bus.off(String)

Unsubscribe all functions

### bus.on(String, function(..., done))

Subscribe a function.

 - The function must calls done when finish the work.
 - The arguments on the callback must be equal than the arguments supplied on send.
 - Only one argument can be supplied to the done() callback

```js

bus.on('test', function(a, b, done){ //two arguments + done
    done(a + ' ' + b); //Only one argument can be passed
});

bus.send('test')('Hello', 'world') //two parameters
.then(function(text) { //Only one argument can be received
    console.log(text); //"Hello world"
});
```

### bus.send(String)(...)

Publish a message. Return a Promise that will be satisfied when any subscriber call done or rejected if there is no subscribers

The parameters supplied to the second brackets must be the same that the subscriber has in the callback.

### bus.getEventsNames()

Return all events names in an Array.

### bus.getMetrics()

Return an object with the quantity of `subscriptors`, `listeners` and `sendedMessages`

## Considerations

### Channels

The concept of channels can be simulated with more than one instance of Bus(). Every `new Bus();` creates a "channel".

### Asynchronicity

The bus is asynchronous always.

### RPC

All the listeners must have in the last argument the `done` callback and their firm must be the same that when the publisher call the send method.
