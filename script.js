// PeaceFulSMP site — small progressive-enhancement script.
// Everything here is optional; the site works fine without JS.

(function () {
  "use strict";

  var SERVER_IP = "play.peacefulsmp.win";
  var STATUS_API = "https://api.mcsrvstat.us/3/" + SERVER_IP;

  // ---- Current year in footer ----
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Copy to clipboard ----
  var toast = document.getElementById("toast");
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 1600);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { showToast("Copied \"" + text + "\""); },
        function () { fallbackCopy(text); }
      );
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); showToast("Copied \"" + text + "\""); }
    catch (e) { showToast(text); }
    document.body.removeChild(ta);
  }

  document.querySelectorAll(".ip-box").forEach(function (box) {
    var target = box.getAttribute("data-copy");
    if (!target) {
      var codeEl = box.querySelector(".ip");
      target = codeEl ? codeEl.textContent.trim() : SERVER_IP;
    }
    function activate() { copyText(target); }
    box.addEventListener("click", activate);
    box.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); }
    });
  });

  // ---- Live server status ----
  var dot = document.getElementById("status-dot");
  var text = document.getElementById("status-text");

  function setStatus(state, label) {
    if (dot) {
      dot.classList.remove("online", "offline");
      if (state) dot.classList.add(state);
    }
    if (text) text.textContent = label;
  }

  function checkStatus() {
    fetch(STATUS_API, { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("bad status");
        return r.json();
      })
      .then(function (data) {
        if (data && data.online) {
          var players =
            data.players && typeof data.players.online === "number"
              ? data.players.online
              : null;
          setStatus(
            "online",
            players !== null ? "Online \u2014 " + players + " playing" : "Online"
          );
        } else {
          setStatus("offline", "Offline");
        }
      })
      .catch(function () {
        setStatus(null, "Status unavailable");
      });
  }

  checkStatus();
  setInterval(checkStatus, 60000);
})();
