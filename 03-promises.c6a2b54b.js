!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var i={id:e,exports:{}};return o[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){t[e]=n},n.parcelRequired7c6=i);var r=i("6JpON"),l=document.querySelector(".form"),c=document.querySelectorAll("input");document.querySelectorAll("label"),document.querySelectorAll("button");function a(n,o){var t=Math.random()>.3;return new Promise(t?function(t){setTimeout((function(){t({position:n,delay:o}),e(r).Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(o,"ms"))}),o)}:function(t){setTimeout((function(){t({position:n,delay:o}),e(r).Notify.failure("❌ Rejected promise ".concat(n," in ").concat(o,"ms"))}),o)})}l.addEventListener("submit",(function(n){n.preventDefault();var o=parseInt(c[0].value,10),t=parseInt(c[1].value,10),i=parseInt(c[2].value,10);if(isNaN(o)||isNaN(t)||isNaN(i))return void e(r).Notify.failure("Please enter valid numbers");for(var l=[],u=0;u<i;u++){var s=a(u+1,o+u*t);s.then((function(e){var n=e.position,o=e.delay;console.log("✅ Fulfilled promise ".concat(n," in ").concat(o,"ms"))})).catch((function(e){var n=e.position,o=e.delay;console.log("❌ Rejected promise ".concat(n," in ").concat(o,"ms"))})),l.push(s)}Promise.all(l).then((function(){e(r).Notify.success("All promises resolved")})).catch((function(){e(r).Notify.failure("At least one promise rejected")}))}))}();
//# sourceMappingURL=03-promises.c6a2b54b.js.map
