var Bus = require('../src/bus.js');
var Promise = require('promise');

describe("bus", function() {

	var bus;

	beforeEach(function () {
		bus = new Bus();
	});

	it("send method return void functions with non-existent domain", function() {

		expect(typeof bus.send('test')).toBe('function');
	});

	it("send method return a function with existent domain", function() {

		bus.on('test', function (done){done()});

		expect(typeof bus.send('test')).toBe('function');
	});

	it("subscribed function receives a message", function(done) {

		bus.on('test', function (data, cb) {
			cb();
			expect(data).toEqual('msg');
			done();
		});

		bus.send('test')('msg');
	});

	it("subscribed function at same domain receives a message", function(done) {

		var timesCalled = 0;
		var timesToFinish = 2;

		function callCount () {
			timesCalled++;
			if (timesCalled >= timesToFinish) {
				done();
			}
		}

		bus.on('testMultiple', function (data, done) {
			done();
			expect(data).toEqual('msgMultiple');
			callCount();
		});

		bus.on('testMultiple', function (data, done) {
			done();
			expect(data).toEqual('msgMultiple');
			callCount();
		});

		bus.send('testMultiple')('msgMultiple');
	});

	it("send return a promise", function() {
		var value = bus.send('test')('msg');
		expect(value).toEqual(jasmine.any(Promise));
	});

	it("promises satified when subscriber calls done", function(done) {
		bus.on('test', function (data, done) {
			setTimeout(done, 100);
		});

		var value = bus.send('test')('msg');
		value.then(function () {
			done();
		});
	});

	it("promises satified when subscriber calls done before the promise 'then' declaration", function(done) {
		bus.on('test', function (data, done) {
			done();
		});

		var value = bus.send('test')('msg');
		value.then(function () {
			done();
		});
	});

	it("promises satified whith the value passed to done", function(done) {
		bus.on('test', function (data, done) {
			done('test');
		});

		var value = bus.send('test')('msg');
		value.then(function (data) {
			expect(data).toBe('test');
			done();
		});
	});
});
