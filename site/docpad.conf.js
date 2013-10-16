// DocPad Configuration

var docpadConfig = {

  // Helper Url
  helperUrl: 'https://camunda.org/helper/',

  // Collections
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

  // Complete listing of default values can be found here: http://docpad.org/docs/template-data
  templateData: {

    //// Site Properties /////////////////////////////////////
    site: {
      url: "http://www.camunda.org",
      title: "camunda BPM",
      description: "camunda BPM platform, free, Open Source BPM and workflow based on BPMN 2.0",
      keywords: "camunda, open source, free, Apache License, Apache 2.0, workflow, BPMN, BPMN 2.0, camunda.org, bpm, BPMS, engine, platform, process, automation, community",
      author: "camunda community",
      email: "community@camunda.org",
      copyright: "© camunda services GmbH 2013",
      expires: 86400000
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

    getPreparedCacheControl: function() {
      var document = this.document,
          documentCacheControl = document.expires,
          site = this.site,
          siteCacheControl = site.expires;

      return documentCacheControl || siteCacheControl;
    },

    getPreparedKeywords: function() {
      var document = this.document,
          documentKeywords = document.keywords,
          site = this.site,
          siteKeywords = site.keywords;

      return (siteKeywords || []).concat(documentKeywords || []).join(", ");
    },

    getPages: function(part) {
      var pages,
          categories = [],
          categoriesByName = {};

      pages = this.getCollection('html')
          .findAllLive({url: {$startsWith: '/' + part}}, [{relativeBase: 1}])
          .toJSON();

      function getCategory(name) {
        var category = categoryByName[name];

        if(!category) {
          category = categoryByName[name] = {name: name, pages: []};
          categories.push(category);
        }

        return category;
      }

      for(var i = 0, page; !!(page = page[i]); i++) {
        if(!page.category) {
          continue;
        }

        page.shortTitle = page.shortTitle ||page.title;
        getCategory(page.category).pages.push(page);
      }

      return {
        name: part,
        categories: categories,
        categoriesByName: categoriesByName
      };
    },

    linkify: function() {
      var parts = Array.prototype.slice.apply(arguments);
      var str = '';

      if(this.document.category) {
        parts.unshift(this.document.title);
        parts.unshift(this.document.category);
      }

      for(var i = 0, part; !!(part = parts[i]); i++) {
        if(i) {
          str += ' ';
        }
        str += part;
      }

      return str.replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
          .toLowerCase();
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
        (/^\//.test(p)) ? a.push(p) : a.push(separator + p);
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
  localeCode: null,
  
  // disable prompts
  prompts: false,
  
  // Default Environment
  env: "dev",

  // Available Environments
  environments: {
    dev: {
      templateData: {
        site: {
          styles: [
            "assets/vendor/bootstrap/css/bootstrap.min.css",
            "assets/vendor/google-code-prettify/prettify.css",
            "assets/css/cabpmn.css",
            "assets/css/app.css",
            "assets/css/extra-small.css",
            "assets/css/small.css",
            "assets/css/medium.css",
            "assets/css/large.css",
            "assets/css/special.css"
          ],

          scripts: [
            "assets/vendor/jquery/jquery.min.js",
            "assets/vendor/raphaeljs/raphael.js",
            "assets/app/bpmn/Executor.js",
            "assets/app/cabpmn.js",
            "assets/vendor/google-code-prettify/prettify.min.js",
            "assets/vendor/jquery/validate/jquery.validate.min.js",
            "assets/vendor/jquery/placeholder/jquery.placeholderpatch.js",
            "assets/vendor/bootstrap/js/bootstrap.min.js",
            "assets/app/application.js",
            "assets/vendor/analytics/analytics.js"
          ]
        }
      }
    }
  },

 // maxAge: false // default
  maxAge: false
};

module.exports = docpadConfig;