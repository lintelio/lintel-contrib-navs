(function($) {
  'use strict';

  var Tab = function(element, options) {
    this.$tab = $(element);
    this.$list = this.$tab.closest('ul');
    this.options = options || {};
  };

  Tab.prototype.show = function() {
    // Don't do anything for active tab
    if (this.$tab.closest('li').hasClass('active')) { return; }

    // Don't do anything for invalid tabs
    if (!$(this.$tab.attr('href')).length) { return; }

    // Current tab
    var $activeTab = this.$list.find('.active:last a');

    // Hide active tab event
    var hideEvent = $.Event('hide.lt.tab', {
      relatedTarget: this.$tab[0]
    });
    $activeTab.trigger(hideEvent);

    // Show new tab event
    var showEvent = $.Event('show.lt.tab', {
      relatedTarget: $activeTab[0]
    });
    this.$tab.trigger(showEvent);

    // Allow events to be prevented
    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) { return; }

    this.options.onHide.call(this, this.$tab);
    this.options.onShow.call(this, this.$tab);

    // Hidden active tab event
    var hiddenEvent = $.Event('hidden.lt.tab', {
      relatedTarget: this.$tab[0]
    });

    // Shown new tab event
    var shownEvent = $.Event('shown.lt.tab', {
      relatedTarget: $activeTab[0]
    });

    // Active new tab and trigger confirmation events
    this.activate($activeTab, this.$tab, this.$list, function() {
      $activeTab.trigger(hiddenEvent);
      this.$tab.trigger(shownEvent);
    });
  };

  Tab.prototype.activate = function(current, newTab) {
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
  };

  // Define jQuery plugin
  function Plugin(method) {

    return this.each(function() {
      var $tab = $(this);
      var settings = $.extend({}, Plugin.defaults, $tab.data(), typeof method === 'object' && method);

      var data = $tab.data('lt.tab');
      if (!data) {
        data = new Tab(this, settings);
        $tab.data('lt.tab', data);
      }
      if (typeof method === 'string') {
        data[method]();
      } else if (settings.show) {
        data.show();
      }
    });
  }

  Plugin.defaults = {
    onShow: function() {},
    onHide: function() {},
    show: true
  };

  $.fn.tab = Plugin;

  // Events
  $(document).on('click.lt.tab', '[data-toggle="tab"]', function(e) {
    e.preventDefault();
    Plugin.call($(this), 'show');
  });

})(jQuery);
