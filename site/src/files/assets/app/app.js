'use strict';

// =========================================================================== //

angular
    .module('camundaorg', [
      'ng',
      'bootstrap',
      'ngResource',
      'camundaorg.controllers',
      'camundaorg.filters',
      'camundaorg.services',
      'camundaorg.directives',
      'camundaorg.pages' ]);

/** ============================================================== */
/** ============================================================== */

angular.module('camundaorg.controllers', [])
    .config(function($locationProvider) {
      $locationProvider.hashPrefix('!');
    })
    .controller("anchorController", function ($scope, $location, $anchorScroll) {
      $anchorScroll();
    })


    .controller("DefaultController", function ($scope, $location) {

      // Bread Crumb
      var breadCrumbs = $scope.breadCrumbs = [];

      $scope.$on("navigation-changed", function(event, navigationItem) {
        if (!navigationItem) {
          breadCrumbs.splice(0, breadCrumbs.length);
        } else {
          var contains = false;
          var remove = 0;
          angular.forEach(breadCrumbs, function(item) {
            if (item.name == navigationItem.name) {
              contains = true;
            }
            if (item.href.indexOf($location.path())) {
              remove++;
            }
          });

          for (var i = 0; i < remove; i++) {
            breadCrumbs.pop();
          }

          if (!contains) {
            breadCrumbs.push({name:navigationItem.name, href: $location.path()});
          }
        }
      });
      // end Bread Crumb


    })


    .controller('NavigationController', function ($scope, $location) {

      $scope.activeClass = function(link) {
        var path = $location.absUrl();
        return path.indexOf(link) != -1 ? "active" : "";
      };
    })


/** implement **/
    .controller('ImplementHeroUnit', function ($scope) {

      $scope.activeSection = "overview";

      $scope.setAciveSection = function(newSection) {
        $scope.activeSection = newSection;
      }

      $scope.isActiveSection = function(section) {
        return $scope.activeSection == section ? "active" : "inactive";
      }

    })

    .controller('AnimateProjectSetupController', function ($scope) {

      function translateElement( element, distance, i)
      {

        setTimeout( function( ) {
          var x = distance.x * i / 100;
          var y = distance.y * i / 100;
          element.transform.baseVal.getItem( 0 ).setTranslate( x, y );

          i++;

          if(y <= distance.y && x <= distance.x) {
            translateElement(element, distance, i);
          }

        }, i*0.18);

      }

      $scope.animateProjectSetup = function() {

        var element1 = document.getElementById( "bpmn-container" );
        var element2 = document.getElementById( "java-container" );
        var element3 = document.getElementById( "taskForms-container" );

        element1.transform.baseVal.getItem( 0 ).setTranslate( 0, 0 );
        element2.transform.baseVal.getItem( 0 ).setTranslate( 0, 0 );
        element3.transform.baseVal.getItem( 0 ).setTranslate( 0, 0 );


        setTimeout( function() {
          translateElement(element1, {x:0,y:200}, 0);

          setTimeout( function() {
            translateElement(element2, {x:0,y:200}, 0);

            setTimeout( function() {
              translateElement(element3, {x:0,y:200}, 0);

              /*              setTimeout( function() {
               var element4 = document.getElementById( "maven-container" );
               translateElement(element4, {x:232,y:0}, 0);
               }, 1000);
               */

            }, 1000);

          }, 1000);
        }, 1000);

      };

      $scope.animateProjectSetup();

    })

    .controller('RoadmapController', function ($scope, $http, CSV) {
      jQuery.support.cors = true;
      $http({method: 'GET', url: '../assets/csv/roadmap.csv'})
          .success(function(data) {
            $scope.roadmapErrorText = '';
            $scope.roadmapRow = CSV.csv2json(data, { delim: ';', textdelim: '"'}).rows;
          })
          .error(function(data) {
            $scope.roadmapErrorText = "Sorry, at the moment there is no Roadmap available."
          });

      $scope.isNotNull = function(value) {
        if(value == 0 || typeof value === undefined || value == "" | value == null) {
          return false;
        } else {
          return true;
        }
      };
    });


/** ============================================================== */
/** ============================================================== */

/* services */

angular
    .module('camundaorg.services', [])
    .factory("App", function() {

      function getAppBase() {
        return $("base").attr("app-base");
      }

      return {
        appBase: getAppBase
      };
    })
    .factory('CSV', function() {
      return {
        /**
         * splitCSV function (c) 2009 Brian Huisman, see http://www.greywyvern.com/?post=258
         * Works by spliting on seperators first, then patching together quoted values
         */
        splitCSV : function(string, seperator) {
          for (var value = string.split(seperator = seperator || ","), x = value.length - 1, tl; x >= 0; x--) {
            if (value[x].replace(/"\s+$/, '"').charAt(value[x].length - 1) == '"') {
              if ((tl = value[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
                value[x] = value[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
              } else if (x) {
                value.splice(x - 1, 2, [value[x - 1], value[x]].join(sep));
              } else value = value.shift().split(seperator).concat(value);
            } else value[x].replace(/""/g, '"');
          } return value;
        },

        /**
         * Converts from CSV formatted data (as a string) to JSON returning
         *  an object.
         * @required csvdata {string} The CSV data, formatted as a string.
         * @param args.delim {string} The delimiter used to seperate CSV
         *  items. Defauts to ','.
         * @param args.textdelim {string} The delimiter used to wrap text in
         *  the CSV data. Defaults to nothing (an empty string).
         */
        csv2json : function(csvData, args) {
          args = args || {};
          var delim = null;

          if(typeof args.delim === "undefined") {
            delim = ",";
          } else {
            delim = args.delim;
          }

          // Linux line ending check
          var csvLines = (csvData.search("\r\n") != -1) ? csvData.split("\r\n") : csvData.split("\n");
          var csvHeaders = this.splitCSV(csvLines[0], delim);
          var csvRows = csvLines.slice(1, csvLines.length);

          var returnValue = {};
          returnValue.rows = [];

          for(var r in csvRows) {
            if (csvRows.hasOwnProperty(r)) {
              var row = csvRows[r];
              var rowItems = this.splitCSV(row, delim);

              // Break if we're at the end of the file
              if(row.length == 0) break;

              var rowObj = {};
              for(var i in rowItems) {
                if (rowItems.hasOwnProperty(i)) {
                  var item = rowItems[i];

                  rowObj[csvHeaders[i]] = item;
                }
              }
              returnValue.rows.push(rowObj);
            }
          }
          return returnValue;
        }
      };
    });


/** ============================================================== */
/** ============================================================== */

/* filters */

angular.module('camundaorg.filters', []);


/** ============================================================== */
/** ============================================================== */

/* directives */

angular
    .module('camundaorg.directives', [ ]);


angular.module('camundaorg.directives')

    .value('indent', function(text, spaces) {
      if (!text) return text;
      var lines = text.split(/\r?\n/);
      var prefix = '      '.substr(0, spaces || 0);
      var i;

      // remove any leading blank lines
      while (lines.length && lines[0].match(/^\s*$/)) lines.shift();
      // remove any trailing blank lines
      while (lines.length && lines[lines.length - 1].match(/^\s*$/)) lines.pop();
      var minIndent = 999;
      for (i = 0; i < lines.length; i++) {
        var line = lines[0];
        var indent = line.match(/^\s*/)[0];
        if (indent !== line && indent.length < minIndent) {
          minIndent = indent.length;
        }
      }

      for (i = 0; i < lines.length; i++) {
        lines[i] = prefix + lines[i].substring(minIndent);
      }
      lines.push('');
      return lines.join('\n');
    })

    .value('escape', function(text) {
      return text.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/"/g, '&quot;');
    })

    .factory('script', function() {

      return {

      };
    })

    .factory('fetchCode', function(indent) {
      return function get(id, spaces) {
        return indent(angular.element(document.getElementById(id)).html(), spaces);
      }
    })

    .directive('code', function() {
      return {restrict: 'E', terminal: true};
    })

    .directive('appSource', function(fetchCode, escape, script) {
      return {
        terminal: true,
        link: function(scope, element, attrs) {
          var tabs = [],
              panes = [],
              annotation = attrs.annotate && angular.fromJson(fetchCode(attrs.annotate)) || {},
              TEMPLATE = {

              };

          element.css('clear', 'both');

          angular.forEach(attrs.appSource.split(' '), function(filename, index) {
            var content;

            tabs.push(
                '<li class="' + (!index ? ' active' : '') + '">' +
                    '<a href="#' + id(filename) + '" data-toggle="tab">' + filename  + '</a>' +
                    '</li>');


            content = fetchCode(filename);


            // hack around incorrect tokenization
            content = content.replace('.done-true', 'doneTrue');
            if(filename.indexOf('Project-Layout')==-1) {
              content = prettyPrintOne(escape(content), undefined, false);
            }

            // hack around incorrect tokenization
            content = content.replace('doneTrue', '.done-true');

            var popovers = {},
                counter = 0;

            angular.forEach(annotation[filename], function(text, key) {
              var regexp = new RegExp('(\\W|^)(' + key.replace(/([\W\-])/g, '\\$1') + ')(\\W|$)');

              content = content.replace(regexp, function(_, before, token, after) {
                var token = "__" + (counter++) + "__";
                popovers[token] =
                    '<code class="nocode" rel="popover" data-trigger="hover" title="' + escape('<code>' + key + '</code>') +
                        '" data-content="' + escape(text) + '" data-html=\"true\">' + escape(key) + '</code>';
                return before + token + after;
              });
            });

            angular.forEach(popovers, function(text, token) {
              content = content.replace(token, text);
            });

            panes.push(
                '<div class="tab-pane' + (!index ? ' active' : '') + '" id="' + id(filename) + '">' +
                    '<pre class="linenums nocode">' + content +'</pre>' +
                    '</div>');
          });

          element.html(
              '<div class="tabbable">' +
                  '<ul class="nav nav-tabs">' +
                  tabs.join('') +
                  '</ul>' +
                  '<div class="tab-content">' +
                  panes.join('') +
                  '</div>' +
                  '</div>');
          element.find('[rel=popover]').popover();


          function id(id) {
            return id.replace(/\W/g, '-');
          }
        }
      }
    })

    .directive('hint', function() {
      return {
        template: '<em>Hint:</em> hover over ' +
            '<code class="nocode" rel="popover" title="Hover" ' +
            'data-content="Place your mouse over highlighted areas in the code for explanations.">me</code>.'
      }
    })

    .directive('appSourceNoTabs', function(fetchCode, escape, script) {
      return {
        terminal: true,
        link: function(scope, element, attrs) {
          var TEMPLATE = {

          };

          var tabs = [],
              panes = [],
              annotation = attrs.annotate && angular.fromJson(fetchCode(attrs.annotate)) || {},
              TEMPLATE = {

              };

          element.css('clear', 'both');
          var filename = attrs.appSourceNoTabs;
          var content = fetchCode(filename);

          // hack around incorrect tokenization
          content = content.replace('.done-true', 'doneTrue');
          if(filename.indexOf('Project-Layout')==-1) {
            content = prettyPrintOne(escape(content), undefined, true);
          }

          // hack around incorrect tokenization
          content = content.replace('doneTrue', '.done-true');

          var popovers = {},
              counter = 0;

          angular.forEach(annotation[filename], function(text, key) {
            var regexp = new RegExp('(\\W|^)(' + key.replace(/([\W\-])/g, '\\$1') + ')(\\W|$)');

            content = content.replace(regexp, function(_, before, token, after) {
              var token = "__" + (counter++) + "__";
              popovers[token] =
                  '<code class="nocode" rel="popover" data-trigger="hover" title="' + escape('<code>' + key + '</code>') +
                      '" data-content="' + escape(text) + '" data-html=\"true\">' + escape(key) + '</code>';
              return before + token + after;
            });
          });

          angular.forEach(popovers, function(text, token) {
            content = content.replace(token, text);
          });

          element.html('<pre class="linenums nocode">' + content +'</pre>');
          element.find('[rel=popover]').popover();
        }
      }
    })


// ca_bpmn.js =========================================== //


    .directive('bpmnRender', function() {
      require({
        baseUrl: "./",
        packages: [
          { name: "dojo", location: "assets/js/lib/dojo/dojo"},
          { name: "dojox", location: "assets/js/lib/dojo/dojox"},
          { name: "bpmn", location: "assets/js/app/bpmn"}]
      });
      return {
        link: function(scope, element, attrs) {
          var bpmnResource = attrs.bpmnRender;

          require(["bpmn/Bpmn"], function(Bpmn) {
            new Bpmn().renderUrl("assets/bpmn/" + bpmnResource + ".bpmn", {
              diagramElement : element[0].id,
              overlayHtml : '<div style="position: relative; top:100%"></div>',
              width : $(element).width(),
              height : $(element).height()
            }).then(function (bpmn){
                  scope.bpmn = bpmn;
                  //bpmn.zoom(0.8);
                  //bpmn.annotate("reviewInvoice", '<span class="bluebox"  style="position: relative; top:100%">New Text</span>', ["highlight"]);
                });
          });
        }
      }
    })
    .directive('bpmnSrc', function(App) {
      return {
        link: function(scope, element, attrs) {

          var bpmnResource = App.appBase() + "assets/bpmn/" + attrs.bpmnSrc;

          bpmn(bpmnResource, element);
          //$('body').scrollspy('refresh');
        }
      }
    })
    .directive('bpmnSrc2', function(App) {
      return {
        link: function(scope, element, attrs) {

          var bpmnResource = attrs.bpmnSrc2;

          $.get(App.appBase() + "assets/bpmn/" + bpmnResource + ".bpmn", function(data){

            // create process definition
            scope.processDefinition = new CAM.Transformer().transform(data)[0];

            // render process & add paper to scope
            scope.paper = bpmnDirect(data, element);

          }, "text");
        }
      }
    })
    .directive('bpmnRun', function() {
      return {
        scope: true,
        transclude: true,
        template: '<div><div ng-transclude></div><button class="btn btn-primary" ng-click="startProcess()"><i class="icon-play"></i> Play</button></div>',
        link: function(scope, element, attrs) {

          var bpmnResource = attrs.bpmnSrc;

          $.get(App.appBase() + "assets/bpmn/" + bpmnResource + ".bpmn", function(data){

            scope.processDefinition = CAM.transform(data)[0];

            if(!scope.startProcess) {
              scope.startProcess = function() {
                var execution = new CAM.ActivityExecution(scope.processDefinition);
                execution.variables["paperId"] = element.attr("id");
                execution.start();
              }
            }

          }, "text");
        }
      }
    })
    .directive('bpmnReferenceList', function() {
      return {
        link: function(scope, element, attrs) {





        }
      }
    })
    .directive('bpmnTutorial', function($location) {
      return {
        link: function(scope, element, attrs) {

          $('.tutPop', element).popover({
            "trigger": "hover",
            "placement": "bottom"
          });

          // update active entry in Breadcrumb
          var link = '#' + $location.path();

          // Remove any active entry marker from list
          $('.bpmnSymbolLink').parent().removeClass("active");

          if (link == '#/design/reference') {
            $('#breadcrumbOverview').text('Symbol Reference');
            $('#breadcrumbOverview').addClass('active');
            $('#breadcrumbSymbol').text('');
          } else {

            $('#breadcrumbOverview').removeClass('active');
            $('#breadcrumbOverview').html('<a href="#/design/reference">Symbol Reference</a> <span class="divider">/</span>');
            // Highlight active entry in list
            $('a[href="' + link + '"]').parent().addClass("active");
            // update Breadcrumb active entry
            $('#breadcrumbSymbol').text($('a[href="' + link + '"]').text());
          }
        }
      }
    })
    .directive('bpmnSymbol', function() {
      return {
        link: function(scope, element, attrs) {
          var bpmnSymbol = attrs.bpmnSymbol;
          var bpmnSymbolName = attrs.bpmnSymbolName;
          drawBpmnSymbol (bpmnSymbol, bpmnSymbolName, element);
        }
      }
    })
    .directive('imgThumb', function() {
      return {
        link: function(scope, element, attrs) {
          //alert (attrs.imgSrc);

          $(element).append('<a href="#myModal_' + attrs.id +'" data-toggle="modal"><img src="' + attrs.imgSrc +'"/></a><div class="center gs-guide-modal-text"><i class="icon-zoom-in"></i> click to enlarge</p></div>');
          $(element).append('<div id="myModal_' + attrs.id +'" class="modal gs-guide-modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
              + '<div class="modal-body">'
              + '<img src="' + attrs.imgSrc +'"/>'
              + '</div>'
              + '<div class="modal-footer">'
              + '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'
              + '</div>'
              + '</div>');
        }
      }
    })

/**
 * Docs Navigation and Docs linking specific stuff
 */

(function(angular, $) {
  "use strict";

  var module = angular.module("camundaorg.directives");

  // copied from angular.js docs

  var FocusedDirective = function($timeout) {
    return function(scope, element, attrs) {
      element[0].focus();
      element.bind('focus', function() {
        scope.$apply(attrs.focused + '=true');
      });
      element.bind('blur', function() {
        // have to use $timeout, so that we close the drop-down after the user clicks,
        // otherwise when the user clicks we process the closing before we process the click.
        $timeout(function() {
          scope.$eval(attrs.focused + '=false');
        });
      });
      scope.$eval(attrs.focused + '=true');
    };
  };

  module
      .directive("focused", FocusedDirective);

})(window.angular, window.jQuery);

// ================================================================================================ //
// ================================================================================================ //
