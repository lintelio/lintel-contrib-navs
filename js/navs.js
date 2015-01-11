(function($) {
  'use strict';

  var Nav = function(element) {
    this.element = $(element);
  };

  Nav.prototype.show = function() {
    var $this = this.element;
    var $tabs = $this.closest('ul');

    /* @preserve-debug-only */
    if ($tabs.attr('role') !== 'tablist') {
      console.info('List missing role="tablist" attribute.', $tabs[0]);
    }
    $tabs.find('li').each(function() {
      if ($(this).attr('role') === undefined) {
        console.info('List item missing role="presentation" attribute', this);
      }
    });
    $tabs.find('a').each(function() {
      if ($(this).attr('aria-expanded') === undefined) {
        console.info('Anchor missing aria-expanded attribute.', this);
      }
      if ($(this).attr('role') === undefined) {
        console.info('Anchor missing role attribute.', this);
      }
      if ($(this).attr('aria-controls') === undefined) {
        console.info('Anchor missing aria-controls attribute.', this);
      } else if ($(this).attr('aria-controls') !== $(this).attr('href')) {
        console.info('Href does not match aria-controls attribute.', this);
      }
      if (!$($(this).attr('href')).length) {
        console.info('Tab content does not exist for href ' + $(this).attr('href'), this);
      }
    });
    /* @preserve-end-debug-only */

    // Don't do anything for active tab
    if ($this.closest('li').hasClass('active')) { return; }

    // Don't do anything for invalid tabs
    if (!$($this.attr('href')).length) { return; }

    // Current tab
    var $current = $tabs.find('.active:last a');

    // Hide events
    var hideEvent = $.Event('hide.lt.nav', {
      relatedTarget: $this[0]
    });

    var hiddenEvent = $.Event('hidden.lt.nav', {
      relatedTarget: $this[0]
    });

    // Show events
    var showEvent = $.Event('show.lt.nav', {
      relatedTarget: $current[0]
    });

    var shownEvent = $.Event('shown.lt.nav', {
      relatedTarget: $current[0]
    });

    // Trigger pre-action events
    $current.trigger(hideEvent);
    $this.trigger(showEvent);

    // Allow events to be prevented
    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) { return; }

    // Active new tab and trigger confirmation events
    this.activate($this, $current, $tabs, function() {
      $current.trigger(hiddenEvent);
      $this.trigger(shownEvent);
    });
  };

  Nav.prototype.activate = function(newTab, current, container, callback) {
    // Remove active from current tab
    current
      .attr('aria-expanded', false)
      .closest('li')
      .removeClass('active');

    // Hide current tab content
    $(current.attr('href')).hide();

    // Activate Tab
    newTab
      .attr('aria-expanded', true)
      .closest('li')
      .addClass('active');

    // Show new content
    $(newTab.attr('href')).show();

    if (callback) { callback(); }
  };

  // Define jQuery plugin
  function Plugin(method, options) {
    var settings = $.extend({

    }, Plugin.defaults, options);

    return this.each(function() {
      var $this = $(this);

      var data = $this.data('lt.nav');
      if (!data) {
        data = new Nav(this);
        $this.data('lt.nav', data);
      }
      if (typeof method === 'string') { data[method](); }

      settings.callback.call(this);
    });
  }

  Plugin.defaults = {
    callback: function() {}
  };

  $.fn.nav = Plugin;

  // Events
  $(document).on('click.lt.nav', '.nav-list a', function(e) {
    e.preventDefault();
    Plugin.call($(this), 'show');
  });

})(jQuery);
