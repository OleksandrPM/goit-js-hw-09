!function(){var t,a=document.querySelector("body");a.addEventListener("click",(function(e){e.target.hasAttribute("data-start")&&(t=setInterval((function(){a.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),a.querySelector("[data-start]").disabled=!0,a.querySelector("[data-stop]").disabled=!1);e.target.hasAttribute("data-stop")&&(clearInterval(t),a.querySelector("[data-start]").disabled=!1,a.querySelector("[data-stop]").disabled=!0)}))}();
//# sourceMappingURL=01-color-switcher.6e23470e.js.map
