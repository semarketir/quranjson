/*
 *  jquery-loading - v1.0.3
 *  Easily add and manipulate loading states of any element on the page
 *  http://github.com/CarlosBonetti/jquery-loading
 *
 *  Made by Carlos Bonetti
 *  Under MIT License
 */
;(function($, window, undefined) {

  var Loading = function(element, options) {
    this.element = element;
    this.settings = $.extend({}, Loading.defaults, options);
    this.settings.fullPage = this.element.is('body');

    this.init();

    if (this.settings.start) {
      this.start();
    }
  };

  Loading.defaults = {

    /**
     * jQuery element to be used as overlay
     * If not defined, a default overlay will be created
     */
    overlay: undefined,

    /**
     * Message to be rendered on the overlay content
     * Has no effect if a custom overlay is defined
     */
    message: 'Loading...',

    /**
     * Theme to be applied on the loading element
     *
     * Some default themes are implemented on `jquery.loading.css`, but you can
     *  define your own. Just add a `.loading-theme-my_awesome_theme` selector
     *  somewhere with your custom styles and change this option
     *  to 'my_awesome_theme'. The class is applied to the parent overlay div
     * Has no effect if a custom overlay is defined
     */
    theme: 'light',

    /**
     * Set to true to stop the loading state if the overlay is clicked
     * This options does NOT override the onClick event
     */
    stoppable: false,

    /**
     * Set to false to not start the loading state when initialized
     */
    start: true,

    /**
     * Function to be executed when the loading state is started
     * Receives the loading object as parameter
     */
    onStart: function(loading) {
      loading.overlay.fadeIn(150);
    },

    /**
     * Function to be executed when the loading state is stopped
     * Receives the loading object as parameter
     */
    onStop: function(loading) {
      loading.overlay.fadeOut(150);
    },

    /**
     * Function to be executed when the overlay is clicked
     * Receives the loading object as parameter
     */
    onClick: function() {}
  };

  /**
   * Extend the Loading plugin default settings with the user options
   */
  Loading.setDefaults = function(options) {
    Loading.defaults = $.extend({}, Loading.defaults, options);
  };

  $.extend(Loading.prototype, {

    /**
     * Initializes the overlay and attach handlers to the appropriate events
     */
    init: function() {
      this.isActive = false;
      this.overlay = this.settings.overlay || this.createOverlay();
      this.resize();
      this.attachMethodsToExternalEvents();
      this.attachOptionsHandlers();
    },

    /**
     * Return a new default overlay (jQuery object)
     */
    createOverlay: function() {
      var overlay = $('<div class="loading-overlay loading-theme-' + this.settings.theme + '"><div class="loading-overlay-content">' + this.settings.message + '</div></div>')
        .hide()
        .appendTo('body');

      var elementID = this.element.attr('id');
      if (elementID) {
        overlay.attr('id', elementID + '_loading-overlay');
      }

      return overlay;
    },

    /**
     * Attach some methods to external events
     * e.g. overlay click, window resize etc
     */
    attachMethodsToExternalEvents: function() {
      var self = this;

      // Stop loading if the `stoppable` option is set
      if (self.settings.stoppable) {
        self.overlay.on('click', function() {
          self.stop();
        });
      }

      // Trigger the `loading.click` event if the overlay is clicked
      self.overlay.on('click', function() {
        self.element.trigger('loading.click', self);
      });

      // Bind the `resize` method to `window.resize`
      $(window).on('resize', function() {
        self.resize();
      });

      // Bind the `resize` method to `document.ready` to guarantee right
      // positioning and dimensions
      $(document).on('ready', function() {
        self.resize();
      });
    },

    /**
     * Attach the handlers defined on `options` for the respective events
     */
    attachOptionsHandlers: function() {
      var self = this;

      self.element.on('loading.start', function(event, loading) {
        self.settings.onStart(loading);
      });

      self.element.on('loading.stop', function(event, loading) {
        self.settings.onStop(loading);
      });

      self.element.on('loading.click', function(event, loading) {
        self.settings.onClick(loading);
      });
    },

    /**
     * Reposition the overlay on the top of the target element
     * This method needs to be called if the target element changes position
     *  or dimension
     */
    resize: function() {
      var self = this;

      var element = self.element,
          totalWidth = element.outerWidth(),
          totalHeight = element.outerHeight();

      if (this.settings.fullPage) {
        totalHeight = '100%';
        totalWidth = '100%';
      }

      this.overlay.css({
        position: self.settings.fullPage ? 'fixed' : 'absolute',
        zIndex: 9 + self.settings.fullPage,
        top: element.offset().top,
        left: element.offset().left,
        width: totalWidth,
        height: totalHeight
      });
    },

    /**
     * Trigger the `loading.start` event and turn on the loading state
     */
    start: function() {
      this.isActive = true;
      this.element.trigger('loading.start', this);
    },

    /**
     * Trigger the `loading.stop` event and turn off the loading state
     */
    stop: function() {
      this.isActive = false;
      this.element.trigger('loading.stop', this);
    },

    /**
     * Check whether the loading state is active or not
     */
    active: function() {
      return this.isActive;
    },

    /**
     * Toggle the state of the loading overlay
     */
    toggle: function() {
      if (this.active()) {
        this.stop();
      } else {
        this.start();
      }
    }
  });

  /**
   * Name of the data attribute where the plugin object will be stored
   */
  var dataAttr = 'jquery-loading';

  /**
   * Create the `loading` jQuery chainable method
   */
  $.fn.loading = function (options) {
    // Get the other arguments if the plugin was called
    //  as e.g. `$(...).loading('method', arg1, arg2, ...)`
    var otherArgs = (arguments.length > 1) ? Array.prototype.slice.call(arguments, 1) : [];

    return this.each(function() {
      var loading = $.data(this, dataAttr);

      if (!loading) { // First call
        $.data(this, dataAttr, (loading = new Loading($(this), options)));
      } else { // Already initialized
        if (typeof options === 'string') {
          loading[options].apply(loading, otherArgs);
        } else {
          loading.start();
        }
      }
    });
  };

  /**
   * Return the loading object associated to the element
   * This method is interesting if you need the plugin object to access the
   * internal API
   */
  $.fn.Loading = function() {
    return $(this).data(dataAttr);
  };

  /**
   * Create the `:loading` jQuery selector
   * Return all the jQuery elements with the loading state active
   *
   * Using the `:not(:loading)` will return all jQuery elements that are not
   *  loading, event the ones with the plugin not attached.
   *
   * Examples of use:
   *  `$(':loading')` to get all the elements with the loading state active
   *  `$('#my-element').is(':loading')` to check if the element is loading
   */
  $.expr[':'].loading = function(element) {
    var loadingObj = $.data(element, dataAttr);

    if (!loadingObj) {
      return false;
    }

    return loadingObj.active();
  };

  $.Loading = Loading;

})(jQuery, window);
