!function e(n,t,r){function o(i,c){if(!t[i]){if(!n[i]){var u="function"==typeof require&&require;if(!c&&u)return u(i,!0);if(s)return s(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var f=t[i]={exports:{}};n[i][0].call(f.exports,function(e){var t=n[i][1][e];return o(t?t:e)},f,f.exports,e,n,t,r)}return t[i].exports}for(var s="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(e,n,t){"use strict";function r(){if(u.length)throw u.shift()}function o(e){var n;n=c.length?c.pop():new s,n.task=e,i(n)}function s(){this.task=null}var i=e("./raw"),c=[],u=[],a=i.makeRequestCallFromTimer(r);n.exports=o,s.prototype.call=function(){try{this.task.call()}catch(e){o.onerror?o.onerror(e):(u.push(e),a())}finally{this.task=null,c[c.length]=this}}},{"./raw":2}],2:[function(e,n,t){(function(e){"use strict";function t(e){c.length||(i(),u=!0),c[c.length]=e}function r(){for(;a<c.length;){var e=a;if(a+=1,c[e].call(),a>f){for(var n=0,t=c.length-a;t>n;n++)c[n]=c[n+a];c.length-=a,a=0}}c.length=0,a=0,u=!1}function o(e){var n=1,t=new l(e),r=document.createTextNode("");return t.observe(r,{characterData:!0}),function(){n=-n,r.data=n}}function s(e){return function(){function n(){clearTimeout(t),clearInterval(r),e()}var t=setTimeout(n,0),r=setInterval(n,50)}}n.exports=t;var i,c=[],u=!1,a=0,f=1024,l=e.MutationObserver||e.WebKitMutationObserver;i="function"==typeof l?o(r):s(r),t.requestFlush=i,t.makeRequestCallFromTimer=s}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],3:[function(e,n,t){function r(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function o(){var e=arguments,n=this.useColors;if(e[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+e[0]+(n?"%c ":" ")+"+"+t.humanize(this.diff),!n)return e;var r="color: "+this.color;e=[e[0],r,"color: inherit"].concat(Array.prototype.slice.call(e,1));var o=0,s=0;return e[0].replace(/%[a-z%]/g,function(e){"%%"!==e&&(o++,"%c"===e&&(s=o))}),e.splice(s,0,r),e}function s(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function i(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(n){}}function c(){var e;try{e=t.storage.debug}catch(n){}return e}function u(){try{return window.localStorage}catch(e){}}t=n.exports=e("./debug"),t.log=s,t.formatArgs=o,t.save=i,t.load=c,t.useColors=r,t.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:u(),t.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],t.formatters.j=function(e){return JSON.stringify(e)},t.enable(c())},{"./debug":4}],4:[function(e,n,t){function r(){return t.colors[f++%t.colors.length]}function o(e){function n(){}function o(){var e=o,n=+new Date,s=n-(a||n);e.diff=s,e.prev=a,e.curr=n,a=n,null==e.useColors&&(e.useColors=t.useColors()),null==e.color&&e.useColors&&(e.color=r());var i=Array.prototype.slice.call(arguments);i[0]=t.coerce(i[0]),"string"!=typeof i[0]&&(i=["%o"].concat(i));var c=0;i[0]=i[0].replace(/%([a-z%])/g,function(n,r){if("%%"===n)return n;c++;var o=t.formatters[r];if("function"==typeof o){var s=i[c];n=o.call(e,s),i.splice(c,1),c--}return n}),"function"==typeof t.formatArgs&&(i=t.formatArgs.apply(e,i));var u=o.log||t.log||console.log.bind(console);u.apply(e,i)}n.enabled=!1,o.enabled=!0;var s=t.enabled(e)?o:n;return s.namespace=e,s}function s(e){t.save(e);for(var n=(e||"").split(/[\s,]+/),r=n.length,o=0;r>o;o++)n[o]&&(e=n[o].replace(/\*/g,".*?"),"-"===e[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")))}function i(){t.enable("")}function c(e){var n,r;for(n=0,r=t.skips.length;r>n;n++)if(t.skips[n].test(e))return!1;for(n=0,r=t.names.length;r>n;n++)if(t.names[n].test(e))return!0;return!1}function u(e){return e instanceof Error?e.stack||e.message:e}t=n.exports=o,t.coerce=u,t.disable=i,t.enable=s,t.enabled=c,t.humanize=e("ms"),t.names=[],t.skips=[],t.formatters={};var a,f=0},{ms:5}],5:[function(e,n,t){function r(e){if(e=""+e,!(e.length>1e4)){var n=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(n){var t=parseFloat(n[1]),r=(n[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return t*l;case"days":case"day":case"d":return t*f;case"hours":case"hour":case"hrs":case"hr":case"h":return t*a;case"minutes":case"minute":case"mins":case"min":case"m":return t*u;case"seconds":case"second":case"secs":case"sec":case"s":return t*c;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return t}}}}function o(e){return e>=f?Math.round(e/f)+"d":e>=a?Math.round(e/a)+"h":e>=u?Math.round(e/u)+"m":e>=c?Math.round(e/c)+"s":e+"ms"}function s(e){return i(e,f,"day")||i(e,a,"hour")||i(e,u,"minute")||i(e,c,"second")||e+" ms"}function i(e,n,t){return n>e?void 0:1.5*n>e?Math.floor(e/n)+" "+t:Math.ceil(e/n)+" "+t+"s"}var c=1e3,u=60*c,a=60*u,f=24*a,l=365.25*f;n.exports=function(e,n){return n=n||{},"string"==typeof e?r(e):n["long"]?s(e):o(e)}},{}],6:[function(e,n,t){"use strict";n.exports=e("./lib")},{"./lib":11}],7:[function(e,n,t){"use strict";function r(){}function o(e){try{return e.then}catch(n){return v=n,g}}function s(e,n){try{return e(n)}catch(t){return v=t,g}}function i(e,n,t){try{e(n,t)}catch(r){return v=r,g}}function c(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._37=0,this._12=null,this._59=[],e!==r&&d(e,this)}function u(e,n,t){return new e.constructor(function(o,s){var i=new c(r);i.then(o,s),a(e,new h(n,t,i))})}function a(e,n){for(;3===e._37;)e=e._12;return 0===e._37?void e._59.push(n):void y(function(){var t=1===e._37?n.onFulfilled:n.onRejected;if(null===t)return void(1===e._37?f(n.promise,e._12):l(n.promise,e._12));var r=s(t,e._12);r===g?l(n.promise,v):f(n.promise,r)})}function f(e,n){if(n===e)return l(e,new TypeError("A promise cannot be resolved with itself."));if(n&&("object"==typeof n||"function"==typeof n)){var t=o(n);if(t===g)return l(e,v);if(t===e.then&&n instanceof c)return e._37=3,e._12=n,void p(e);if("function"==typeof t)return void d(t.bind(n),e)}e._37=1,e._12=n,p(e)}function l(e,n){e._37=2,e._12=n,p(e)}function p(e){for(var n=0;n<e._59.length;n++)a(e,e._59[n]);e._59=null}function h(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}function d(e,n){var t=!1,r=i(e,function(e){t||(t=!0,f(n,e))},function(e){t||(t=!0,l(n,e))});t||r!==g||(t=!0,l(n,v))}var y=e("asap/raw"),v=null,g={};n.exports=c,c._99=r,c.prototype.then=function(e,n){if(this.constructor!==c)return u(this,e,n);var t=new c(r);return a(this,new h(e,n,t)),t}},{"asap/raw":2}],8:[function(e,n,t){"use strict";var r=e("./core.js");n.exports=r,r.prototype.done=function(e,n){var t=arguments.length?this.then.apply(this,arguments):this;t.then(null,function(e){setTimeout(function(){throw e},0)})}},{"./core.js":7}],9:[function(e,n,t){"use strict";function r(e){var n=new o(o._99);return n._37=1,n._12=e,n}var o=e("./core.js");n.exports=o;var s=r(!0),i=r(!1),c=r(null),u=r(void 0),a=r(0),f=r("");o.resolve=function(e){if(e instanceof o)return e;if(null===e)return c;if(void 0===e)return u;if(e===!0)return s;if(e===!1)return i;if(0===e)return a;if(""===e)return f;if("object"==typeof e||"function"==typeof e)try{var n=e.then;if("function"==typeof n)return new o(n.bind(e))}catch(t){return new o(function(e,n){n(t)})}return r(e)},o.all=function(e){var n=Array.prototype.slice.call(e);return new o(function(e,t){function r(i,c){if(c&&("object"==typeof c||"function"==typeof c)){if(c instanceof o&&c.then===o.prototype.then){for(;3===c._37;)c=c._12;return 1===c._37?r(i,c._12):(2===c._37&&t(c._12),void c.then(function(e){r(i,e)},t))}var u=c.then;if("function"==typeof u){var a=new o(u.bind(c));return void a.then(function(e){r(i,e)},t)}}n[i]=c,0===--s&&e(n)}if(0===n.length)return e([]);for(var s=n.length,i=0;i<n.length;i++)r(i,n[i])})},o.reject=function(e){return new o(function(n,t){t(e)})},o.race=function(e){return new o(function(n,t){e.forEach(function(e){o.resolve(e).then(n,t)})})},o.prototype["catch"]=function(e){return this.then(null,e)}},{"./core.js":7}],10:[function(e,n,t){"use strict";var r=e("./core.js");n.exports=r,r.prototype["finally"]=function(e){return this.then(function(n){return r.resolve(e()).then(function(){return n})},function(n){return r.resolve(e()).then(function(){throw n})})}},{"./core.js":7}],11:[function(e,n,t){"use strict";n.exports=e("./core.js"),e("./done.js"),e("./finally.js"),e("./es6-extensions.js"),e("./node-extensions.js")},{"./core.js":7,"./done.js":8,"./es6-extensions.js":9,"./finally.js":10,"./node-extensions.js":12}],12:[function(e,n,t){"use strict";var r=e("./core.js"),o=e("asap");n.exports=r,r.denodeify=function(e,n){return n=n||1/0,function(){var t=this,o=Array.prototype.slice.call(arguments,0,n>0?n:0);return new r(function(n,r){o.push(function(e,t){e?r(e):n(t)});var s=e.apply(t,o);!s||"object"!=typeof s&&"function"!=typeof s||"function"!=typeof s.then||n(s)})}},r.nodeify=function(e){return function(){var n=Array.prototype.slice.call(arguments),t="function"==typeof n[n.length-1]?n.pop():null,s=this;try{return e.apply(this,arguments).nodeify(t,s)}catch(i){if(null===t||"undefined"==typeof t)return new r(function(e,n){n(i)});o(function(){t.call(s,i)})}}},r.prototype.nodeify=function(e,n){return"function"!=typeof e?this:void this.then(function(t){o(function(){e.call(n,null,t)})},function(t){o(function(){e.call(n,t)})})}},{"./core.js":7,asap:1}],13:[function(e,n,t){"use strict";function r(){var e="message without receiver. Data:";return p(e,arguments),h.reject(new Error(e+JSON.stringify(arguments)))}function o(){return this instanceof o?(this.callbacks={},this.preFunctions={},void(this.sendedMessages=0)):new o}function s(e,n){return new h(function(t,r){var o=u(n,t);i(e,o),e.length<=0&&t()})}function i(e,n){l(n);for(var t=e.length-1;t>=0;t--)c(e[t],n)}function c(e,n){setTimeout(function(){e.apply(null,n)},0)}function u(e,n){var t=a(e);return t.push(n),t}function a(e){return Array.prototype.slice.call(e)}var f=e("debug")("bus:log"),l=e("debug")("bus:verbose"),p=e("debug")("bus:warning"),h=e("promise");n.exports=t=o,o.prototype.on=function(e,n){var t=this;if("undefined"!=typeof this.callbacks[e])return this.callbacks[e].push(n);var r=this.callbacks[e]=[n];this.preFunctions[e]=function(){return t._callCallbacks(r,arguments)}},o.prototype.off=function(e,n){return"undefined"!=typeof this.callbacks[e]?"undefined"==typeof n?this._deleteAllCallbacks(e):void this._unsubscribeCallback(e,n):void 0},o.prototype._unsubscribeCallback=function(e,n){for(var t=this.callbacks[e].length-1;t>=0;t--)this.callbacks[e][t]===n&&this.callbacks[e].splice(t,1);this.callbacks[e].length<=0&&this._deleteAllCallbacks(e)},o.prototype._deleteAllCallbacks=function(e){delete this.callbacks[e],delete this.preFunctions[e]},o.prototype.send=function(e){return this.preFunctions[e]?(f("message send: ",e),this.preFunctions[e]):(p("message without receiver. Name: ",e),r)},o.prototype.getEventsNames=function(){var e=[];for(var n in this.callbacks)e.push(n);return e},o.prototype.getMetrics=function(){var e,n=0,t=0;for(e in this.callbacks)n++;for(e in this.callbacks)t++;return{subscriptors:n,listeners:t,sendedMessages:this.sendedMessages}},o.prototype._callCallbacks=function(e,n){return this.sendedMessages+=e.length,s(e,n)}},{debug:3,promise:6}]},{},[13]);