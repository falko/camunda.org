'use strict';

angular
  .module('camundaorg', ['ng', 'camundaorg.filters', 'camundaorg.services', 'camundaorg.directives'])

  .config(function ($routeProvider) {

        $routeProvider.when('/design/reference', {
            templateUrl: 'partials/design/reference.html',
            controller: 'DefaultController'
        });

        $routeProvider.when('/design/activities/tasks', {
            templateUrl: 'partials/design/activities/tasks.html',
            controller: 'DefaultController'
        });

        $routeProvider.when('/design/gateways/xor', {
            templateUrl: 'partials/design/gateways/xor.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/design/gateways/and', {
            templateUrl: 'partials/design/gateways/and.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/design/gateways/or', {
            templateUrl: 'partials/design/gateways/or.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/design/gateways/event', {
            templateUrl: 'partials/design/gateways/event.html',
            controller: 'DefaultController'
        });

        $routeProvider.when('/design/participants/lanes', {
            templateUrl: 'partials/design/participants/lanes.html',
            controller: 'DefaultController'
        });

        $routeProvider.when('/design/events/basics', {
            templateUrl: 'partials/design/events/basics.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/message', {
            templateUrl: 'partials/design/events/message.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/timer', {
            templateUrl: 'partials/design/events/timer.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/error', {
            templateUrl: 'partials/design/events/error.html',
            controller: 'DefaultController'
        });  
        $routeProvider.when('/design/events/conditional', {
            templateUrl: 'partials/design/events/conditional.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/signal', {
            templateUrl: 'partials/design/events/signal.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/termination', {
            templateUrl: 'partials/design/events/termination.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/link', {
            templateUrl: 'partials/design/events/link.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/compensation', {
            templateUrl: 'partials/design/events/compensation.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/multiple', {
            templateUrl: 'partials/design/events/multiple.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/parallel', {
            templateUrl: 'partials/design/events/parallel.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/escalation', {
            templateUrl: 'partials/design/events/escalation.html',
            controller: 'DefaultController'
        });    
        $routeProvider.when('/design/events/cancel', {
            templateUrl: 'partials/design/events/cancel.html',
            controller: 'DefaultController'
        });   

        $routeProvider.when('/design/activities/subprocess', {
            templateUrl: 'partials/design/activities/subprocess.html',
            controller: 'DefaultController'
        }); 
        $routeProvider.when('/design/activities/callactivity', {
            templateUrl: 'partials/design/activities/callactivity.html',
            controller: 'DefaultController'
        }); 
        $routeProvider.when('/design/activities/adhoc', {
            templateUrl: 'partials/design/activities/adhoc.html',
            controller: 'DefaultController'
        }); 
        $routeProvider.when('/design/activities/event', {
            templateUrl: 'partials/design/activities/event.html',
            controller: 'DefaultController'
        }); 
        $routeProvider.when('/design/participants/pool', {
            templateUrl: 'partials/design/participants/pool.html',
            controller: 'DefaultController'
        });         



        $routeProvider.when('/events/start-events', {
            templateUrl: 'partials/implement/events/start-events.html',
            controller: 'DefaultController'
        });



        $routeProvider.when('/tasks/service-task', {
            templateUrl: 'partials/implement/tasks/service-task.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/tasks/user-task', {
            templateUrl: 'partials/implement/tasks/user-task.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/tasks/script-task', {
            templateUrl: 'partials/implement/tasks/script-task.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/tasks/business-rule-task', {
            templateUrl: 'partials/implement/tasks/business-rule-task.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/tasks/manual-task', {
            templateUrl: 'partials/implement/tasks/manual-task.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/tasks/receive-task', {
            templateUrl: 'partials/implement/tasks/receive-task.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/tasks/markers', {
            templateUrl: 'partials/implement/tasks/task-markers.html',
            controller: 'DefaultController'
        });



        $routeProvider.when('/subprocess/embedded-subprocess', {
            templateUrl: 'partials/implement/subprocess/embedded-subprocess.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/subprocess/call-activity', {
            templateUrl: 'partials/implement/subprocess/call-activity.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/subprocess/event-subprocess', {
            templateUrl: 'partials/implement/subprocess/event-subprocess.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/subprocess/transaction-subprocess', {
            templateUrl: 'partials/implement/subprocess/transaction-subprocess.html',
            controller: 'DefaultController'
        });
        

        $routeProvider.when('/concepts/listeners', {
            templateUrl: 'partials/implement/concepts/listeners.html',
            controller: 'DefaultController'
        });

        $routeProvider.when('/concepts/error-handling', {
            templateUrl: 'partials/implement/concepts/error-handling.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/concepts/cdi', {
            templateUrl: 'partials/implement/concepts/cdi.html',
            controller: 'DefaultController'
        });

    });


    