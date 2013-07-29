// DocPad Configuration

var docpadConfig = {

  // Helper Url
  // Used for subscribing to newsletter, account information, and statistics etc
  helperUrl: 'https://camunda.org/helper/',

  // Collections
  // A hash of functions that create collections
  collections: {
    mainSections: function(database) {
      return database.findAllLive({ relativeOutDirPath: 'pages/' });
    }
  },
  
  plugins: {
    livereload: {
      enabled: false,
      inject: false
    }
  },
  
  // Use to define your own template data and helpers that will be accessible to your templates
  // Complete listing of default values can be found here: http://docpad.org/docs/template-data
  templateData: {

    //// Site Properties /////////////////////////////////////
    site: {

      // The production url of our website
      url: "http://website.com",

      styles: [
        "assets/vendor/bootstrap/css/bootstrap.min.css",
        "assets/vendor/bootstrap/css/bootstrap-responsive.min.css",
        "assets/vendor/jquery/tweet/jquery.tweet.css",
        "assets/vendor/google-code-prettify/prettify.css",
        "assets/css/cabpmn.css",
        "assets/css/app.css"
      ],

      scripts: [
        // todo make path separator aware
        "assets/vendor/jquery/jquery.min.js",

        "assets/vendor/raphaeljs/raphael.js",
        "assets/app/bpmn/Executor.js",
        "assets/app/cabpmn.js",

        "assets/vendor/google-code-prettify/prettify.min.js",

        "assets/vendor/jquery/tweet/jquery.tweet.js",
        "assets/vendor/jquery/validate/jquery.validate.min.js",
        "assets/vendor/jquery/placeholder/jquery.placeholderpatch.js",

        "assets/vendor/bootstrap/js/bootstrap.min.js",
        "assets/vendor/log.js",
        "assets/vendor/angular/angular.min.js",
        "assets/vendor/angular/angular-resource.min.js",

        // with fix for menues
        "assets/vendor/angular/angular-bootstrap.js",

        "assets/app/directives/ngmif.js",
        "assets/app/directives/focused.js",

        "assets/app/app.js",

        "assets/app/docs/docs.js",
        "assets/app/docs/pages.js",

        // not important, load last
        "assets/vendor/analytics/analytics.js"
      ],

      title: "camunda BPM",

      description: "camunda BPM platform, free, Open Source BPM and workflow based on BPMN 2.0",

      // website keywords (separated by commas)
      keywords: "camunda, open source, free, Apache License, Apache 2.0, workflow, BPMN, BPMN 2.0, camunda.org, bpm, BPMS, engine, platform, process, automation, community",

      author: "camunda community",
      email: "community@camund.org",

      copyright: "© camunda services GmbH 2013"
    },

    //// Helper Functions /////////////////////////////////////

    getPreparedTitle: function() {
      var document = this.document,
          documentTitle = document.title,
          site = this.site,
          siteTitle = site.title;

      if (documentTitle) {
        return documentTitle + " | " + siteTitle;
      } else {
        return siteTitle;
      }
    },

    getPreparedDescription: function() {
      var document = this.document,
          documentDescription = document.description,
          site = this.site,
          siteDescription = site.description;

      return documentDescription || siteDescription;
    },

    getPreparedKeywords: function() {
      var document = this.document,
          documentKeywords = document.keywords,
          site = this.site,
          siteKeywords = site.keywords;

      return (siteKeywords || []).concat(documentKeywords || []).join(", ");
    },

    pathSeparator: function(url) {

      if (!url) {
        url = this.documentUrl();
      }

      if (url.indexOf("/") === 0) {
        url = url.substring(1);
      }

      // windows bug: must split by / and \
      var uriParts = url.split("/");

      function repeat(s, n) {

        var a = [];

        for (var i = 0; i < n; i++) {
          a.push(s);
        }

        return a.join('');
      }

      var depth = 0;

      if (uriParts.length) {

        depth = uriParts.length - 1;
      }

      return repeat('../', depth);
    },

    docUrl: function(url) {
      var documentUrl = this.documentUrl();
      return this.pathSeparator(documentUrl) + url;
    },

    stringEndsWith: function(str, ending) {
      return str.indexOf(ending) == str.length - ending.length;
    },

    documentUrl: function() {
      var document = this.document;
      var urls = document.urls;

      var url = document.url;

      for (var i = 0, u; !!(u = urls[i]); i++) {
        u = u.replace(/[\\]+/g, "/");

        if (this.stringEndsWith(u, ".html")) {
          if (this.stringEndsWith(u, "/index.html")) {
            url = u.replace("index.html", "");
          } else {
            url = u;
          }
        }
      }

      return url;
    },

    relativize: function(paths, separator) {
      var a = [];

      for (var i = 0; i < paths.length; i++) {
        var p = paths[i];
        if (/^\//.test(p)) {
          a.push(p);
        } else {
          a.push(separator + p);
        }
      }

      return a;
    },

    commonStyles: function() {
      return this.relativize(this.site.styles, this.pathSeparator());
    },

    commonScripts: function() {
      var site = this.site,
          document = this.document;

      return this.relativize(document.scripts || site.scripts, this.pathSeparator());
    }
  },

  // =================================
  // Event Configuration

  // Locale Code
  // The code we shall use for our locale (e.g. `en`, `fr`, etc)
  // If not set, we will attempt to detect the system's locale, if the locale can't be detected or if our locale file is not found for it, we will revert to `en`
  localeCode: null,
  
  // disable prompts
  prompts: false,
  
  // Environment
  // Which environment we should load up
  // If not set, we will default the `NODE_ENV` environment variable, if that isn't set, we will default to `development`
  env: null,

  // Environments
  // Allows us to set custom configuration for specific environments
  environments: null,
  development: null,

  maxAge: false // default

};

module.exports = docpadConfig;