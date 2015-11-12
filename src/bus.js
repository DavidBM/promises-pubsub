'use strict';
var debugLog = require('debug')('bus:log');
var debugVerbose = require('debug')('bus:verbose');
var debugWarning = require('debug')('bus:warning');
var Promise = require('promise');

module.exports = exports = Bus;

function voidFunction () {
	var msg = 'message without receiver. Data:';
	debugWarning(msg, arguments);
	return Promise.reject(new Error(msg + JSON.stringify(arguments)));
}

function Bus () {
	if (!(this instanceof Bus)) return new Bus();
	this.callbacks = {};
	this.preFunctions = {};
	this.sendedMessages = 0;
}

Bus.prototype.on = function(name, callback) {
	var _this = this;
	if(typeof this.callbacks[name] !== "undefined")
		return this.callbacks[name].push(callback);

	var callbacks = this.callbacks[name] = [callback];

	this.preFunctions[name] = function() {
		return _this._callCallbacks(callbacks, arguments);
	};
};

Bus.prototype.off = function(name, callback) {
	if(typeof this.callbacks[name] === "undefined") return;

	if(typeof callback === "undefined")
		return this._deleteAllCallbacks(name);

	this._unsubscribeCallback(name, callback);
};

Bus.prototype._unsubscribeCallback = function(name, callback) {
	for(var i = this.callbacks[name].length - 1; i >= 0; i--) {
		if(this.callbacks[name][i] === callback)
			this.callbacks[name].splice(i, 1);
	}

	if(this.callbacks[name].length <= 0)
		this._deleteAllCallbacks(name);
};

Bus.prototype._deleteAllCallbacks = function(name) {
	delete this.callbacks[name];
	delete this.preFunctions[name];
};

Bus.prototype.send = function(name) {
	if(!this.preFunctions[name]){
		debugWarning('message without receiver. Name: ', name);
		return voidFunction;
	}

	debugLog('message send: ', name);
	return this.preFunctions[name];
};

Bus.prototype.getEventsNames = function() {
	var events = [];

	for(var eventName in this.callbacks)
		events.push(eventName);

	return events;
};

Bus.prototype.getMetrics = function() {
	var subscriptors = 0;
	var listeners = 0;
	var name;

	for(name in this.callbacks)
		subscriptors++;

	for(name in this.callbacks)
		listeners++;

	return {
		subscriptors: subscriptors,
		listeners: listeners,
		sendedMessages: this.sendedMessages
	};
};

Bus.prototype._callCallbacks = function(functions, args) {
	this.sendedMessages += functions.length;

	return createPromise(functions, args);
};

function createPromise (functions, args) {
	return new Promise(function (resolve, reject) {
		var argsArray = getArguments(args, resolve);
		callAsyncFunctions(functions, argsArray);

		if(functions.length <= 0) resolve();
	});
}

function callAsyncFunctions (functions, argsArray) {
	debugVerbose(argsArray);
	for (var i = functions.length - 1; i >= 0; i--)
		callAsyncFunction(functions[i], argsArray);
}

function callAsyncFunction (func, args) {
	setTimeout(function () {
		func.apply(null, args);
	}, 0);
}

function getArguments (args, resolve) {
	var argsArray = argumentsToArray(args);
	argsArray.push(resolve);
	return argsArray;
}

function argumentsToArray (args) {
	return Array.prototype.slice.call(args);
}
