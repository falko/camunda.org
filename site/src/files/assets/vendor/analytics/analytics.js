var _gaq = _gaq || [];
var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
_gaq.push(['_require', 'inpage_linkid', pluginUrl]);
_gaq.push(['_setAccount', 'UA-39060941-1']);
_gaq.push(['_setDomainName', 'camunda.org']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

$('a#download-modeler').click(function() {
  _gaq.push(['_trackEvent', 'Downloads', 'camunda-modeler', this.href]);
});

$('a#download-bpm').click(function() {
  _gaq.push(['_trackEvent', 'Downloads', 'camunda-bpm', this.href]);
});

$('a#numberGuess').click(function() {
	_gaq.push(['_trackEvent', 'gameplayed', 'gameplayed']);
});

$('a#forkMe').click(function() {
	_gaq.push(['_trackEvent', 'github', 'forkGithub', location.href]);
});

$('a#githubExamples').click(function() {
  _gaq.push(['_trackEvent', 'github', 'examples', location.href]);
});

$('a#githubQuickstarts').click(function() {
  _gaq.push(['_trackEvent', 'github', 'quickstarts', location.href]);
});

$('a#camundaCom').click(function() {
	_gaq.push(['_trackEvent', 'camundaCom', 'enterpriseEdition', location.href]);
});

$('a#camundaConsult').click(function() {
	_gaq.push(['_trackEvent', 'camundaCom', 'consulting', location.href]);
});

$('a#camundaTraining').click(function() {
	_gaq.push(['_trackEvent', 'camundaCom', 'training', location.href]);
});