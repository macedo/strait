module.exports = Util = (function() {
  function parseSource(source) {
    source = _splitAndReverse(source);
    return { host: source[1] || "", port: parseInt(source[0], 10) };
  }

  function parseTarget(target) {
    target = _splitAndReverse(target);
    if (target.length == 1) { throw("target must be host:port"); }
    return { host: target[1], port: parseInt(target[0], 10) };
  }

  function _splitAndReverse(st) {
    return st.split(/:/).reverse();
  }

  return {
    parseSource: parseSource,
    parseTarget: parseTarget
  }
})();
