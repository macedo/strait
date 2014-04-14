module.exports = ComponentsManager = function ComponentsManager(mediator) {
  this.mediator = mediator;
};

ComponentsManager.init = function(mediator) {
  var instance = new this(mediator);
  instance.init();
  return instance;
};

ComponentsManager.prototype.init = function() {
  this.addEventListeners();
};

ComponentsManager.prototype.fetchComponents = function(container) {
  var _this      = this
    , components = container.find("[data-components]");

  return components.each(function(i, component) {
    $component = $(component);
    $.each(
      $component.data("components").split(/\s+/), function(i, componentName) {
        return _this.initializeComponent($component, componentName);
      });
    });
  };

ComponentsManager.prototype.initializeComponent = function(container, name) {
  var newComponent;
  try {
    var component = require(name);
    newComponent = component.init(container);
  } catch(err) {
    newComponent = void 0;
  }
  return newObject;
};

ComponentsManager.prototype.onComponentsLoaded = function(event, element) {
  return this.fetchComponents($(element || document));
};

ComponentsManager.prototype.addEventListeners = function() {
  return this.mediator.subscribe(
      "page:loaded", _.bind(this.onComponentsLoaded, this));
};
