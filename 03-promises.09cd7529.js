var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequire7bc7;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequire7bc7=o);var i=o("iQIUW");let r=0,a=0,l=0;const u=document.querySelector(".form");function d(e,t){const n=Math.random()>.3;return new Promise(((o,i)=>{setTimeout((()=>{n?o({position:e,delay:t}):i({position:e,delay:t})}),t)}))}u.addEventListener("input",(function(e){"delay"===e.target.name&&(r=Number(e.target.value));"step"===e.target.name&&(a=Number(e.target.value));"amount"===e.target.name&&(l=Number(e.target.value))})),u.addEventListener("submit",(function(e){e.preventDefault(),function(e,t,n){let o=e;for(let e=1;e<=n;e++)d(e,o).then((e=>{i.Notify.info(`✅ Fulfilled promise ${e.position} in ${e.delay}ms`)})).catch((e=>{i.Notify.failure(`❌ Rejected promise ${e.position} in ${e.delay}ms`)})),o+=t}(r,a,l)}));
//# sourceMappingURL=03-promises.09cd7529.js.map
