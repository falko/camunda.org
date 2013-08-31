/**
 * Docs Navigation and Docs linking specific stuff
 *
 * Inspired by angular js docs
 *
 * @author nico.rehwaldt
 */

(function(angular, $) {
  "use strict";

  var module = angular.module("camundaorg.pages", []);

  var PagesProducer = function(App) {

    var Pages = function(pages) {
      this.pages = pages;
      this.sections = this.buildSections(pages);
    };

    Pages.prototype.buildSections = function(pages) {
      var sections = {};

      for (var i = 0, p; !!(p = pages[i]); i++) {
        var section = getSection(p.section);

        section.pages.push(p);
        section.pageById[p.id] = p;
        p.partialUrl = App.appBase() + "partials/" + p.section + p.url + ".html";
      }

      function getSection(name) {
        var section = sections[name];
        if (!section) {
          sections[name] = section = {
            name: name,
            pages: [],
            pageById: {}
          };
        }

        return section;
      }

      return sections;
    };

    Pages.prototype.getAll = function(sectionId) {
      var section = this.sections[sectionId];

      if (!section) {
        return null;
      }

      return section.pages;
    };

    Pages.prototype.get = function(sectionId, pageId) {
      var section = this.sections[sectionId];

      if (!section) {
        return null;
      }

      return section.pageById[pageId];
    };

    return new Pages(CAM_PAGES);
  };

  var DocsNavigationController = function DocsNavigationController($scope, $location, Pages) {

    $scope.currentPage = null;

    $scope.top = function(page) {
      $('html, body').animate({scrollTop: $('.row-top').offset().top}, 'slow');
    };

    $scope.$watch(function getUrl() { return $location.path(); }, function(newValue) {
      updateSearch(newValue);
      updatePage(newValue);
    });

    $scope.updateSearch = function() {
      updateSearch();
    };

    $scope.navClass = function(page) {
      return page == $scope.currentPage ? "active" : "";
    };

    $scope.submitForm = function() {
      updateSearch();

      var currentPage = $scope.currentPage,
          bestMatch = $scope.bestMatch,
          bestMatchPage = $scope.bestMatch.page;

      $scope.search = "";

      if (bestMatch.rank && currentPage != bestMatchPage) {
        $location.url($scope.bestMatch.page.url);
      } else {
        updateSearch();
      }
    };

    function getDocPages() {
      return Pages.getAll($scope.section);
    }

    function updatePage(path) {
      angular.forEach(getDocPages(), function(page) {
        var id = $('#' + page.id);
        id.removeClass('activeTab');
        if (page.url == path) {
          $scope.currentPage = page;
          id.addClass('activeTab');
        }
      });
    }

    function updateSearch(path) {
      var allPages = getDocPages(),
          categories = $scope.categories = [],
          cache = {},
          pages = $scope.pages = [],
          search = $scope.search,
          bestMatch = { rank: 0, page: null };

      angular.forEach(allPages, function(page) {
        var match = rank(page, search);
        if (!match) {
          return;
        }

        if (match.rank > bestMatch.rank) {
          bestMatch = match;
        }

        var category = getCategory(page.category);
        if (category) {
          category.pages.push(page);
        } else {
          pages.push(page);
        }
      });

      function getCategory(categoryName) {
        var category;

        if (categoryName) {
          category = cache[categoryName];
          if (!category) {
            category = cache[categoryName] = {
              name: categoryName,
              pages: []
            };

            categories.push(category);
          }
        }

        return category;
      }

      function rank(page, terms) {
        var ranking = { page: page, rank:0 },
          keywords = page.keywords || "",
          title = (page.shortName || page.name || "").toLowerCase();

        if (!terms) {
          return ranking;
        }

        angular.forEach(terms.toLowerCase().split(' '), function(term) {
          var idx = keywords.indexOf(term);

          if (ranking) {
            if (idx == -1) {
              ranking = null;
            } else {
              // one point for each term found
              ranking.rank++;

              // one additional point for every term starting with search
              if (idx == 0) {
                ranking.rank++;
              }

              if ((idx = title.indexOf(term)) != -1) {
                ranking.rank += 20 - idx; // ten points if you match title
              }
            }
          }
        });

        return ranking;
      }

      $scope.bestMatch = bestMatch;
    }
  };

  var DocsNavigationDirective = function DocsNavigationDirective() {
    return {
      restrict: 'EAC',
      controller: DocsNavigationController,

      link: function(scope, element, attributes) {
        scope.section = attributes["section"];
      }
    };
  };

  module
    .service("Pages", PagesProducer)
    .controller("DocsNavigationController", DocsNavigationController)
    .directive("formSearch", DocsNavigationDirective);

})(window.angular, window.jQuery);