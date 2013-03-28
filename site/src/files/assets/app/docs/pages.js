CAM_PAGES = [


  // Process Design BPMN Symbol Reference
  { section: "design", category: "Overview", id: "design-overview", name: "Symbol Overview", url: "/reference", keywords: "overview" },

  { section: "design", category: "Participants", id: "design-pool", name: "Pool", url: "/participants/Pool", keywords: "pool" },
  { section: "design", category: "Participants", id: "design-lane", name: "Lane", url: "/participants/lanes", keywords: "lane" },  

  { section: "design", category: "Activities", id: "design-task", name: "Task", url: "/activities/tasks", keywords: "task" },
  { section: "design", category: "Activities", id: "design-subprocess", name: "Subprocess", url: "/activities/subprocess", keywords: "subprocess" },
  { section: "design", category: "Activities", id: "design-call", name: "Call Activity", url: "/activities/callactivity", keywords: "call activity" },
  { section: "design", category: "Activities", id: "design-adhoc", name: "Adhoc", url: "/activities/adhoc", keywords: "adhoc" },
  { section: "design", category: "Activities", id: "design-eventsub", name: "Event Subprocess", url: "/activities/event", keywords: "event subprocess" },

  { section: "design", category: "Gateways", id: "design-xor", name: "Exclusive (XOR)", url: "/gateways/xor", keywords: "exclusive gateway xor" },
  { section: "design", category: "Gateways", id: "design-and", name: "Parallel (AND)", url: "/gateways/and", keywords: "parallel gateway and" },
  { section: "design", category: "Gateways", id: "design-or", name: "Inclusive (OR)", url: "/gateways/or", keywords: "inclusive gateway or" },
  { section: "design", category: "Gateways", id: "design-eventgate", name: "Event-based", url: "/gateways/event", keywords: "event-based gateway" },

  { section: "design", category: "Events", id: "design-eventconcepts", name: "Basic Concepts", url: "/events/basics", keywords: "events" },
  { section: "design", category: "Events", id: "design-eventmessage", name: "Message", url: "/events/message", keywords: "message event" },
  { section: "design", category: "Events", id: "design-eventtimer", name: "Timer", url: "/events/timer", keywords: "timer event" },  
  { section: "design", category: "Events", id: "design-eventerror", name: "Error", url: "/events/error", keywords: "error event" },
  { section: "design", category: "Events", id: "design-eventconditional", name: "Conditional", url: "/events/conditional", keywords: "conditional event" },
  { section: "design", category: "Events", id: "design-eventsignal", name: "Signal", url: "/events/signal", keywords: "signal event" },
  { section: "design", category: "Events", id: "design-eventtermination", name: "Termination", url: "/events/termination", keywords: "termination event" },
  { section: "design", category: "Events", id: "design-eventlink", name: "Link", url: "/events/link", keywords: "link event" },
  { section: "design", category: "Events", id: "design-eventcompensation", name: "Compensation", url: "/events/compensation", keywords: "compensation event" },  
  { section: "design", category: "Events", id: "design-eventmultiple", name: "Multiple", url: "/events/multiple", keywords: "multiple event" },
  { section: "design", category: "Events", id: "design-eventparallel", name: "Parallel", url: "/events/parallel", keywords: "parallel event" },
  { section: "design", category: "Events", id: "design-eventescalation", name: "Escalation", url: "/events/escalation", keywords: "escalation event" },
  { section: "design", category: "Events", id: "design-eventcancel", name: "Cancel", url: "/events/cancel", keywords: "cancel event" },

  // engine api documentation
  { section: "implementation-java", category: "Introduction", id: "impl-java-engine-bootstrap", name: "Startup and Configuration Options", url: "/engine/configuration-and-startup", keywords: "engine startup configuration bootstrap overview ProcessEngineConfiguration" },
  //{ section: "implementation-java", category: "Introduction", id: "impl-java-engine-bootstrap", name: "Container Integration", url: "/engine/container-integration", keywords: "container integration jboss glassfish tomcat" },
  { section: "implementation-java", category: "Introduction", id: "impl-pa", name: "Process Applications", url: "/engine/process-application", keywords: "process application" },
  { section: "implementation-java", category: "Introduction", id: "impl-concepts", name: "Important Concepts", url: "/engine/concepts", keywords: "concepts" },  
  { section: "implementation-java", category: "Introduction", id: "impl-activiti-migration", name: "Activiti Migration Guide", url: "/engine/activiti-migration-guide", keywords: "activiti migration fox" },

  { section: "implementation-java", category: "Programming", id: "impl-java-services", name: "Services", url: "/engine/services", keywords: "services api" },
  { section: "implementation-java", category: "Programming", id: "impl-java-query-api", name: "Query API", url: "/engine/query-api", keywords: "query api" },
  { section: "implementation-java", category: "Programming", id: "impl-java-expressions", name: "Expression Language", url: "/engine/expressions", keywords: "expression language el uel juel" },
  { section: "implementation-java", category: "Programming", id: "impl-java-testing", name: "Testing", url: "/engine/testing", keywords: "testing" },
  { section: "implementation-java", category: "Programming", id: "impl-java-process-visualization", name: "Process Diagram API", url: "/engine/process-diagram-api", keywords: "process diagram api visualization" },

  { section: "implementation-java", category: "Spring Integration", id: "impl-spring-engine-bootstrap", name: "Engine Startup via Spring", url: "/spring/configuration-and-startup", keywords: "spring engine startup bootstrap" },
  { section: "implementation-java", category: "Spring Integration", id: "impl-spring-expressions", name: "Expression Language", url: "/spring/expressions", keywords: "spring expression language el uel juel" },
  { section: "implementation-java", category: "Spring Integration", id: "impl-spring-testing", name: "Testing", url: "/spring/testing", keywords: "spring testing" },
  
  { section: "implementation-java", category: "CDI Integration", id: "impl-cdi-engine-bootstrap", name: "Engine Startup in CDI", url: "/cdi/configuration-and-startup", keywords: "cdi engine startup bootstrap" },
  { section: "implementation-java", category: "CDI Integration", id: "impl-cdi-contextual", name: "Contextual Process Execution", url: "/cdi/contextual-process-execution", keywords: "cdi Contextual Process Execution" },
  
  // engine bpmn documentation

  { section: "implemention-bpmn", category: "Introduction", id: "bpmn-overview", name: "BPMN 2.0 Overview and Coverage", url: "/index", keywords: "concept bpmn 2.0 introduction overview coverage" },
  { section: "implemention-bpmn", category: "Introduction", id: "extensions", name: "Custom Extensions", url: "/concepts/custom-extensions", keywords: "concept custom extensions" },
  { section: "implemention-bpmn", category: "Introduction", id: "listeners", name: "Listeners", url: "/concepts/listeners", keywords: "concept task execution listeners" },
  { section: "implemention-bpmn", category: "Tasks", id: "service-task", name: "Service Task", url: "/tasks/service-task", keywords: "tasks service task" },
  { section: "implemention-bpmn", category: "Tasks", id: "user-task", name: "User Task", url: "/tasks/user-task", keywords: "tasks user task" },
  { section: "implemention-bpmn", category: "Tasks", id: "script-task", name: "Script Task", url: "/tasks/script-task", keywords: "tasks script task" },
  { section: "implemention-bpmn", category: "Tasks", id: "business-rule-task", name: "Business Rule Task", url: "/tasks/business-rule-task", keywords: "tasks business rule task" },
  { section: "implemention-bpmn", category: "Tasks", id: "manual-task", name: "Manual Task", url: "/tasks/manual-task", keywords: "tasks manual task" },
  { section: "implemention-bpmn", category: "Tasks", id: "receive-task", name: "Receive Task", url: "/tasks/receive-task", keywords: "tasks receive task" },
  { section: "implemention-bpmn", category: "Tasks", id: "task-markers", name: "Task Markers (Multiple Instance, Loop and Compensation)", shortName: "Task Markers", url: "/tasks/task-markers", keywords: "tasks markers multiple instance loop compensation parallel sequential" },

  { section: "implemention-bpmn", category: "Gateways and Sequence Flows", id: "exclusive-gateway", name: "Exclusive Gateway (XOR)", url: "/gateways/exclusive-gateway", keywords: "exclusive gateways xor" },
  { section: "implemention-bpmn", category: "Gateways and Sequence Flows", id: "sequence-flow", name: "Conditional and default Sequence Flows", url: "/gateways/sequence-flow", keywords: "sequence flows conditional default" },
  { section: "implemention-bpmn", category: "Gateways and Sequence Flows", id: "parallel-gateway", name: "Parallel Gateway (AND)", url: "/gateways/parallel-gateway", keywords: "parallel gateways and" },
  { section: "implemention-bpmn", category: "Gateways and Sequence Flows", id: "inclusive-gateway", name: "Inclusive Gateway (OR)", url: "/gateways/inclusive-gateway", keywords: "inclusive gateways or" },
  { section: "implemention-bpmn", category: "Gateways and Sequence Flows", id: "event-based-gateway", name: "Event Based Gateway", url: "/gateways/event-based-gateway", keywords: "event based gateways" },

  //  { section: "implemention-bpmn", category: "Events", id: "events-overview", name: "Overview and Basic Concepts", shortName: "Events Overview", url: "/events/event-overview", keywords: "events event overview concept" },
  { section: "implemention-bpmn", category: "Events", id: "blank-event", name: "Blank Event", url: "/events/none-events", keywords: "events blank event" },
  { section: "implemention-bpmn", category: "Events", id: "message-event", name: "Message Event", url: "/events/message-events", keywords: "events message event" },
  { section: "implemention-bpmn", category: "Events", id: "timer-event", name: "Timer Event", url: "/events/timer-events", keywords: "events timer event" },
  { section: "implemention-bpmn", category: "Events", id: "error-event", name: "Error Event", url: "/events/error-events", keywords: "events error event" },
  { section: "implemention-bpmn", category: "Events", id: "signal-event", name: "Signal Event", url: "/events/signal-events", keywords: "events signal event" },
  { section: "implemention-bpmn", category: "Events", id: "compensation-event", name: "Cancel and Compensation Event", url: "/events/cancel-and-compensation-events", keywords: "events compensation event" },

  { section: "implemention-bpmn", category: "Subprocesses", id: "embedded-subprocess", name: "Embedded Subprocess", url: "/subprocesses/embedded-subprocess", keywords: "subprocesses embedded subprocess" },
  { section: "implemention-bpmn", category: "Subprocesses", id: "call-activity", name: "Call Activity", url: "/subprocesses/call-activity", keywords: "subprocesses call activity" },
  { section: "implemention-bpmn", category: "Subprocesses", id: "event-subprocess", name: "Event Subprocess", url: "/subprocesses/event-subprocess", keywords: "subprocesses event subprocess" },
  { section: "implemention-bpmn", category: "Subprocesses", id: "transaction-subprocess", name: "Transaction Subprocess", url: "/subprocesses/transaction-subprocess", keywords: "subprocesses transaction subprocess" },
  
  // rest api documentation
  
  { section: "rest", category: "Overview", id: "rest-introduction", name: "Introduction", url: "/overview/introduction", keywords: "rest overview" },
  { section: "rest", category: "Overview", id: "rest-distro-use", name: "Use with a pre-built distro", url: "/overview/distro-use", keywords: "rest usage distro distribution tomcat jboss glassfish" },
  { section: "rest", category: "Overview", id: "rest-embeddability", name: "Embedding the API", url: "/overview/embeddability", keywords: "rest usage embed embeddability application jaxrs" },
  
  { section: "rest", category: "Process Engine", id: "get-engine-names", name: "Get Engine Names", url: "/engine/get-names", keywords: "get process engine processengine name list all" },
  
  { section: "rest", category: "Process Definition", id: "get-definition", name: "Get Single Definition", url: "/process-definition/get", keywords: "definition get process-definition" },
  { section: "rest", category: "Process Definition", id: "get-definitions", name: "Get Definitions", url: "/process-definition/get-query", keywords: "definitions get process-definition query filter" },
  { section: "rest", category: "Process Definition", id: "get-definitions-count", name: "Get Definitions Count", url: "/process-definition/get-query-count", keywords: "definitions get process-definition query filter count" },
  { section: "rest", category: "Process Definition", id: "get-definition-xml", name: "Get BPMN 2.0 XML", url: "/process-definition/get-xml", keywords: "definition get process-definition xml bpmn 2.0 2" },
  { section: "rest", category: "Process Definition", id: "post-start-process", name: "Start Process", url: "/process-definition/post-start-process", keywords: "definition post process-definition start instance" },
  { section: "rest", category: "Process Definition", id: "get-statistics", name: "Get Process Instance Statistics", url: "/process-definition/get-statistics", keywords: "definitions get process-definition instance statistics aggregate sum" },
  { section: "rest", category: "Process Definition", id: "get-activity-statistics", name: "Get Activity Instance Statistics", url: "/process-definition/get-activity-statistics", keywords: "definitions get process-definition activity statistics aggregate sum" },
  { section: "rest", category: "Process Definition", id: "get-start-form-key", name: "Get Start Form Key", url: "/process-definition/get-start-form-key", keywords: "definition get process-definition startForm start form key" },
  
  { section: "rest", category: "Process Instance", id: "get-instances", name: "Get Instances", url: "/process-instance/get-query", keywords: "instances get process-instance query filter" },
  { section: "rest", category: "Process Instance", id: "get-instances-count", name: "Get Instances Count", url: "/process-instance/get-query-count", keywords: "instances get process-instance query filter count" },
  { section: "rest", category: "Process Instance", id: "post-instances", name: "Get Instances (POST)", url: "/process-instance/post-query", keywords: "instances post process-instance query filter" },
  { section: "rest", category: "Process Instance", id: "post-instances-count", name: "Get Instances Count (POST)", url: "/process-instance/post-query-count", keywords: "instances post process-instance query filter count" },
  { section: "rest", category: "Process Instance", id: "get-instance-variables", name: "Get Process Variables", url: "/process-instance/get-variables", keywords: "instances get process-instance variables" },
  
  { section: "rest", category: "Task", id: "get-task", name: "Get Single Task", url: "/task/get", keywords: "task get" },
  { section: "rest", category: "Task", id: "get-tasks", name: "Get Tasks", url: "/task/get-query", keywords: "tasks get task filter query" },
  { section: "rest", category: "Task", id: "get-tasks-count", name: "Get Tasks Count", url: "/task/get-query-count", keywords: "tasks get task filter query count" },
  { section: "rest", category: "Task", id: "post-tasks", name: "Get Tasks (POST)", url: "/task/post-query", keywords: "tasks post task filter query" },
  { section: "rest", category: "Task", id: "post-tasks-count", name: "Get Tasks Count (POST)", url: "/task/post-query-count", keywords: "tasks post task filter query count" },
  { section: "rest", category: "Task", id: "get-form-key", name: "Get Form Key", url: "/task/get-form-key", keywords: "tasks get task form key" },
  { section: "rest", category: "Task", id: "post-claim", name: "Claim Task", url: "/task/post-claim", keywords: "tasks post task claim" },
  { section: "rest", category: "Task", id: "post-unclaim", name: "Unclaim Task", url: "/task/post-unclaim", keywords: "tasks post task unclaim" },
  { section: "rest", category: "Task", id: "post-complete", name: "Complete Task", url: "/task/post-complete", keywords: "tasks post task complete variables" },
  { section: "rest", category: "Task", id: "post-resolve", name: "Resolve Task", url: "/task/post-resolve", keywords: "tasks post task resolve variables" },
  { section: "rest", category: "Task", id: "post-delegate", name: "Delegate Task", url: "/task/post-delegate", keywords: "tasks post task delegate assignee" },
  { section: "rest", category: "Task", id: "get-group-info", name: "Get a User's Groups", url: "/task/get-group-info", keywords: "tasks get task groups user" },


  { section: "guidelines", category: "Overview", id: "checlist", name: "Checklist", url: "/checklist", keywords: "" },
  { section: "guidelines", category: "Overview", id: "create-checklist", name: "Create your own checklist", url: "/", keywords: "" },
  { section: "guidelines", category: "Overview", id: "symbols", name: "Used symbols", url: "/symbols", keywords: "" },
  { section: "guidelines", category: "Naming Conventions", id: "naming-convention-tasks", name: "Tasks", url: "/naming-conventions/tasks", keywords: "tasks naming conventions" },
  { section: "guidelines", category: "Naming Conventions", id: "naming-convention-events", name: "Events", url: "/naming-conventions/events", keywords: "events naming conventions" },
  { section: "guidelines", category: "Layout Styles", id: "layout-styles-direction", name: "Modeling Direction", url: "/layout-styles/direction", keywords: "events naming conventions" },

  { section: "patterns", category: "Human Pools", id: "joint-work", name: "Joint work on task", url: "/joint-work-on-task", keywords: "joint work user task" },

  { section: "tutorials", category: "Monitoring", id: "kpi", name: "KPI's using history and measuring points", url: "/kpi-history-query", keywords: "kpi history query" },

  
];