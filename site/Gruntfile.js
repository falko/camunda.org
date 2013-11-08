/**
 * Created with IntelliJ IDEA.
 * User: hentschel
 * Date: 23.08.13
 * Time: 12:23
 * To change this template use File | Settings | File Templates.
 */

module.exports = function(grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      my_target: {
        options: {
          compress: {
            unused: true,
            dead_code: true,
            warnings: true
          },
          mangle: true
        },
        files: {
          'out/assets/app/application.min.js': [
            "out/assets/vendor/jquery/jquery.min.js",
            "out/assets/vendor/raphaeljs/raphael.js",
            "out/assets/vendor/jquery/validate/jquery.validate.min.js",
            "out/assets/vendor/jquery/placeholder/jquery.placeholderpatch.min.js",
            "out/assets/vendor/bootstrap/js/bootstrap.min.js",
            "out/assets/vendor/respond/respond.min.js",
            "out/assets/vendor/google-code-prettify/prettify.min.js",
            "out/assets/vendor/analytics/analytics.js",
            'out/assets/app/application.js',
            'out/assets/app/cabpmn.js'
          ]
        }
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      minify: {
        expand: true,
        cwd: 'out/assets/css',
        src: ['*.css', '!*.min.css'],
        dest: 'out/assets/css',
        ext: '.min.css'
      },
      combine: {
        files: {
          'out/assets/css/app.min.css': [
            "out/assets/vendor/bootstrap/css/bootstrap.min.css",
            "out/assets/vendor/google-code-prettify/prettify.css",
            "out/assets/vendor/font-awesome/css/font-awesome.min.css",
            'out/assets/css/cabpmn.min.css',
            'out/assets/css/extra-small.min.css',
            'out/assets/css/small.min.css',
            'out/assets/css/medium.min.css',
            'out/assets/css/large.min.css',
            'out/assets/css/special.min.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeCommentsFromCDATA: true,
          collapseBooleanAttributes: true,
          useShortDoctype: true
        },
        files: {
          // ROOT LEVEL
          'out/community.html': 'out/community.html',
          'out/design.html': 'out/design.html',
          'out/support.html': 'out/support.html',
          'out/privacy.html': 'out/privacy.html',
          'out/index.html': 'out/index.html',

          // COMMUNITY
          'out/community/meetings/register.html': 'out/community/meetings/register.html',
          'out/community/contribute.html': 'out/community/contribute.html',
          'out/community/forum.html': 'out/community/forum.html',
          'out/community/meetings.html': 'out/community/meetings.html',
          'out/community/roadmap.html': 'out/community/roadmap.html',
          'out/community/team.html': 'out/community/team.html',
          'out/community/users.html': 'out/community/users.html',
          'out/community/vision.html': 'out/community/vision.html',
          'out/community/jobs.html': 'out/community/jobs.html',

          // COMMUNITY - jobs
          'out/community/jobs/web-developer.html': 'out/community/jobs/web-developer.html',
          'out/community/jobs/java-developer.html': 'out/community/jobs/java-developer.html',
          'out/community/jobs/technical-consultant.html': 'out/community/jobs/technical-consultant.html',
          'out/community/jobs/student.html': 'out/community/jobs/student.html',

          // DESIGN
          'out/design/cycle-tutorial.html': 'out/design/cycle-tutorial.html',
          'out/design/reference.html': 'out/design/reference.html',
          'out/design/tutorial.html': 'out/design/tutorial.html',

          // DOWNLOAD
          'out/download/index.html': 'out/download/index.html',
          'out/download/modeler.html': 'out/download/modeler.html',
          'out/download/previous.html': 'out/download/previous.html',

          // GETTING STARTED
          'out/get-started/developing-process-applications.html': 'out/get-started/developing-process-applications.html',
          'out/get-started/index.html': 'out/get-started/index.html',
          'out/get-started/spring-framework.html': 'out/get-started/spring-framework.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin']);
};
