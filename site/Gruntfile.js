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
          mangle: false
        },
        files: {
          'out/assets/app/app.min.js': ['out/assets/app/app.js'],
          'out/assets/app/cabpmn.min.js': ['out/assets/app/cabpmn.js'],

          'out/assets/app/bpmn/Bpmn.min.js': ['out/assets/app/bpmn/Bpmn.js'],
          'out/assets/app/bpmn/Executor.min.js': ['out/assets/app/bpmn/Executor.js'],
          'out/assets/app/bpmn/Renderer.min.js':  ['out/assets/app/bpmn/Renderer.js'],
          'out/assets/app/bpmn/Transformer.min.js': ['out/assets/app/bpmn/Transformer.js'],

          'out/assets/app/directives/ngmif.min.js': ['out/assets/app/directives/ngmif.js'],

          'out/assets/app/docs/doc.min.js': [
            'out/assets/app/docs/docs.js',
            'out/assets/app/docs/pages.js'],

          'out/assets/vendor/jquery/placeholder/jquery.placeholderpatch.min.js': ['out/assets/vendor/jquery/placeholder/jquery.placeholderpatch.js']
        }
      },
      my_target_mangled: {
        options: {
          compress: {
            unused: true,
            dead_code: true,
            warnings: true
          },
          mangle: true
        },
        files: {
          'out/assets/vendor/angular/angular-bootstrap.min.js': ['out/assets/vendor/angular/angular-bootstrap.js']
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
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeCommentsFromCDATA: true
        },
        files: {
          // ROOT LEVEL
          'out/community.html': 'out/community.html',
          'out/design.html': 'out/design.html',
          'out/footer.html': 'out/footer.html',
          'out/navigation.html': 'out/navigation.html',
          'out/support.html': 'out/support.html',
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

          // DESIGN
          'out/design/cycle-tutorial.html': 'out/design/cycle-tutorial.html',
          'out/design/modeler.html': 'out/design/modeler.html',
          'out/design/reference.html': 'out/design/reference.html',
          'out/design/tutorial.html': 'out/design/tutorial.html',

          // DOWNLOAD
          'out/download/index.html': 'out/download/index.html',
          'out/download/previous.html': 'out/download/previous.html',

          // GETTING STARTED
          'out/get-started/developing-process-applications.html': 'out/get-started/developing-process-applications.html',
          'out/get-started/index.html': 'out/get-started/index.html',
          'out/get-started/spring-framework.html': 'out/get-started/spring-framework.html',

          // PARTIALS
          'out/partials/design/reference.html': 'out/partials/design/reference.html',
          // PARTIALS - activity
          'out/partials/design/activities/adhoc.html': 'out/partials/design/activities/adhoc.html',
          'out/partials/design/activities/callactivity.html': 'out/partials/design/activities/callactivity.html',
          'out/partials/design/activities/event.html': 'out/partials/design/activities/event.html',
          'out/partials/design/activities/subprocess.html': 'out/partials/design/activities/subprocess.html',
          'out/partials/design/activities/tasks.html': 'out/partials/design/activities/tasks.html',
          // PARTIALS - events
          'out/partials/design/events/basics.html': 'out/partials/design/events/basics.html',
          'out/partials/design/events/cancel.html': 'out/partials/design/events/cancel.html',
          'out/partials/design/events/compensation.html': 'out/partials/design/events/compensation.html',
          'out/partials/design/events/conditional.html': 'out/partials/design/events/conditional.html',
          'out/partials/design/events/error.html': 'out/partials/design/events/error.html',
          'out/partials/design/events/escalation.html': 'out/partials/design/events/escalation.html',
          'out/partials/design/events/link.html': 'out/partials/design/events/link.html',
          'out/partials/design/events/message.html': 'out/partials/design/events/message.html',
          'out/partials/design/events/multiple.html': 'out/partials/design/events/multiple.html',
          'out/partials/design/events/parallel.html': 'out/partials/design/events/parallel.html',
          'out/partials/design/events/signal.html': 'out/partials/design/events/signal.html',
          'out/partials/design/events/termination.html': 'out/partials/design/events/termination.html',
          'out/partials/design/events/timer.html': 'out/partials/design/events/timer.html',
          // PARTIALS - gateways
          'out/partials/design/gateways/and.html': 'out/partials/design/gateways/and.html',
          'out/partials/design/gateways/event.html': 'out/partials/design/gateways/event.html',
          'out/partials/design/gateways/or.html': 'out/partials/design/gateways/or.html',
          'out/partials/design/gateways/xor.html': 'out/partials/design/gateways/xor.html',
          // PARTIALS - participants
          'out/partials/design/participants/lanes.html': 'out/partials/design/participants/lanes.html',
          'out/partials/design/participants/Pool.html': 'out/partials/design/participants/Pool.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin']);
};
