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