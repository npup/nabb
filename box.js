var Box = (function () {
  var doc = this.document
    , elem = doc.getElementById("box")
    , wrap = doc.getElementById("wrap")
    , button = doc.getElementById("button")
    , api = {
      "rotateTo": function (deg) {
          elem.style.transform = elem.style.WebkitTransform = "rotate("+deg+"deg)";
          return api;
        }
      , "x": function (pos) {
          "number" == typeof pos && (elem.style.left = pos+"px");
          return api;
        }
      , "y": function (pos) {
          "number" == typeof pos && (elem.style.bottom = pos+"px");
          return api;
        }
      , "pos": function (pos) {
          return api.x(pos.x).y(pos.y);
        }
      , "put": function (text, x, y) {
          var div = doc.createElement("div");
          div.textContent = text;
          div.style.position = "absolute";
          div.style.top = y+"px";
          div.style.left = x+"px";
          wrap.appendChild(div);
        }
      , "quake": function () {
          wrap.className += " impact";
          setTimeout(function () {
            revert();
            wrap.className = wrap.className.replace(/^(.*) impact$/, "$1");
            setTimeout(enable, 1000);
          }, 1000);
        }
      , "hurtMe": hurtMe
    };
  function hurtMe() {
    enable(false);
    api.x(110).y(115).rotateTo(50);
    setTimeout(api.quake, 1000);
  }
  function enable(on) {
    on = (arguments.length == 0) || !!on;
    button.disabled = !on;
    button.style.opacity = on?1:0;
  }
  function revert() {
    api.pos({x: -150, y: -150}).rotateTo(110);
  }
  revert();
  enable();
  return api;
})();