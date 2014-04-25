var STRAIT = STRAIT || {};
STRAIT.Mediator = {
  obj: $({}),
  publish: function(event, data) { return this.obj.trigger(event, data); },
  subscribe: function(event, fn) { return this.obj.on(event, fn); },
  unsubscribe: function(event, fn) { return this.obj.off(event, fn); }
};
