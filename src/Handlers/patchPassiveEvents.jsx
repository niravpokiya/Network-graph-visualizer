// patchPassiveEvents.js
(function patchPassiveListeners() {
  const passiveEvents = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];
  const originalAddEventListener = EventTarget.prototype.addEventListener;

  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (passiveEvents.includes(type)) {
      if (typeof options !== 'object' || options === null) {
        options = { passive: true };
      } else {
        options = { ...options, passive: true };
      }
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
})();
