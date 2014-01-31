/**
 * index page script
 */

(function($) {
  $(document).ready(function() {

    var jumbo, description, nav;

    jumbo = $('.col-jumbo');
    nav = jumbo.find('.nav');
    description = jumbo.find('.description');

    nav.find('[data-slide]').each(function() {
      var e = $(this);

      e.click(function() {
        nav.find('li').removeClass('active');
        e.parent().addClass('active');

        jumbo.removeClass('slide-1 slide-2 slide-3 slide-4');
        jumbo.addClass(e.data('slide'));
      });
    });
  });

})(window.jQuery);

/**
 * Download page
 */
(function(window, $, release) {

  if (!release) {
    return;
  }

  $(document).ready(function() {
    $('.js-release-version').text(release.version).css('visibility', 'visible');
    $('.js-release-date').text(release.date).css('visibility', 'visible');

    var platform = window.location.hash;

    if (platform) {
      platform = platform.substring(1);
    }

    if ([ 'windows', 'linux', 'macos'].indexOf(platform) === -1) {
      platform = 'windows';
    }

    $('.nav-tabs a[href=#download-' + platform + ']').tab('show');
  });
})(window, window.jQuery, window.MODELER_RELEASE);