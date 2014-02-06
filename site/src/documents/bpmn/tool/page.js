/**
 * Download page
 */
(function(window, $) {

  $(document).ready(function() {
    var platform = window.location.hash;

    if (platform) {
      platform = platform.substring(1);
    }

    if ([ 'windows', 'linux', 'macos'].indexOf(platform) === -1) {
      platform = 'windows';
    }

    $('.nav-tabs a[href=#download-' + platform + ']').tab('show');
  });
})(window, window.jQuery);