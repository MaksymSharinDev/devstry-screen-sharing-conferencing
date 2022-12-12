By reading the requirement logic, the first thing to setup is the state machine
We separate websocket connection and the state machine must be handled as different layers to assure SRP


We check the documentation to see how to use xState with React
https://xstate.js.org/docs/recipes/react.html#local-state

Ok we should create a context provider to handle the state machine
...


before that we need to create a state machine

my strategy is using xstate to cut complexity and avoid confusion thanks to vscode xstate plugin, that way i can edit and debug
in a visual way and use later just dumb code to wire all up,

about the wiring between the state machine - websocket, i will use the xstate-react library to handle that and
use https://github.com/statelyai/xstate/issues/549 as reference


------------

Ok for the first app iteration let's set the goal to provide a working flow between react and state machine#


problems with typing as usual,
let's check how those are handled here : https://moduscreate.com/blog/xstate-react-typescript/


Ok given the comments online the most practical way to handle this is just avoid react context and use the simple hook useMachine


---- 

i read more about xState and a concept i been got mislead is the service one in this library context. so i ill sitch my strategy to start building the app and edit the machine iteratively

----

i can use socket.io-mock as building a server isn't required by the exercise

----

Harsh nights here

i discovered that i need to de-compose the behavior in multiple machines, ( actor model yada yada)
and evoking the machines from the parent one,

but in this way 

( i mean it's verbose and very counter-KISS-rule-instinct )

we have out of the box state machine diagrams, beheviour visual debug, and space-craft grade of state consistency (?)

not the best tradeoff when juniors are involved in a project, neither if the app is this simple. but scalability potential at least is a thing

-----

recap, we have AppMachine that orchestrates the macro behavior of the app, and we have a machine for each scope;
first scope of our interest to model is the liveClientMachine, that will handle the connection to the server to wait and send commands;

-----

Design Choice:

We gonna use a class to handle the websocket connection, to abstract the socket.io logic and provide simple methods,

