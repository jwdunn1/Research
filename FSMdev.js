////////////////////////////////////////////////////////////////////////////////
// Finite State Machine Mechanism in JavaScript

// Distillation and Permutation
// State Machine Constructor Design 
// Engineer: James William Dunn
// Date: 20151225

// distillation: the extraction of the essential meaning or most important aspects of something.
// permutation: the action of changing the arrangement

// Some background: What is a FSM?
/* Wikipedia states: A finite-state machine (FSM) or finite-state automaton (plural: automata), or simply a state machine, is a mathematical model of computation used to design both computer programs and sequential logic circuits. It is conceived as an abstract machine that can be in one of a finite number of states. The machine is in only one state at a time; the state it is in at any given time is called the current state. It can change from one state to another when initiated by a triggering event or condition; this is called a transition. A particular FSM is defined by a list of its states, and the triggering condition for each transition.

The behavior of state machines can be observed in many devices in modern society that perform a predetermined sequence of actions depending on a sequence of events with which they are presented. Simple examples are vending machines, which dispense products when the proper combination of coins is deposited, elevators, which drop riders off at upper floors before going down, traffic lights, which change sequence when cars are waiting, and combination locks, which require the input of combination numbers in the proper order.

Finite-state machines can model a large number of problems, among which are electronic design automation, communication protocol design, language parsing and other engineering applications. In biology and artificial intelligence research, state machines or hierarchies of state machines have been used to describe neurological systems. In linguistics, they are used to describe simple parts of the grammars of natural languages. <end>

--------------------------------------------------------------------------------

Unit Operations by Ian Bogost 2006

"Unit operations are modes of meaning-making that privilege discrete, disconnected actions over deterministic, progressive systems." p3

"FSMs operate in discrete unit operations whose aggregate effects represent a coherent behavior." p145

"In the language of software engineering, unit operations are procedural, whereas system operations are structured." p8

"our relationships with banks have become unit operations" p41

"discrete, interlocking units" p(ix)

--------------------------------------------------------------------------------
http://www.skorks.com/2011/09/why-developers-never-use-state-machines

Warren Young commented: "The thing about complex problems where the solution system really does move from one state to the next is that, if you are not using a formal state machine mechanism, you will have invented an informal one anyway. As the number of states and transitions grows, the more spaghetti-like your code will become. This is because, in an ad hoc state machine, state variables tend to get scattered through the system, and transitions happen in whatever way is expedient at the time."


--------------------------------------------------------------------------------

An example of a state transition table or state map for a coin-operated turnstile, is given by Robert C. Martin, in his (June 1998) paper titled 
"UML Tutorial: Finite State Machines" (umlfsm.pdf)

State:    Trigger:  Next state:  Action:
Locked    Coin      Unlocked     Unlock
Locked    Pass      Locked       Alarm
Unlocked  Coin      Unlocked     Thankyou
Unlocked  Pass      Locked       Lock

---------------------------------------------

An ideal transition pattern to emulate (resembling a method call) is found on smc.sourceforge.com

To issue a transition invoke:
fsm.<transition>();

where <transition> is the name of the trigger. If the transition takes arguments they are passed in the transition call:
fsm.Connect("192.168.3.100", 80);

A warning about SMC is given in the documentation: Do NOT issue a transition from within an action. The FAQ goes on...While in the transition, an object is not in any state. See http://smc.sourceforge.net/SmcFaq.htm#NoTransFromAction for further discussion.

---------------------------------------------

The course CSC216 Programming Concepts in Java (Summer 2005) by Dr. David R. Wright at NC State Univ includes coverage of finite state machines. It presents an object-oriented implementation approach. The technique makes use of inheritance and polymorphism, however, the resulting code is lengthy and less than ideal.

--------------------------------------------------------------------------------

Creating E-Learning Games with Unity by David Horachek
"A system for encoding and switching state"

-------------------------------------------------------------------------------

http://www.drdobbs.com/hierarchical-state-machine-design-in-c/184402040
Hierarchical State Machine Design in C++
By Dmitry Babitsky, December 01, 2005

"In a Hierarchical Finite State Machine, any state can be a substate of some larger state. "

-------------------------------------------------------------------------------


http://www.drdobbs.com/cpp/a-finite-state-machine-framework/184401784
A Finite State Machine Framework
By P. Dale Mason, April 01, 2004

-------------------------------------------------------------------------------


http://www.drdobbs.com/who-moved-my-state/184401643
Who Moved My State? By Miro Samek, April 01, 2003


---------------------------------------------

http://www.drdobbs.com/cpp/state-machine-design-in-c/184401236

"There are innumerable ways to implement a state machine. Some are simple and elegant, others are more complex but offer increased error checking and flexibility."

"State machines break down the design into a series of steps, or what are called states in state-machine lingo. Each state performs some narrowly defined task. Events, on the other hand, are the stimuli which cause the state machine to move, or transition, between states."

--------------------------------------------------------------------------------

http://www.drdobbs.com/object-oriented-finite-state-machines/184403458

An article in Dr. Dobbs by Frantisek Kaduch, (February 01, 1998) called "Object-Oriented Finite-State Machines" presents a reusable base class to capture code that's common to many FSM applications. The author stipulates a focus on avoiding the use of switch statements and attention to run-time efficiency and small size. The design of the FSM is based on a bridge design pattern: references Robert Martin: Designing Object Oriented C++ Applications Using the Booch Method (Prentice Hall, Englewood Cliffs, NJ, 1995).

---------------------------------------------

According to Booch: "Where the life cycle of certain objects is significant or essential to a scenario, develop a finite state machine for the class of objects."

He also refers to a "submachine" as "an entirely separate state machine"

"State machine diagrams ... can be very, very complex."

---------------------------------------------

bbv.Common is a project of bbv Software Services
"bbv Software Services AG is a Swiss software and consulting company. We stand for top quality in software engineering and for extensive experience in implementing ideas."

bbv.Common was renamed to appccelerate a library which offers a full-featured FSM (large code base) at Appccelerate.com

"Motivation
Our applications are full of state machines. Enabled and disabled UI elements, abstractions of devices and business logic. Implementing these state machines with the state pattern is overly complicated. Therefore, we implemented a state machine component that allows implementing a state machine as a single class. This reduces complexity and needed effort dramatically."

"Transitions

Transitions are state switches that are executed in response of an event that was fired onto the state machine. You can define per state and event which transition is taken and therefore which state to go to.

Actions

You can define actions either on transitions or on entry or exit of a state. Transition actions are executed when the transition is taken as response to an event. The entry and exit action of a state are excuted when the state machine enters or exits the state due to a taken transition. In case of hierarchical states, multiple entry and exit actions can be executed."

Article on unit testing FSMs: http://blog.bbv.ch/2011/06/01/how-to-unit-test-finite-state-machines/

http://www.appccelerate.com/statemachinesample.html
Example of hierarchical state machine transition table:
Source:  Event:        Guard:         Target:              Actions:
OnFloor  CloseDoor                    DoorClosed      
OnFloor  OpenDoor                     DoorOpen        
OnFloor  GoUp          CheckOverload  MovingUp        
OnFloor  GoUp                         internal transition  AnnounceOverload, Beep
OnFloor  GoDown        CheckOverload  MovingDown      
OnFloor  GoDown                       internal transition  AnnounceOverload
Moving   Stop                         OnFloor         
Healthy  ErrorOccured                 Error           
Error    Reset                        Healthy         
Error    ErrorOccured                 internal transition  


---------------------------------------------
Dr. Miro Samek, Practical UML Statecharts
http://state-machine.com/doc/concepts.html#HSM

---------------------------------------------

http://accu.org/index.php/journals/252
Hierarchical state machines (HSMs) can be converted to ordinary (flat) state machines


---------------------------------------------

Notes from slides
http://www.cis.upenn.edu/~lee/06cse480/lec-HSM.pdf

• The standard advice for those coding a finite state machine is to use a while
loop, a case statement, and a state variable.
• This is bad, as the unstructured control transfers have been modeled in the code
with assignments to variable state.
• The state variable serves as a goto statement, and the while and case
statements obscure the underlying control structure.

What’s missing in FSMs is a mechanism of factoring out the common behavior in order to reuse it across many states.

you will no longer struggle with convoluted if-else statements and gazillions of flags. You will start
thinking at a higher level of abstraction. 

can trigger a paradigm shift in your way of thinking about programming

---------------------------------------------

Entry/Exit Actions
Entry actions occur when entering a state
Exit actions occur when exiting a state

---------------------------------------------

Can an action issue a transition? Perhaps it depends on the definition of action. It would make sense to be able to do so from a non-state changing action, since the function is to perform a sequence of events and return with no report of state change. On the other hand, a transition function *will* change the state at termination of its sequence, thus any other state change attempt would be overridden at the conclusion of the transition function. A call to the same transition function presently in operation would lead to recursion and possible stack fault if unchecked.

---------------------------------------------

Code Incomplete by Jake Gordon

"I am in favor of finding small, discrete, libraries that do one thing, and do it well. And if you can’t find one then build one..."

"In addition to the high level game state (menu vs play), any individual object within a game can also benefit from being a finite state machine."

He is also in favor of declaring the states in an object and then invoking the transitions by name:

"For a simple game, we might only need 2 states:

menu - waiting for the user to start the game.
game - the user is playing the game.
state: {
  initial: 'menu',
  events: [
    { name: 'play',    from: 'menu', to: 'game' },
    { name: 'abandon', from: 'game', to: 'menu' },
    { name: 'lose',    from: 'game', to: 'menu' }
  ]},
The javascript-state-machine library provides…

play() - transition from menu to game
abandon() - transition from game to menu
lose() - transition from game to menu

This kind of infrastructure allows our game to stay a clean, event driven application instead of devolving into a complex procedural set of if/then/else statements."


Mr. Gordon's JavaScript state machine library v2.3.5 is 4071 bytes minified.
v2.0.0 was 1918 bytes minified.

---------------------------------------------

State design pattern
http://www.dofactory.com/javascript/state-design-pattern
"Allow an object to alter its behavior when its internal state changes. The object will appear to change its class."

"It is the State object that determines the transition to the next state. And it is also the State object that changes the current state in the TrafficLight -- not the TrafficLight itself."

----------------------------------------------

Toggle a hash map value between two (or more) states.

http://thinkrelevance.com/blog/2013/02/18/hashmaps-as-mini-state-machines
*/

//In JS, this would be: 
var toggle={checked: "unchecked", unchecked: "checked", undefined:"checked"}, state;
//Toggling between the two states is:
state= toggle[state];
//> "checked"
state= toggle[state];
//> "unchecked"

/*
-----------------------------------------------

http://jsclass.jcoglan.com/state.html

State is an implementation of the State pattern in JavaScript.
It does not implement a finite state machine.

-----------------------------------------------
US Patent #9020873 states:
"A finite state machine is a representation of an event-driven system."

-----------------------------------------------

Programming iOS 9 by Matt Neuburg, O'Reilly 2016

"To figure out what’s going on as touches are received by a view, your code must essentially function as a kind of state machine." p216

-----------------------------------------------

3 part article
"Finite state machines in JavaScript"  Jan 2007
http://www.ibm.com/developerworks/library/wa-finitemach1/

"Finite state machines model behavior where responses to future events depend upon previous events. There is a rich body of academic literature in this field (see Resources), but a useful working definition is straightforward. Finite state machines are computer programs that consist of:
- Events that the program responds to
- States where the program waits between events
- Transitions between states in response to events
- Actions taken during transitions
- Variables that hold values needed by actions between events

Finite state machines are most useful in situations where behavior is driven by many different types of events, and the response to a particular event depends on the sequence of previous events. The events that drive finite state machines can be external to the computer, originating from a keyboard, mouse, timer, or network activity, or they can be internal to the computer, originating from other parts of the application program, or other applications.

States are a way to remember previous events, and transitions are a way to organize responses to future events. One of the states must be designated as the initial state. There may be a final state, but this is optional, and the FadingTooltip widget does not have one.
Two common representations of finite state machines are:
Directed graphs

Balloons represent states, and arrows between them represent transitions, which are labeled with events and actions.
Two-dimensional tables
Rows and columns represent events and states, and cells contain actions and transitions.

These representations are equivalent, but emphasize different aspects of design. Both are useful, and I use both later in this article.
Developing event-driven programs with finite state machines is a bit more complicated than ordinary procedural programming; it requires more discipline generally, and more design effort in particular. When done well, it can result in simpler code, faster testing, and easier maintenance. Even so, the complexity of finite state machines is not worthwhile for all event-driven programs. When the variety of events is small, for example, or the actions triggered by events are always the same, the extra development effort might not be justified."

-----------------------------------------------

http://javascript-jedi.com/jquery-finite-state-machine/

An interesting FSM for jQuery. Makes a connection between the selected element on a webpage with named state and a behavior.

Syntax
$(‘element-selector’).jfsm(‘mystate’,state-descriptor): Define a descriptor for an element on the state ‘mystate’. The descriptor is an hash array[sic <should read: object>] which may contain one or more of these keys:

visible (true| false)
    Make this element visibile or hidden in the defined state. The default is true.
className (string)
    assign a CCS class to the element in the defined state
click (function)
    assign a click handler for the element in the defined state

$.jfsm(‘to-state’): Change the state the to ‘to-state’, triggering all the UI changes defined with the function above.

--------------------------------------------------------------------------------

www.micronengineering.it/Finite_State_Machines.ppt

FSM Mathematical Model
An acceptor FSM is a quintuple (Σ,S,s0,,F), where:
 Σ is the input alphabet (a finite non empty set of symbols).
 S is a finite non empty set of states.
 s0 is an initial state, an element of S. In a non deterministic         finite state machine, s0 is a set of initial states.
  is the state transition function:  = S S.
 F is the set of final states a (possibly empty) subset of S.


--------------------------------------------------------------------------------

http://jessewarden.com/2012/07/finite-state-machines-in-game-development.html

"There are 3 use cases [for] State Machines. These are Artificial Intelligence, modeling simulations, and a refactoring path for game entities.

For modeling simulations, whether complex machinery, or situations, you often have a ton of moving parts. You’re interested in the potential interactions when certain things are in certain states. Sometimes you want these situations to be repeatable.

For example, for simulating hardware of large steel manufacturing machinery for training purposes, you want to setup the machine either in a specific state, or towards one to teach a new operator how to handle a certain negative situation in a safe environment to learn. You start a predefined set of actions to get the machine in a state where something bad is about to happen, and the operator has to learn how to push the right buttons or turn the right knobs to stop things from going bad.

You can do the same at a macro level for emulating events. Think SimCity.

This is also why unit testing deterministic state machines is pretty easy, albeit not as fun as non-deterministic, because you know all the paths ahead of time and the potential interactions."

--------------------------------------------------------------------------------

Object Lifecycles: Modeling the World In States
by Stephen J. Mellor & Sally Shlaer 
"A companion handbook to Shalaer and Mellor's popular Object-Oriented Systems Analysis, this book explains how to formalize the dynamic behavior and interaction of objects using state models, and how then to derive the system's required operations from the action of the state models. Extensive guidelines are provided for partioning of processes through data flow diagrams in order to maximize process reuse. Advanced topics include:layering, timers, contention problems, failure analysis, threads of control, alternative models of time, simulation, domain partioning, and transformation of object-oriented analysis into an object-oriented design."


--------------------------------------------------------------------------------

The Unity game engine has what they call "Animation State Machines"
http://docs.unity3d.com/Manual/AnimationStateMachines.html

"The basic idea is that a character is engaged in some particular kind of action at any given time. The actions available will depend on the type of gameplay but typical actions include things like idling, walking, running, jumping, etc. These actions are referred to as states, in the sense that the character is in a “state” where it is walking, idling or whatever. In general, the character will have restrictions on the next state it can go to rather than being able to switch immediately from any state to any other. For example, a running jump can only be taken when the character is already running and not when it is at a standstill, so it should never switch straight from the idle state to the running jump state. The options for the next state that a character can enter from its current state are referred to as state transitions. Taken together, the set of states, the set of transitions and the variable to remember the current state form a state machine.

The states and transitions of a state machine can be represented using a graph diagram, where the nodes represent the states and the arcs (arrows between nodes) represent the transitions."

"Each state has a Motion associated with it that will play whenever the machine is in that state. This enables an animator or designer to define the possible sequences of character actions and animations without being concerned about how the code will work."


Sub-State Machines
"collapse a group of states into a single named item" 
"These collapsed groups of states are called Sub-state machines."
"when you make a transition to a sub-state machine, you have to choose which of its states you want to connect to."

--------------------------------------------------------------------------------

http://www.richardlord.net/blog/finite-state-machines-for-ai-in-actionscript

"implement each state as a separate class. The class will contain all the code necessary for entering, updating and exiting that state and nothing else. This way, the code for each state is separate and the agent code isn’t cluttered"

--------------------------------------------------------------------------------

introduction of the technique of Finite State Machines (FSM) within the context of artificial intelligence (AI) as a control technique
http://ai-depot.com/FiniteStateMachines/

Discusses HSM

---------------------------------------------

http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-01sc-introduction-to-electrical-engineering-and-computer-science-i-spring-2011/unit-1-software-engineering/state-machines/MIT6_01SCS11_chap04.pdf

Primitive State Machines

Defining a machine
Running a machine

Knuth: "We often fail to realize how little we know about a thing until we attempt to simulate it on a computer." TAoCP V1 p295

---------------------------------------------

http://web.mit.edu/6.111/www/f2005/tutprobs/fsms.html

The digital Perfectly Perplexing Padlock. The P3 has two buttons ("0" and "1") that when pressed cause the FSM controlling the lock to advance to a new state. In addition to advancing the FSM, each button press is encoded on the B signal (B=0 for button "0", B=1 for button "1"). The padlock unlocks when the FSM sets the UNLOCK output signal to 1, which it does whenever the last N button presses correspond to the N-digit combination.

State  Event   Next   Unlock
00     b=0     00     0
00     b=1     10     0
01     b=0     11     1
01     b=1     10     0
10     b=0     01     0
10     b=1     10     0
11     b=0     00     0
11     b=1     10     0

The combination for the lock is 100

---------------------------------------------

Goal is to create a highly optimized FSM controller with a way to instantiate the system with a configurable set of states -- a class constructor with a structural object initializer. This fundamental element enables the efficient construction of larger systems.

One method of implementing a finite state machine consists of a control mechanism (function) and a data structure (object) to represent the states and transitions. Perhaps this object can be thought of as the declarative rules.

The FSM constructor would take one parameter (an object) that serves to define states and transitions. The mechanism then follows the rules set forth to govern state changes and actions.



Third-party FSM stand-alone libraries in JavaScript.
In GitHub, a search for "finite state machine" yeilds 163 JS repositories.
Most starred are jakesgordon, machina, stately, state


66.7 Kb  (14K min)
https://github.com/steelbreeze/state.js
Hierarchical finite state machine for node and web browsers


47.8 Kb (13.6K min)
https://github.com/intersel/iFSM
a jQuery State Machine (FSM / HSM) to design and manage web user interfaces, simulators, games


32.9 Kb  (9.4K min)
https://github.com/creynders/jsfsa
Finite State Automaton (or finite-state machine) [full-featured HSM]


18 Kb
https://github.com/ifandelse/machina.js      
Machina.js is a framework for highly customizable finite state machines (FSMs)


13 Kb
https://github.com/cassiozen/State-Machine
Hierarchical Finite State Machine
Lacks the ability to define multiple transitions per state.


11.8 Kb min
https://github.com/leeluolee/stateman
Tiny foundation provides nested state-based routing for complex web applications


11.1 Kb (4 Kb min)
https://github.com/SimpleStateManager/SimpleStateManager
A responsive state manager  (UI state memory)


9.75 Kb
https://github.com/jakesgordon/javascript-state-machine
A finite state machine micro framework


8.59 Kb
https://github.com/fschaefer/Stately.js
A finite-state machine (FSM) engine for Node.js and the browser.


7 Kb
https://github.com/itkoren/machineto
Minimal (neto) implementation of a finite state machine


4.5 Kb
https://github.com/greim/smallfsm
A small finite-state-machine implementation in JavaScript


4.4 Kb (826 gcc)
https://github.com/dreasgrech/statemanager-js
A state manager in JavaScript  (more of a state "memory" mechanism)


3.8 Kb
https://github.com/RGBboy/machinist
Simple State Machines


3.1 Kb
https://github.com/foca/stateful.js
Minimalistic implementation of the State pattern


2.4 Kb (1367 gcc)
https://github.com/GetmeUK/FSM
A minimal finite state machine (FSM) for Javascript


2.2 Kb (900 gcc)
https://github.com/eugeniop/simplestatemachine
A very simple state machine for Node


2.2 Kb (627 gcc)
https://github.com/drhayes/impactjs-statemachine
A state machine implementation for ImpactJS


1.65 Kb (652 gcc)
https://github.com/skipme/torpedoBot
simple telegram battleship game bot


<1 Kb
https://github.com/Oobert/LittleStateMachine
A small finite state machine.


////////////////////////////////////////////////////////////////////////////////

Also of note in Objective-C:
https://github.com/wess/Shift

*/


//The little state machine  https://github.com/Oobert/LittleStateMachine
var fsm = function (states) {
    this.current;
    this.states = states;
};

fsm.prototype.changeStateTo = function (newState, obj) {
    if (this.current &&
        this.current.unload) {
        this.current.unload();
    }
    if (this.states[newState]) {
        this.current = this.states[newState];
        if (this.current.load) {
            this.current.load(obj);
        }
    }
}
fsm.prototype.callAction = function (action, obj) {
    if (this.current[action])
        this.current[action](obj);
}

////////////////////////////////////////////////////////////////////////////////

var fsm= function (states) {
    this.current;
    this.states= states;
    this.changeStateTo= function (newState, obj) {
        if (this.current &&
            this.current.unload) {
            this.current.unload();
        }
        if (this.states[newState]) {
            this.current= this.states[newState];
            if (this.current.load) {
                this.current.load(obj);
            }
        }
    }
    this.callAction= function (action, obj) {
        if (this.current[action])
            this.current[action](obj);
    }
};




//example of usage
var myFsm = new fsm({
    state1:{
        StateRelatedObject: {
            text: "hello"
        },
        load: function ()
        {
            console.log(this);
            //do work like load template or show/hide page elements
        },
        StateRelatedFunction: function(data)
        {
            //do specific work related to this state.
            //can access objects or methods on current state like...
            this.StateRelatedObject.text = data;
        },
        unload: function()
        {
            //clean up after yourself here.
        }
    },
    state2:{
        load: function () {  console.log(this); },
        StateRelatedFunctionOrObjects: function() { },
        unload: function(){ }
    }
})

//Example of how to change to a state
myFsm.changeStateTo("state1");

//Example of how to call an action
myFsm.callAction("StateRelatedFunction", "hello world");
console.log(myFsm.current.StateRelatedObject.text);

//Methods can be called directly for automated testing
myFsm.states.state1.load();


//////////////////////////////////////////////////////////////


// The above FSM might be refactored and simplified by removing the load and unload feature as follows:
var fsm= function (states) {
    this.current;
    this.states= states;
    this.changeStateTo= function (newState) {
        if (this.states[newState]) 
            this.current= this.states[newState];
        }
    this.callAction= function (action, obj) {
        if (this.current[action])
            this.current[action](obj);
    }
};

// the definition of states can be simplified also:

var myFsm = new fsm({
    state1:{
        StateRelatedObject: {text: "hello"},
        StateRelatedFunction: function(data) {
            this.StateRelatedObject.text = data;
        }
    },
    state2:{
        StateRelatedFunctionOrObjects: function() { }
    }
});

// but there remains some awkwardness in the method to transition to a new state since invocation remains the same as earlier.
myFsm.changeStateTo("state1");
myFsm.callAction("StateRelatedFunction", "hello world");
console.log(myFsm.current.StateRelatedObject.text);

// NOTE: myFsm.current is a nameless object, so it's a bit hard to tell what state is current
// access to the state objects is global



var myFsm = new fsm({
    red:{},
    green:{},
    yellow:{}
});
myFsm.changeStateTo("red");     // no specification or enforcement of transition order
myFsm.changeStateTo("yellow");
myFsm.changeStateTo("green");

//Not worth attempting to modify or adapt, but it helps to clarify requirements



// FSM Requirements: 
// a simple definition of state -> event -> new state
// an enforcement of state transition
// an implied initial state
// a simple method to retrieve the current state name
// a method call by event name for transitions
// a closure on the internal variables


////////////////////////////////////////////////////////////////////////////////
// Another "minimal" implementation in JavaScript

/*! FSM v0.1.0 by Getme Limited <code@getme.co.uk> (https://bitbucket.org/getmeuk/fsm) */

(function() {
  window.FSM = {};

  FSM.Machine = (function() {
    function Machine(context) {
      this.context = context;
      this._stateTransitions = {};
      this._stateTransitionsAny = {};
      this._defaultTransition = null;
      this._initialState = null;
      this._currentState = null;
    }

    Machine.prototype.addTransition = function(action, state, nextState, callback) {
      if (!nextState) {
        nextState = state;
      }
      return this._stateTransitions[[action, state]] = [nextState, callback];
    };

    Machine.prototype.addTransitions = function(actions, state, nextState, callback) {
      var action, _i, _len, _results;
      if (!nextState) {
        nextState = state;
      }
      _results = [];
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        action = actions[_i];
        _results.push(this.addTransition(action, state, nextState, callback));
      }
      return _results;
    };

    Machine.prototype.addTransitionAny = function(state, nextState, callback) {
      if (!nextState) {
        nextState = state;
      }
      return this._stateTransitionsAny[state] = [nextState, callback];
    };

    Machine.prototype.setDefaultTransition = function(state, callback) {
      return this._defaultTransition = [state, callback];
    };

    Machine.prototype.getTransition = function(action, state) {
      if (this._stateTransitions[[action, state]]) {
        return this._stateTransitions[[action, state]];
      } else if (this._stateTransitionsAny[state]) {
        return this._stateTransitionsAny[state];
      } else if (this._defaultTransition) {
        return this._defaultTransition;
      }
      throw new Error("Transition is undefined: (" + action + ", " + state + ")");
    };

    Machine.prototype.getCurrentState = function() {
      return this._currentState;
    };

    Machine.prototype.setInitialState = function(state) {
      this._initialState = state;
      if (!this._currentState) {
        return this.reset();
      }
    };

    Machine.prototype.reset = function() {
      return this._currentState = this._initialState;
    };

    Machine.prototype.process = function(action) {
      var result;
      result = this.getTransition(action, this._currentState);
      if (result[1]) {
        result[1].call(this.context || (this.context = this), action);
      }
      return this._currentState = result[0];
    };

    return Machine;

  })();

}).call(this);



// Build a finite state machine for our pet dragon Burt
var burt = new fsm.Machine();

// By default any action will enrage Burt
burt.setDefaultTransition('enraged');

// If Burt is sleeping then any action will wake him (he's always
// grumpy when he wakes up).
burt.addTransitionAny('sleeping', 'grumpy');

// Various things will sooth Burt when he's grumpy
burt.addTransition('stroke', 'grumpy', 'content');
burt.addTransition('feed', 'grumpy', 'content');

// The only way to get Burt back to sleep is by singing to him
burt.addTransition('sing-to', 'content', 'sleeping');

// Burt is sleeping right now
burt.setInitialState('sleeping');



// Now let's interact with Burt: ////////////////////////////////////////////
// Wake him up (he'll be grumpy)
burt.process('call'); // sleeping -> grumpy

// Stroke him to stop him being grumpy
burt.process('stroke'); // grumpy -> content

// Sing to him to put him back to sleep
burt.process('sing-to'); // content - > sleeping

// Let's make Burt mad
burt.process('prod'); // sleeping -> grumpy
burt.process('kick'); // grumpy -> enraged

// The only way to calm him down now is to reset him
burt.reset(); // enraged -> sleeping

//Callbacks for transitions
//You can provide a callback function whenever you add a transition or set the default transition for the machine, for example:

// Growl when Burt wakes up
burt.addTransitionAny('sleeping', 'grumpy', function () {
    var growl = new Audio('growl.mp3');
    growl.play();
});

//If you want your callbacks to be called against another object you can specify the context when creating the machine, for example:
var burt = new fsm.Machine(otherObject);



// Learnings:

var o={}; o[["trigger","red"]]= "green";

//produces the object: {trigger,red: "green"}
//two ways to access:
o["trigger,red"]      //> "green"
o[["trigger","red"]]  //> "green"


var states={
  "red,trigger": "green"
}
states[["red","trigger"]] //> "green"

var cs='red',event='trigger';
states[[cs,event]] //> "green"
// conclusion: useful if dealing primarily in strings

var states={
  cs,event
}
//produces: {cs: "red", event: "trigger"}


////////////////////////////////////////////////////////////////////////////////
// Version 1

// Initial stab
function Fsm(mach) {
    var kur= Object.keys(mach)[0]; // get first 
    this.get= function(){return kur;} // return state
}
var s={ 'S1': {},
        'S2': {} },
    f = new Fsm(s);
f.get();
//-> "S1"

// inspecting 'f' reveals closure is created on 'kur' variable.


////////////////////////////////////////////////////////////////////////////////
// Version 2

// add another variable to hold current state obj, add stubbed trig function
function Fsm(mach) {
    var kur= Object.keys(mach)[0]; // get first 
    function trig(){mach} // hold 'mach' in closure
    this.get= function(){return kur;} // return state
}
var s={ 'S1': {r: 'S2'},
        'S2': {r: 'S1'} },
    f = new Fsm(s);
f.get();
//-> "S1"

// inspecting 'f' reveals closure is created on 'kur' and 'mach' variables.



////////////////////////////////////////////////////////////////////////////////
// Version 3

// Now traverse the object into each transition
function Fsm(mach) {
    function trig(){mach} // hold 'mach' in closure
    var q,g,kur= Object.keys(mach)[0];
    for (g in mach) // for each state in the machine
        for (q in mach[g]) // for each transition property within the state
            this[q]= function(){/* how to reference q? */};  // create a method on this Fsm object
    this.get= function(){return kur;} // return state
}

var s={ 'S1': {r: 'S2'},
        'S2': {r: 'S1',
               q: 'S2'} },  // <--- extra transition
    f = new Fsm(s);
f.get();
//-> "S1"

// inspecting 'f' reveals empty 'q' and 'r' methods have been created.



////////////////////////////////////////////////////////////////////////////////
// Version 4

// bind() to 'this' and pass in the current transition property, otherwise it only references the last value of 'q'
function Fsm(mach) {
    function trig(){mach} // hold 'mach' in closure
    var q,g,kur= Object.keys(mach)[0];
    for (g in mach) // for each state in the machine
        for (q in mach[g]) // for each transition property within the state
            this[q]= function(x){
              console.log(this,x) // <-- test for context
            }.bind(this,q);  // create a method on this Fsm object
    this.get= function(){return kur;} // return state
}

var s={ 'S1': {z: 'S2'},
        'S2': {z: 'S1',
               y: 'S2'} },  // <--- extra transition
    f = new Fsm(s);
f.get();
//-> "S1"

f.z();
//> Fsm {} ->   get: ()y: ()z: ()__proto__: Fsm 
//> "z"

f.y();
//> Fsm {} 
//> "y"



////////////////////////////////////////////////////////////////////////////////
// Version 5


// A variant, bringing the trig function to the top
function Fsm(mach) {
    function trig(x){mach;return function(){}} // empty method
    var q,g,kur= Object.keys(mach)[0];
    for (g in mach) // for all states in machine
        for (q in mach[g]) // for all transitions
            this[q]= trig(q);  // create a this.trans as a function
    this.get= function(){return kur;} // return state
}

var s={ 'S1': {r: 'S2'},
        'S2': {r: 'S1',
               q: 'S2'} },  // <--- extra transition
    f = new Fsm(s);
f.get();
//-> "S1"



////////////////////////////////////////////////////////////////////////////////
// Version 6


// Next, add string transitions
function Fsm(mach) {
    function trig(x){
        return function(b){
            b= d[x],d= mach[b],kur= b;}}
    var q,g,kur= Object.keys(mach)[0],d= mach[kur];
    for (g in mach) // for all states in machine
        for (q in mach[g]) // for all transitions
            this[q]= trig(q);  // create a this.trans as a function
    this.get= function(){return kur;} // return state
}

var s={ 'S1': {r: 'S2'},
        'S2': {r: 'S1',
               q: 'S2'} },  // <--- extra transition
    f = new Fsm(s);
f.get();
//-> "S1"
f.r();
f.get();
//-> "S2"   Liftoff! Successful transition
f.q();
f.get();
//-> "S2"   correct
f.r();
f.get();
//-> "S1"   correct


////////////////////////////////////////////////////////////////////////////////
// Version 7


// inline function creation
function Fsm(mach) {
    var q,g,kur= Object.keys(mach)[0],d= mach[kur];
    for (g in mach) // for all states in machine
        for (q in mach[g]) // for all transitions
            this[q]= function(x,b){ // create a method
                b= d[x],d= mach[b],kur= b;
            }.bind(this,q);  // and bind value of 'q'
    this.get= function(){return kur;} // return state
}


////////////////////////////////////////////////////////////////////////////////
// Version 8


// inline version
function FSM(m) {
    var q,g,k= Object.keys(m)[0],   // 'k' is initial state key
        d=m[k];                     // 'd' is init state object
    this.get= function(){return k;} // return state
    for (g in m)                    // for all states in machine 'm'
        for (q in m[g])             // for all transitions
            this[q]= function(c,b){
                if (c in d) {
                    if ("function" == typeof d[c]) // if a function, act
                        b= d[c].apply(d, [].slice.call(arguments,1)) //decurry
                    else b= d[c];               // otherwise assume string
                    if (b in m) d = m[b],k = b; // go to new state if valid
                    return this
                } 
            }.bind(this,q);         // curry
}
// Analysis:
// without the decurry, the arguments are incorrect (off by one)
// without decurry... gcc: 240, min: 246  /  with decurry gcc: 257




////////////////////////////////////////////////////////////////////////////////
// Version 9


// trial optimization gcc:251
function FSM(m) {
    var q,g,k= Object.keys(m)[0],d=m[k]; // 'k' is initial state key, 'd' is init state object
    this.get= function(){return k;} // return state
    function f(c){ 
        return function(b){
            if (c in d) {
                b= "function"!=typeof d[c]?d[c]:d[c].apply(d, arguments);
                if (b in m) d = m[b],k = b; // go to new state if valid
                return this
            } 
        }
    }
    for (g in m) // for all states in machine 'm'
        for (q in m[g]) // for all transitions
            this[q]= f(q);  // create a this.trans as a function
}



////////////////////////////////////////////////////////////////////////////////
// Version 10

// trial optimization gcc:251
function FSM(m) {
    var q,g,k= Object.keys(m)[0],d=m[k]; // 'k' is initial state key, 'd' is init state object
    this.get= function(){return k;} // return state
    function f(c){ 
        return function(b,x){
            if (c in d) {
                x=d[c];b= "function"!=typeof x?x:x.apply(d, arguments);
                if (b in m) d = m[b],k = b; // go to new state if valid
                return this
            } 
        }
    }
    for (g in m) // for all states in machine 'm'
        for (q in m[g]) // for all transitions
            this[q]= f(q);  // create a this.trans as a function
}



////////////////////////////////////////////////////////////////////////////////
// Version 11

// Release Candidate 1  gcc:251  min:257
function FSM(m) {
    var q,g,k= Object.keys(m)[0],d=m[k]; // 'k' is initial state key, 'd' is init state object
    this.get= function(){return k;} // return state
    function f(c){ 
        return function(b){
            if (c in d) {
                if ("function" == typeof d[c]) // if transition function, take action
                    b= d[c].apply(d, arguments)
                else b= d[c]; // assume string
                if (b in m) d = m[b],k = b; // go to new state if valid
                return this
            } 
        }
    }
    for (g in m) // for all states in machine 'm'
        for (q in m[g]) // for all transitions
            this[q]= f(q);  // create a this.trans as a function
}

//(tested on platforms: Chrome,Firefox,Safari,Opera,IE11,UC,Maxthon)

// 257 bytes uglified
function FSM(n){function t(t){return function(i){return t in o?(i="function"==typeof o[t]?o[t].apply(o,arguments):o[t],i in n&&(o=n[i],r=i),this):void 0}}var q,i,r=Object.keys(n)[0],o=n[r];this.get=function(){return r};for(i in n)for(q in n[i])this[q]=t(q)}

// 251 closured
function FSM(c){function u(h){return function(k){if(h in e)return k="function"==typeof e[h]?e[h].apply(e,arguments):e[h],k in c&&(e=c[k],n=k),this}}var p,t,n=Object.keys(c)[0],e=c[n];this.get=function(){return n};for(t in c)for(p in c[t])this[p]=u(p)}






////////////////////////////////////////////////////////////////////////////////
// Version 12



// convert get() method to this.$
function FSM(m) {
    this.$= Object.keys(m)[0];      // 'k' is the state key
    var q,g,d=m[this.$];                 // 'd' is the state object
    function f(c){ 
        return function(b){
            if (c in d) {
                if ("function" == typeof d[c]) // if transition function, take action
                    b= d[c].apply(d, arguments)
                else b= d[c]; // assume string
                if (b in m) d = m[b],this.$ = b; // go to new state if valid
                return this
            } 
        }
    }
    for (g in m) // for all states in machine 'm'
        for (q in m[g]) // for all transitions
            this[q]= f(q);  // create a this.trans as a function
}

// gcc:236
function FSM(c){function t(h){return function(k){if(h in e)return k="function"==typeof e[h]?e[h].apply(e,arguments):e[h],k in c&&(e=c[k],this.k=k),this}}this.k=Object.keys(c)[0];var n,r,e=c[this.k];for(r in c)for(n in c[r])this[n]=t(n)}







////////////////////////////////////////////////////////////////////////////////
// Version 13
// move initial assignment of this.$ into m array
// Release Candidate 2  gcc:229  min:235
//
function FSM(m) {
    // '$' is the state key and 'd' is the state object
    var q,g,d= m[this.$= Object.keys(m)[0]];
    function f(c){ 
        return function(b){
            if (c in d) {
                if ("function" == typeof d[c]) // if transition function, take action
                    b= d[c].apply(d, arguments)
                else b= d[c]; // assume string
                if (b in m) d = m[b],this.$ = b; // go to new state if valid
                return this
            } 
        }
    }
    for (g in m) // for all states in machine 'm'
        for (q in m[g]) // for all transitions
            this[q]= f(q);  // create a this.trans as a function
}

// gcc:229
function FSM(c){function t(h){return function(k){if(h in e)return k="function"==typeof e[h]?e[h].apply(e,arguments):e[h],k in c&&(e=c[k],this.$=k),this}}var n,r,e=c[this.$=Object.keys(c)[0]];for(r in c)for(n in c[r])this[n]=t(n)}

// uglified: 235
function FSM(n){function i(i){return function(t){return i in r?(t="function"==typeof r[i]?r[i].apply(r,arguments):r[i],t in n&&(r=n[t],this.$=t),this):void 0}}var t,o,r=n[this.$=Object.keys(n)[0]];for(o in n)for(t in n[o])this[t]=i(t)}







////////////////////////////////////////////////////////////////////////////////
// Version 14
// drop the non-essential chaining feature
// Release Candidate 3  gcc:217  min:217
function FSM(m) {
    // '$' is the state key and 'd' is the state object
    var q,g,d= m[this.$= Object.keys(m)[0]];
    function f(c){ 
        return function(b){
            if (c in d) {
                if ("function" == typeof d[c]) // if transition function, take action
                    b= d[c].apply(d, arguments)
                else b= d[c]; // assume string
                if (b in m) d = m[b],this.$ = b; // go to new state if valid
            } 
        }
    }
    for (g in m) // for all states in machine 'm'
        for (q in m[g]) // for all transitions
            this[q]= f(q);  // create a this.trans as a function
}

// gcc:217
function FSM(d){function q(g){return function(h){g in e&&(h="function"==typeof e[g]?e[g].apply(e,arguments):e[g],h in d&&(e=d[h],this.$=h))}}var m,n,e=d[this.$=Object.keys(d)[0]];for(n in d)for(m in d[n])this[m]=q(m)}

// uglify:217
function FSM(n){function i(i){return function(t){i in o&&(t="function"==typeof o[i]?o[i].apply(o,arguments):o[i],t in n&&(o=n[t],this.$=t))}}var t,f,o=n[this.$=Object.keys(n)[0]];for(f in n)for(t in n[f])this[t]=i(t)}





////////////////////////////////////////////////////////////////////////////////
// Version 15
// Remove initial state assignment; only assign this.$ on state change
// RC4  gcc:210  min:210
function FSM(m){
    var q,g,d= m[Object.keys(m)[0]]; // 'd' is the state object
    function f(c){
        return function(b){
            if (c in d){
                if ("function" == typeof d[c]) // if transition function, take action
                    b= d[c].apply(d, arguments)
                else b= d[c]; // assume string
                if (b in m) d = m[b],this.$=b; // go to new state if valid
            }
        }
    }
    for (g in m) // for all states in machine 'm'
        for (q in m[g]) // for all transitions
            this[q]= f(q);  // create a this.trans as a function
}

// gcc:210
function FSM(c){function p(g){return function(h){g in e&&(h="function"==typeof e[g]?e[g].apply(e,arguments):e[g],h in c&&(e=c[h],this.$=h))}}var l,m,e=c[Object.keys(c)[0]];for(m in c)for(l in c[m])this[l]=p(l)}
// ug:210
function FSM(n){function i(i){return function(t){i in o&&(t="function"==typeof o[i]?o[i].apply(o,arguments):o[i],t in n&&(o=n[t],this.$=t))}}var t,f,o=n[Object.keys(n)[0]];for(f in n)for(t in n[f])this[t]=i(t)}



// Verity installations. Moved here:
/*
// a micro Finite State Machine constructor (minifies to 257 bytes)
// this version has a .get() method
function FSM(m) {
    var q,g,k= Object.keys(m)[0],d= m[k];
    this.get= function(){return k;}
    function f(c){
        return function(b){
            if (c in d) {
                if ("function" == typeof d[c]) b= d[c].apply(d, arguments)
                else b= d[c];
                if (b in m) d= m[b],k= b;
                return this
            } 
        }
    }
    for (g in m)
        for (q in m[g])
            this[q]= f(q);
}

//a micro Finite State Machine constructor (minifies to 217 bytes)
// this version drops the .get() and uses an initialized .$
function FSM(m) {
    // '$' is the state key and 'd' is the state object
    var q,g,d= m[this.$= Object.keys(m)[0]];
    function f(c){ 
        return function(b){
            if (c in d) {
                if ("function" == typeof d[c]) // if transition function, take action
                    b= d[c].apply(d, arguments)
                else b= d[c]; // assume string
                if (b in m) d = m[b],this.$ = b; // go to new state if valid
            } 
        }
    }
    for (g in m) // for all states in machine 'm'
        for (q in m[g]) // for all transitions
            this[q]= f(q);  // create a this.trans as a function
}
//a micro Finite State Machine constructor (minifies to 210 bytes)
// this version does not initialize this.$ until state change
function FSM(m){
    var q,g,d= m[Object.keys(m)[0]]; // 'd' is the state object
    function f(c){
        return function(b){
            if (c in d){
                if ("function" == typeof d[c]) // if transition function, take action
                    b= d[c].apply(d, arguments)
                else b= d[c]; // assume string
                if (b in m) d = m[b],this.$=b; // go to new state if valid
            }
        }
    }
    for (g in m) // for all states in machine 'm'
        for (q in m[g]) // for all transitions
            this[q]= f(q);  // create a this.trans as a function
} 

    // a micro Finite State Machine constructor (minifies to 168 bytes)
    // version 18:
    function FSM(d){
      var l,m,f=d[Object.keys(d)[0]];
      for(m in d)for(l in d[m])this[l]=function(g,h){
        g in f&&(h=f[g].call?f[g]():f[g],h in d&&(f=d[h],this.$=h))
        }.bind(this,l)
    }
    
    // a micro Finite State Machine constructor (minifies to 123 bytes)
    // version 37:
    function FSM(m){ 
      var s= this; s.$= Object.keys(m)[0];
      s.get= m[s.$];
      s.trn= function(x){
        if (x in m[s.$])
          s.$= m[s.$][x], s.get= m[s.$];
      }
    }
*/


////////////////////////////////////////////////////////////////////////////////
// Version 16
// Don't pass arguments to transition functions
// RC5 gcc: 193
function FSM(m){
    var q,g,d= m[Object.keys(m)[0]]; // 'd' is the state object
    function f(c){
        return function(b){
            if (c in d){
                if ("function" == typeof d[c]) // if transition function, take action
                    b= d[c]()
                else b= d[c]; // assume string
                if (b in m) d = m[b],this.$=b; // go to new state if valid
            }
        }
    }
    for (g in m) // for all states in machine 'm'
        for (q in m[g]) // for all transitions
            this[q]= f(q);  // create a this.trans as a function
}

// gcc:193
function FSM(d){function p(g){return function(h){g in f&&(h="function"==typeof f[g]?f[g]():f[g],h in d&&(f=d[h],this.$=h))}}var l,m,f=d[Object.keys(d)[0]];for(m in d)for(l in d[m])this[l]=p(l)}






////////////////////////////////////////////////////////////////////////////////
// Version 17
// inline method
function FSM(d){var l,m,f=d[Object.keys(d)[0]];for(m in d)for(l in d[m])this[l]=function(g,h){g in f&&(h="function"==typeof f[g]?f[g]():f[g],h in d&&(f=d[h],this.$=h))}.bind(this,l)} // 182
//            if ("function" == typeof d[c])  // if transition function




////////////////////////////////////////////////////////////////////////////////
// Version 18
// inline method build and reduce test for function
// RC6 gcc:168

function FSM(m){
    var e,s,d= m[Object.keys(m)[0]];        // 'd' is the state object
    for (s in m)                            // for all states in machine 'm'
      for (e in m[s])                       // for all events
        this[e]= function(c,b){             // create a method:
          if (c in d) {
            if (d[c].call)                  // if transition is a function
              b= d[c]()                     // take action
            else b= d[c];                   // otherwise assume string
            if (b in m) d = m[b],this.$= b; // go to new state if valid
          }
        }.bind(this,e);
}

function FSM(d){var l,m,f=d[Object.keys(d)[0]];for(m in d)for(l in d[m])this[l]=function(g,h){g in f&&(h=f[g].call?f[g]():f[g],h in d&&(f=d[h],this.$=h))}.bind(this,l)} // 168!


















////////////////////////////////////////////////////////////////////////////////
// Testing routine

// create an empty object with some alloc/dealloc methods
var m={data: [],
    dealloc: function(){console.log("deallocating");this.data=null;},
    alloc: function(n){console.log("allocating");this.data=Array.apply(null,{length:n});},
    common: []
    }

// alloc 100K elements in the data object
m.alloc(1e5);
m.data[99999]= true;
console.assert(m.data[99999]==true);

// Define pre- and post-state actions
    var z= new FSM({
        red:    {flip: function() {
                        m.dealloc();  /* <-- post state-change function call */
                        m.alloc(1e5); /* <-- pre state-change function call */
                        return 'green';  /* required: return*/
                    },
                action1: function(){console.log("red action1");},
                action2: function(){console.log("red action2");}
                },
        green:  {flip: function() { m.dealloc();m.alloc(1e5);return 'orange'},
                // correctly defined state transitions
                good1: function(){return 'red';},
                good2: function(p1,p2,p3){
                    m.common=[].slice.call(arguments);
                    return 'red';
                },
                // 'bad' actions do not change the state:
                bad1: 'oops', // undef state test
                bad2: true, // not a string or a function
                bad3: function(){return true;}, // a boolean return is harmless
                bad4: function(){return 'purple';} // another undef state
                },
        orange: {flip: function() { m.dealloc();m.alloc(1e5);return 'blue'  }},
        blue:   {flip: function() { m.dealloc();m.alloc(1e5);return 'red'   },
                action1: function(){console.log("blue action1");},
                action2: function(){console.log("blue action2");}}
    });

// Now, transitions from one state to another, dealloc and alloc
// which essentially cleans up after each state.
var msg= "Incorrect state encountered";
console.assert(z.$=='red',msg);
z.flip(); // to green
console.assert(m.data[99999]!=true,"realloc failed");

// Tests for good state transitions
z.good1(); // to red
console.assert(z.$=='red',msg);
z.flip(); // to green
z.good2('arg1','arg2','arg3'); // to red
console.assert(m.common.length==3,'array length mismatch');
console.assert(z.$=='red',msg);
z.flip(); // to green

// Tests for mal-formed state transitions
z.bad1();
console.assert(z.$=='green',msg);
z.bad2();
console.assert(z.$=='green',msg);
z.bad3();
console.assert(z.$=='green',msg);
z.bad4();

// Tests for normal state transitions
console.assert(z.$=='green',msg);
z.flip();
console.assert(z.$=='orange',msg);
z.flip();
console.assert(z.$=='blue',msg);

// Tests for actions related to a state, but no state change
z.action1();
z.action2();
console.assert(z.$=='blue',msg);
z.flip();
console.assert(z.$=='red',msg);

// Tests for chaining (deprecated)
//var myState=z.action1().action2().flip().get();
//console.assert(myState=='green',msg);


////////////////////////////////////////////////////////////////////////////////
var msg= "Incorrect state encountered";
console.assert(z.k=='red',msg);
z.flip(); // to green
console.assert(m.data[99999]!=true,"realloc failed");

// Tests for good state transitions
z.good1(); // to red
console.assert(z.k=='red',msg);
z.flip(); // to green
z.good2('arg1','arg2','arg3'); // to red
console.assert(m.common.length==3,'array length mismatch');
console.assert(z.k=='red',msg);
z.flip(); // to green

// Tests for mal-formed state transitions
z.bad1();
console.assert(z.k=='green',msg);
z.bad2();
console.assert(z.k=='green',msg);
z.bad3();
console.assert(z.k=='green',msg);
z.bad4();

// Tests for normal state transitions
console.assert(z.k=='green',msg);
z.flip();
console.assert(z.k=='orange',msg);
z.flip();
console.assert(z.k=='blue',msg);

// Tests for actions related to a state, but no state change
z.action1();
z.action2();
console.assert(z.k=='blue',msg);
z.flip();
console.assert(z.k=='red',msg);

// Tests for chaining
var myState=z.action1().action2().flip().k;
console.assert(myState=='green',msg);




////////////////////////////////////////////////////////////////////////////////
var f = new FSM({
    'S1': {
        '0': 'S2',
        '1': 'S1'
    },
    'S2': {
        '0': 'S1',
        '1': 'S2'
    }
});

// first test to see if initial state is correct
console.assert(f.$=='S1','expected S1');

// move to state S2
f[0]();
console.assert(f.$=='S2','expected S2');

// move to state S1
f[0]();
console.assert(f.$=='S1','expected S1');



var trafLight4= new FSM({
    red:    {chng: 'green' },
    green:  {chng: 'yellow'},
    yellow: {chng: function() { console.log('Going to red state');return 'red'} }
});

// The following transitions the state from 'red' to 'green' to 'yellow' and finally to 'red' with a parameter.
trafLight4.chng();
trafLight4.chng();
trafLight4.chng();
trafLight4.$=='red'





// Analysis of StateMachine.js from Canvace.js, optimize, reduce, refactor.
/**
 * @constructor
 *
function StateMachine(states) { // define class
	var currentState, currentStateName,
		actions = (function () {
		var set = {};
		for (var stateName in states) {
			if (states.hasOwnProperty(stateName)) {
				for (var action in states[stateName]) {
					if (states[stateName].hasOwnProperty(action)) {
						set[action] = true;
					}
				}
				if (!currentState) {
                    currentState = states[stateName]; // set the initial state from first item
					currentStateName = stateName;
                }				
			}
		}
		return set;
	}());
	function setState(name) {
		if (!(name in states)) {
			throw 'invalid state "' + name + '"';
		}
		currentState = states[name];
		currentStateName = name;
	}
	(function (thisObject) {
		var makeState = function (action) {
			return function () {
				if (action in currentState) {
					if (typeof currentState[action] === 'string') {
						var newStateName = currentState[action];
						setState(newStateName);
						return thisObject;
					} else if (typeof currentState[action] === 'function') {
						var result = currentState[action].apply(currentState, arguments);
						if (typeof result === 'string')
							setState(result);
						return thisObject;
					} else {
						throw 'invalid transition "' + action + '" for state "' + currentStateName + '"';
					}
				} else {
					return thisObject;
				}
			};
		};
		for (var action in actions) {
			if (actions.hasOwnProperty(action)) {
				thisObject[action] = makeState(action);
			}
		}
	}(this));
 	this.getState = function () {
		return currentStateName;
	};
};
// calls need for closure comiler:
calls go here


// closure compiled - advanced w/ tweaks (rename fsm and getState):
function fsm(a){function h(c){if(!(c in a))throw'bad state:'+c;e=a[c];g=c}var e,g,k=function(){var c={},b;for(b in a)if(a.hasOwnProperty(b)){for(var f in a[b])a[b].hasOwnProperty(f)&&(c[f]=!0);e||(e=a[b],g=b)}return c}();(function(c){function a(b){return function(){if(b in e){if("string"===typeof e[b])return h(e[b]),c;if("function"===typeof e[b]){var a=e[b].apply(e,arguments);"string"===typeof a&&h(a);return c}throw g + '->' + b + ' fault';}else throw g + '->' + b + ' not allowed';return c}}for(var f in k)k.hasOwnProperty(f)&&
(c[f]=a(f))})(this);this.getState=function(){return g}}

// uglify
function fsm(t){function n(n){if(!(n in t))throw"bad state:"+n
r=t[n],i=n}var r,i,o=function(){var n,o={}
for(n in t)if(t.hasOwnProperty(n)){for(var f in t[n])t[n].hasOwnProperty(f)&&(o[f]=!0)
r||(r=t[n],i=n)}return o}()
!function(t){function f(o){return function(){if(o in r){if("string"==typeof r[o])return n(r[o]),t
if("function"==typeof r[o]){var f=r[o].apply(r,arguments)
return"string"==typeof f&&n(f),t}throw i+"->"+o+" fault"}throw i+"->"+o+" not allowed"}}for(var e in o)o.hasOwnProperty(e)&&(t[e]=f(e))}(this),this.getState=function(){return i}}


// recompiled with shared fault
function fsm(c){function f(a){if(!(a in c))throw"Bad state:"+a;d=c[a];e=a}var d,e,h=function(){var a,g={};for(a in c)if(c.hasOwnProperty(a)){for(var b in c[a])c[a].hasOwnProperty(b)&&(g[b]=!0);d||(d=c[a],e=a)}return g}();!function(a){function c(b){return function(){if(b in d){if("string"==typeof d[b])return f(d[b]),a;if("function"==typeof d[b]){var c=d[b].apply(d,arguments);return"string"==typeof c&&f(c),a}}throw"Fault:"+e+"->"+b;}}for(var b in h)h.hasOwnProperty(b)&&(a[b]=c(b))}(this);this.getState=function(){return e}}


// beautified:
function fsm(a) {
    function h(c) {
        if (!(c in a)) throw 'bad state:"' + c + '"';
        e= a[c];
        g= c
    }
    var e, g, k= function() {
        var c= {},
            b;
        for (b in a)
            if (a.hasOwnProperty(b)) {
                for (var f in a[b]) a[b].hasOwnProperty(f) && (c[f]= !0);
                e || (e= a[b], g= b)
            }
        return c
    }();
    (function(c) {
        function a(b) {
            return function() {
                if (b in e) {
                    if ("string" === typeof e[b]) return h(e[b]), c;
                    if ("function" === typeof e[b]) {
                        var a= e[b].apply(e, arguments);
                        "string" === typeof a && h(a);
                        return c
                    }
                    throw 'bad transition:"' + b + '" state:"' + g + '"';
                } else throw g + ' -> ' + b + ' not allowed';
                return c
            }
        }
        for (var f in k) k.hasOwnProperty(f) &&
            (c[f]= a(f))
    })(this);
    this.getState= function() {
        return g
    }
}

// beautified after second recompile

function fsm(c) {
    function f(a) {
        if (!(a in c)) throw "Bad state:" + a;
        d = c[a];
        e = a
    }
    var d, e, h = function() {
        var a, g = {};
        for (a in c)
            if (c.hasOwnProperty(a)) {
                for (var b in c[a]) c[a].hasOwnProperty(b) && (g[b] = !0);
                d || (d = c[a], e = a)
            }
        return g
    }();
    ! function(a) {
        function c(b) {
            return function() {
                if (b in d) {
                    if ("string" == typeof d[b]) return f(d[b]), a;
                    if ("function" == typeof d[b]) {
                        var c = d[b].apply(d, arguments);
                        return "string" == typeof c && f(c), a
                    }
                }
                throw "Fault:" + e + "->" + b;
            }
        }
        for (var b in h) h.hasOwnProperty(b) && (a[b] = c(b))
    }(this);
    this.getS=function() {
        return e
    }
}



// test fsm1: functions with parameters
var dx= 0, character= new fsm({
	still: {
		walkLeft: function (s) {
			dx = s; // decrease speed
			waving = true;
			return 'walkingLeft';
		},
		walkRight: function () {
			dx = 0.1;
			waving = true;
			return 'walkingRight';
		}
	},
	walkingLeft: {
		walkRight: function () {
			dx = 0;
			return 'walkingBoth';
		},
		stopLeft: function () {
			dx = 0;
			waving = false;
			return 'still';
		}
	},
	walkingRight: {
		walkLeft: function () {
			dx = 0;
			return 'walkingBoth';
		},
		stopRight: function () {
			dx = 0;
			waving = false;
			return 'still';
		}
	},
	walkingBoth: {
		stopLeft: function () {
			dx = 0.1;
			return 'walkingRight';
		},
		stopRight: function () {
			dx = -0.1;
			return 'walkingLeft';
		}
	}
});

console.log(character.getState());
//character.walkLeft(22);
//console.log(dx); // 22
*/

// test fsm2: conditional state
var door= new fsm({
    OPEN: {
        close:  /* --> */ 'CLOSED'
    },
    CLOSED: {
        open:   /* --> */ 'OPEN',
        lock:   /* --> */ 'LOCKED'
    },
    LOCKED: {
        unlock: /* --> */ 'CLOSED',
        smash:  /* --> */ 'BROKEN'
    },
    BROKEN: {
        fix: function () {
            this.fixed = (this.fixed === undefined ? 1 : ++this.fixed);
            return this.fixed < 3 ?  /* --> */ 'OPEN' : 'BROKEN';
        }
    }
});

// see additional test at: http://jsfiddle.net/intrinsica/vu0cympj/ which uses the turnstyle fsm:
// also, note the use of quotes
var f = new fsm({
    'S1': {
        '0': 'S2',
        '1': 'S1'
    },
    'S2': {
        '0': 'S1',
        '1': 'S2'
    }
});




// rough sketch of DVD control w/ embedded speed
var dvd= new fsm({
	stop: {
		play: function () {
			dvd.speed= 1;
			console.log("stop -> play");
			return 'play';
		},
		forward: function () { // more appropriate for a VCR
			dvd.speed= 30;
			console.log("stop -> forward");
			return 'forward';
		},
		rewind: function () {
			dvd.speed= -30;
			console.log("stop -> rewind");
			return 'rewind';
		}
	},
	play: {
		stop: function () {
			dvd.speed= 0;
			console.log("play -> stop");
			return 'stop';
		},
		pause: function () {
			dvd.speed= 0;
			console.log("play -> pause");
			return 'pause';
		},
		forward: function () {
			dvd.speed= 1.5;
			console.log("play -> playforward");
			return 'forward';
		},
		rewind: function () {
			dvd.speed= -1.5;
			console.log("play -> playbackward");
			return 'rewind';
		}
	},
	pause: {
		play: function () {
			dvd.speed= 1;
			console.log("pause -> play");
			return 'play';
		},
		stop: function () {
			dvd.speed= 0;
			console.log("pause -> stop");
			return 'stop';
		},
		forward: function () {
			dvd.speed= 1.5;
			console.log("pause -> playforward");
			return 'forward';
		},
		rewind: function () {
			speed= -1.5;
			console.log("pause -> playbackward");
			return 'rewind';
		}
	},
	rewind: {
		play: function () {
			dvd.speed= 1;
			console.log("rewind -> play");
			return 'play';
		},
		rewind: function () {
			dvd.speed*= 1.1;
			console.log("rewind faster: "+dvd.speed);
			return 'rewind';
		},
		stop: function () {
			dvd.speed= 0;
			console.log("rewind -> stop");
			return 'stop';
		}
	},
	forward: {
		play: function () {
			dvd.speed= 1;
			console.log("forward -> play");
			return 'play';
		},
		forward: function () {
			dvd.speed*= 1.1;
			console.log("forward faster: "+dvd.speed);
			return 'forward';
		},
		stop: function () {
			dvd.speed= 0;
			console.log("forward -> stop");
			return 'stop';
		}
	}
});dvd.speed= 0;


// rough sketch of Motivara states using functions
var mvsite= new fsm({
	init: {
		port: function () {
			console.log("init -> portfolio");
			return 'port';
		}
	},
	port: {
		port: function (mode) {
			console.log("portfolio -> portfolio ("+mode+")");
			return 'port';
		},
		small: function () {
			console.log("portfolio -> small");
			return 'small';
		},
		services: function () {
			console.log("portfolio -> services");
			return 'services';
		},
		team: function () {
			console.log("portfolio -> team");
			return 'team';
		},
		contact: function () {
			console.log("portfolio -> contact");
			return 'contact';
		}
	},
	small: {
		port: function () {
			console.log("small -> portfolio");
			return 'port';
		},
		large: function () {
			console.log("small -> large");
			return 'large';
		}
	},
	large: {
		port: function () {
			console.log("large -> portfolio");
			return 'port';
		},
		services: function () {
			console.log("large -> services");
			return 'services';
		},
		team: function () {
			console.log("large -> team");
			return 'team';
		},
		contact: function () {
			console.log("large -> contact");
			return 'contact';
		}
	},
	services: {
		port: function () {
			console.log("services -> portfolio");
			return 'port';
		},
		team: function () {
			console.log("services -> team");
			return 'team';
		},
		contact: function () {
			console.log("services -> contact");
			return 'contact';
		}
	},
	team: {
		port: function () {
			console.log("team -> portfolio");
			return 'port';
		},
		services: function () {
			console.log("team -> services");
			return 'services';
		},
		contact: function () {
			console.log("team -> contact");
			return 'contact';
		}
	},
	contact: {
		port: function () {
			console.log("contact -> portfolio");
			return 'port';
		},
		services: function () {
			console.log("contact -> services");
			return 'services';
		},
		team: function () {
			console.log("contact -> team");
			return 'team';
		}
	}
});


// a mnml state spec
var mvsite2= new fsm({
	init: {
		port: 'port'
	},
	port: {
		port: 'port',
		team: 'team',
		small: 'small',
		contact: 'contact',
		services: 'services'
	},
	small: {
		port: 'port',
		large: 'large'
	},
	large: {
		port: 'port',
		team: 'team',
		contact: 'contact',
		services: 'services'
	},
	services: {
		port: 'port',
		team: 'team',
		contact: 'contact'
	},
	team: {
		port: 'port',
		contact: 'contact',
		services: 'services'
	},
	contact: {
		port: 'port',
		team: 'team',
		services: 'services',
		bad1: 'oops', // bad state test (goto contact state first)
		bad2: true // not a string or a function
	}
});



////////////////////////////////////////////////////////////////////////////////
// Version 19



// recompiled without internal IIFE (509 bytes)
function fsm(b){function e(a){if(!(a in b))throw"fault:"+a;c=b[a];f=a}function k(a){return function(){if(a in c){if("string"==typeof c[a])return e(c[a]),this;if("function"==typeof c[a]){var b=c[a].apply(c,arguments);return"string"==typeof b&&e(b),this}}throw"Fault:"+f+"->"+a;}}var c,f,h=function(){var a,d={};for(a in b)if(b.hasOwnProperty(a)){for(var e in b[a])b[a].hasOwnProperty(e)&&(d[e]=!0);c||(c=b[a],f=a)}return d}(),d;for(d in h)h.hasOwnProperty(d)&&(this[d]=k(d));this.getState=function(){return f}}

//jscrush reduces the above to 418 bytes: http://www.iteral.com/jscrush/




////////////////////////////////////////////////////////////////////////////////
// Version 20


// rebeautified
function fsm(b) {
	function e(a) {
		if (!(a in b)) throw "fault:" + a;
		c = b[a];
		f = a
	}
	function k(a) {
		return function() {
			if (a in c) {
				if ("string" == typeof c[a]) return e(c[a]), this;
				if ("function" == typeof c[a]) {
					var b = c[a].apply(c, arguments);
					return "string" == typeof b && e(b), this
				}
			}
			throw "Fault:" + f + "->" + a;
		}
	}
	var c, f, h = function() {
			var a, d = {};
			for (a in b)
				if (b.hasOwnProperty(a)) {
					for (var e in b[a]) b[a].hasOwnProperty(e) && (d[e] = !0);
					c || (c = b[a], f = a)
				}
			return d
		}(),
		d;
	for (d in h) h.hasOwnProperty(d) && (this[d] = k(d));
	this.getState = function() {
		return f
	}
}


////////////////////////////////////////////////////////////////////////////////
// Version 21


// Remove throws: 462 chars
function FSM(n){function r(r){r in n&&(i=n[r],f=r)}function t(n){return function(){if(n in i){if("string"==typeof i[n])return r(i[n]),this;if("function"==typeof i[n]){var t=i[n].apply(i,arguments);return"string"==typeof t&&r(t),this}}}}var i,f,o,e=function(){var r,t={};for(r in n)if(n.hasOwnProperty(r)){for(var o in n[r])n[r].hasOwnProperty(o)&&(t[o]=!0);i||(i=n[r],f=r)}return t}();for(o in e)e.hasOwnProperty(o)&&(this[o]=t(o));this.get=function(){return f}}


////////////////////////////////////////////////////////////////////////////////
// Version 22

// Remove hasOwnProperty: 390 chars
function FSM(n){function t(t){t in n&&(r=n[t],f=t)}function i(n){return function(){if(n in r){if("string"==typeof r[n])return t(r[n]),this;if("function"==typeof r[n]){var i=r[n].apply(r,arguments);return"string"==typeof i&&t(i),this}}}}var r,f,o,u=function(){var t,i={};for(t in n){for(var o in n[t])i[o]=!0;r||(r=n[t],f=t)}return i}();for(o in u)this[o]=i(o);this.get=function(){return f}}




////////////////////////////////////////////////////////////////////////////////
// Version 23


// Closure advanced: 391 bytes, function t (above) unwrapped since called only twice
function fsm(e){function n(c){return function(){if(c in d){if("string"==typeof d[c]){var b=d[c];b in e&&(d=e[b],k=b);return this}if("function"==typeof d[c])return b=d[c].apply(d,arguments),"string"==typeof b&&b in e&&(d=e[b],k=b),this}}}var d,k,g,p=function(){var c,b={};for(c in e){for(var g in e[c])b[g]=!0;d||(d=e[c],k=c)}return b}();for(g in p)this[g]=n(g);this.get=function(){return k}}

// beautified
function fsm(e) {
    function n(c) {
        return function() {
            if (c in d) {
                if ("string" == typeof d[c]) {
                    var b = d[c];
                    b in e && (d = e[b], k = b);
                    return this
                }
                if ("function" == typeof d[c]) return b = d[c].apply(d, arguments),
                "string" == typeof b && b in e && (d = e[b], k = b),
                this
            }
        }
    }
    var d, k, g, p = function() {
        var c, b = {};
        for (c in e) {
            for (var g in e[c]) b[g] = !0;
            d || (d = e[c], k = c)
        }
        return b
    }();
    for (g in p) this[g] = n(g);
    this.get = function() {
        return k
    }
}


////////////////////////////////////////////////////////////////////////////////
// Version 24

// re-closure compiled after removing var b: 387 bytes
function fsm(e){function n(c){return function(b){if(c in d){if("string"==typeof d[c])return b=d[c],b in e&&(d=e[b],k=b),this;if("function"==typeof d[c])return b=d[c].apply(d,arguments),"string"==typeof b&&b in e&&(d=e[b],k=b),this}}}var d,k,g,p=function(){var c,b={};for(c in e){for(var g in e[c])b[g]=!0;d||(d=e[c],k=c)}return b}();for(g in p)this[g]=n(g);this.get=function(){return k}}



////////////////////////////////////////////////////////////////////////////////
// Version 25

// replace "if string" with else

function fsm(e) {
    function n(c) {
        return function(b) {
            if (c in d) {
                if ("function" == typeof d[c]) 
                return b = d[c].apply(d, arguments),"string" == typeof b && b in e && (d = e[b], k = b),this;
                else 
                return b = d[c],b in e && (d = e[b], k = b),this
            }
        }
    }
    var d, k, g, p = function() {
        var c, b = {};
        for (c in e) {
            for (var g in e[c]) b[g] = !0;
            d || (d = e[c], k = c)
        }
        return b
    }();
    for (g in p) this[g] = n(g);
    this.get = function() {
        return k
    }
}

// recompress
function fsm(n){function t(t){return function(f){return t in i?"function"==typeof i[t]?(f=i[t].apply(i,arguments),"string"==typeof f&&f in n&&(i=n[f],r=f),this):(f=i[t],f in n&&(i=n[f],r=f),this):void 0}}var i,r,f,o=function(){var t,f={};for(t in n){for(var o in n[t])f[o]=!0;i||(i=n[t],r=t)}return f}();for(f in o)this[f]=t(f);this.get=function(){return r}}




////////////////////////////////////////////////////////////////////////////////
// Version 26


//tweak
function FSM(d){function t(e){return function(c){if(e in f)return"function"==typeof f[e]?(c=f[e].apply(f,arguments),"string"==typeof c&&c in d&&(f=d[c],m=c),this):(c=f[e],c in d&&(f=d[c],m=c),this)}}var f,m,k,u=function(e){var c={};for(e in d){for(var k in d[e])c[k]=!0;f||(f=d[e],m=e)}return c}();for(k in u)this[k]=t(k);this.get=function(){return m}}


function FSM(d){
    function t(e){
        return function(c){
            if(e in f)return"function"==typeof f[e]?
            (c=f[e].apply(f,arguments),"string"==typeof c&&c in d&&(f=d[c],m=c),this):
            (c=f[e],c in d&&(f=d[c],m=c),this)
        }}
    var f,m,k,u=function(e){var c={};
        for(e in d){
            for(var k in d[e])c[k]=!0;
            f||(f=d[e],m=e)
        }
        return c
    }();
    for(k in u)this[k]=t(k);
    this.get=function(){return m}
}


////////////////////////////////////////////////////////////////////////////////
// Version 27

function FSM(n){function t(t){return function(o){return t in i?"function"==typeof i[t]?(o=i[t].apply(i,arguments),"string"==typeof o&&o in n&&(i=n[o],r=o),this):(o=i[t],o in n&&(i=n[o],r=o),this):void 0}}var i,r,o,f=function(t){var o={};for(t in n){for(var f in n[t])o[f]=!0;i||(i=n[t],r=t)}return o}();for(o in f)this[o]=t(o);this.get=function(){return r}}

// diminishing returns on compression
function FSM(m) {
    function t(e) {
        return function(c) {
            if (e in f) return "function" == typeof f[e] ?
            (c= f[e].apply(f, arguments), "string" == typeof c && c in m && (f= m[c], k = c), this) : 
            (c= f[e], c in m && (f= m[c], k = c), this)
        }}
    var f, k, g, u= function(e) {var c= {};
        for (e in m) {
            for (var g in m[e]) c[g] = !0;
            f || (f= m[e], k= e)
        }
        return c
    }();
    for (g in u) this[g]= t(g);
    this.get= function() {return k}
}



// Trials

// a mini Finite State Machine (reduces to 390 bytes)

/*function FSM(n) {
    function r(r) {r in n && (i= n[r], f = r)}
    function t(n) {
        return function() {
            if (n in i) {
                if ("string" == typeof i[n]) return r(i[n]),this;
                if ("function" == typeof i[n]) {
                    var t = i[n].apply(i, arguments);
                    return "string" == typeof t && r(t),this
                }}}}
    var i, f, o, e= function() {
        var r, t= {};
        for (r in n) {
            for (var o in n[r]) t[o] = !0;
            i || (i = n[r], f= r)
        }
        return t}();
    for (o in e) this[o] = t(o);
    this.get= function() {return f}
}*/

// a micro Finite State Machine mechanism (reduces to 387 bytes)

/*function FSM(m) {
    function n(c) {
        return function(b) {
            if (c in d) {
                if ("string" == typeof d[c]) return b= d[c],b in m && (d= m[b], k= b),this;
                if ("function" == typeof d[c]) return b= d[c].apply(d, arguments),
                "string" == typeof b && b in m && (d= m[b], k= b),this
            }}}
    var d,k,g,p= function() {
        var c, b= {};
        for (c in m) {
            for (var g in m[c]) b[g]= !0;
            d || (d= m[c], k= c)
        }
        return b}();
    for (g in p) this[g]= n(g);
    this.get = function() {return k}
}*/

// a micro Finite State Machine mechanism (compresses to 357 bytes)
/*function FSM(m) {
    function n(c) {
        return function(b) { // return a function that, when called, leads to a next state
            if (c in d) {
                if ("function" == typeof d[c]) return b= d[c].apply(d, arguments),
                      "string" == typeof b && b in m && (d= m[b], k= b),this;
                else return b= d[c],b in m && (d= m[b], k= b),this;
            }};}
    var d,k,g,s= function(b) {var u= {};
        for (b in m) {
            for (var g in m[b]) u[g]= !0;
            d || (d= m[b], k= b); //set k to first state; d to first state object
        }
        return u}(); // return the union of all transitions
    for (g in s) this[g]= n(g); // for all transitions, create a this.trans function
    this.get = function() {return k;};
}*/





    var trafLightVerbose= new FSM({
        red:    {go: function() {
                         this.innerState.go1();
                         console.log(this.innerState.$);
                         return 'green'
                     },
                innerState: new FSM({
                         red1:    {go1: function() {
                           console.log('red1->green1');
                           return 'green1'
                         }
                         },
                         green1:  {go1: 'yellow1'},
                         yellow1: {go1: 'red1'   }
                         })
                },
        green:  {go: 'yellow'},
        yellow: {go: 'red'   }
    });

trafLightVerbose.go()
 red1->green1
green1







////////////////////////////////////////////////////////////////////////////////
// Analysis
// https://github.com/drhayes/impactjs-statemachine

//var unnamedTransitionCounter = 0;

var uTC=0,StateMachine = function() {
    this.states = {};
    this.transitions = {};
    // Track states by name.
    this.initialState = null;
    this.currentState = null;
    this.previousState = null;

    this.state = function(name, definition) {
      if (!definition) {
        return this.states[name];
      }
      this.states[name] = definition;
      if (!this.initialState) {
        this.initialState = name;
      }
    };

    this.transition = function(name, fromState, toState, predicate) {
      if (!fromState && !toState && !predicate) {
        return this.transitions[name];
      }
      // Transitions don't require names.
      if (!predicate) {
        predicate = toState;
        toState = fromState;
        fromState = name;
        name = 'transition-' + uTC++;
      }
      if (!this.states[fromState]) {
        throw new Error('Missing from state: ' + fromState);
      }
      if (!this.states[toState]) {
        throw new Error('Missing to state: ' + toState);
      }
      var transition = {
        name: name,
        fromState: fromState,
        toState: toState,
        predicate: predicate
      };
      this.transitions[name] = transition;
      return transition;
    };

    this.update = function() {
      if (!this.currentState) {
        this.currentState = this.initialState;
      }
      var state = this.state(this.currentState);
      if (this.previousState !== this.currentState) {
        if (state.enter) {
          state.enter();
        }
        this.previousState = this.currentState;
      }
      if (state.update) {
        state.update();
      }
      // Iterate through transitions.
      for (var name in this.transitions) {
        var transition = this.transitions[name];
        if (transition.fromState === this.currentState &&
            transition.predicate()) {
          if (state.exit) {
            state.exit();
          }
          this.currentState = transition.toState;
          return;
        }
      }
    };
  };

var sm = new StateMachine();
//The first state added will be the initialState
//add states:
sm.state('red', {
    update: function() { console.log('red'); }
});
sm.state('green', {
    update: function() { console.log('green'); }
});
sm.state('yellow', {
    update: function() { console.log('yellow'); }
});

var fire= false;
sm.transition('go', 'red', 'green', function() {console.log('red->green');return fire;})
fire=true;
sm.update();
fire=false;


// gcc:627 bytes
var d=0;
function e(){this.b={};this.c={};this.g=this.a=this.f=null;this.state=function(a,b){if(!b)return this.b[a];this.b[a]=b;this.f||(this.f=a)};this.transition=function(a,b,c,g){if(!b&&!c&&!g)return this.c[a];g||(g=c,c=b,b=a,a="transition-"+d++);if(!this.b[b])throw Error("Missing from state: "+b);if(!this.b[c])throw Error("Missing to state: "+c);b={name:a,j:b,m:c,l:g};return this.c[a]=b};this.update=function(){this.a||(this.a=this.f);var a=this.state(this.a);this.g!==this.a&&(a.h&&a.h(),this.g=this.a);
a.update&&a.update();for(var b in this.c){var c=this.c[b];if(c.j===this.a&&c.l()){a.i&&a.i();this.a=c.m;break}}}}






////////////////////////////////////////////////////////////////////////////////
// Version 28


// Next step, what about additional states in the hash scenario?
var toggle={red: "green", green: "yellow", yellow:"red"}, state="red";
state= toggle[state];
//> "green"
state= toggle[state];
//> "yellow"
state= toggle[state];
//> "red"


// This could be considered a primitive state machine. It manifests rules of transition. It moves from state to state. It is limited to sequential states. It can be employed in real-world scenarios of simple state transitions such as a web page that cycles through a set of photographs.




////////////////////////////////////////////////////////////////////////////////
// Version 29

// An alternative is a toggle array. (toggling cameras in Unity)
var toggle=[1,2,0], state=0;
state= toggle[state];
//> 1
state= toggle[state];
//> 2
state= toggle[state];
//> 0




////////////////////////////////////////////////////////////////////////////////
// Version 30


// Additional level to allow for transition specification
var toggle={red: {next:"green"}, green: {next:"yellow"}, yellow:{next:"red"}}, state="red";
state= toggle[state]["next"];
//> "green"
state= toggle[state]["next"];
//> "yellow"




////////////////////////////////////////////////////////////////////////////////
// Version 31

// Alternate pathways to allow for branching transitions
var toggle={red: {next:"green",shortcut:"yellow"}, green: {next:"yellow"}, yellow:{next:"red"}}, state="red";
state= toggle[state]["shortcut"];
//> "yellow"
state= toggle[state]["next"];
//> "yellow"





////////////////////////////////////////////////////////////////////////////////
// Version 32
// For clarity, change the names a bit 

// definition
var state={
    red: {
      next:"green",
      shortcut:"yellow"
    }, 
    green: {next:"yellow"}, 
    yellow:{
      next:"red",
      stateRelatedData: "cool",
      stateRelatedFunc: function(a){
        this.stateRelatedData+=a;
        console.log(this.stateRelatedData);
      }
    }
  }, 
  current="red";
  
// operation
current= state[current].shortcut; // change to yellow state
//> "yellow"
state[current].stateRelatedFunc(" move");
current= state[current].next;  // change to red state
//> "red"
state[current].stateRelatedFunc("fault on this line");

// revisiting the FSM requirements:
// a simple definition of state -> event -> new state          check
// an enforcement of state transition                          check
// an implied initial state                                    ok
// a simple method to retrieve the current state name          check
// a method call by event name for transitions                 ok
// a closure on the internal variables                         meh

// Not perfect, but considering there is no constructor, this is as lightweight as possible. This is an organizational methodology.




////////////////////////////////////////////////////////////////////////////////
// Version 33
// add a transition method

var state={
    red: {
      next:"green",
      shortcut:"yellow"
    }, 
    green: {next:"yellow"}, 
    yellow:{
      next:"red",
      stateRelatedData: "cool",
      stateRelatedFunc: function(a){
        this.stateRelatedData+=a;
        console.log(this.stateRelatedData);
      }
    },
    $: 'red',
    trans: function(x){
      if (x in this[this.$])
        this.$= this[this.$][x]
    }
  };
  
// operation
state.trans("shortcut"); // change to yellow state
// this works
state.yellow.stateRelatedFunc(" world"); //> cool world
state.trans("next");
state.$ // red

////////////////////////////////////////////////////////////////////////////////
// Version 34
// A constructor can embody some of the functionality as follows:

function FSM(o){
  this.m= o; this.$= Object.keys(o)[0];
  this.trn= function(x){
      if (x in this.m[this.$])
        this.$= this.m[this.$][x], this.get= this.m[this.$];
    };
  this.get= this.m[this.$];
}

// define:
var z= new FSM({
    red: {
      next:"green",
      shortcut:"yellow"
    }, 
    green: {next:"yellow"}, 
    yellow: {
      next:"red",
      stateRelatedData: "cool",
      stateRelatedFunc: function(a){
        this.stateRelatedData+=a;
        console.log(this.stateRelatedData);
      }
    }
  });

// operate indirectly based on state:
z.trn("shortcut");
console.log(z.$);
console.log(z.get.stateRelatedFunc(" that"));
console.log(z.get.stateRelatedData);

// or directly, bypassing state checking
z.m.yellow.stateRelatedFunc(" that");




////////////////////////////////////////////////////////////////////////////////
// Version 35    (== 34, oops) see above


var q= new FSM({
    orange: {
      next:"purple",
      shortcut:"blue"
    }, 
    purple: {next:"blue"}, 
    blue: {
      next:"orange",
      stateRelatedDat: "coolness",
      stateRelatedFun: function(a){
        this.stateRelatedDat+=a;
        console.log(this.stateRelatedDat);
      }
    }
  });

// operate indirectly based on state:
q.trn("shortcut");
console.log(q.$);
console.log(q.get.stateRelatedFun(" this"));
console.log(q.get.stateRelatedDat);

// or directly, bypassing state checking
q.m.yellow.stateRelatedFun(" again");



// version 35 constructor compiles to 168 bytes:
function FSM(a){this.b=a;this.$=Object.keys(a)[0];this.trn=function(a){a in this.b[this.$]&&(this.$=this.b[this.$][a],this.get=this.b[this.$])};this.get=this.b[this.$]}
//which beautifies to:
function FSM(a) {
    this.b = a;
    this.$ = Object.keys(a)[0];
    this.trn = function(a) {
        a in this.b[this.$] && (this.$ = this.b[this.$][a], this.get = this.b[this.$])
    };
    this.get = this.b[this.$]
}


// revisiting the FSM requirements again:
// a simple definition of state -> event -> new state          check
// an enforcement of state transition                          check
// an implied initial state                                    check
// a simple method to retrieve the current state name          check
// a method call by event name for transitions                 ok
// a closure on the internal variables                         no
//
////
//////
////////-----------------------------------------------------------------///////
//       Compiled length of version 35 is same as version 18, 168 bytes!      //
///////------------------------------------------------------------------///////



////////////////////////////////////////////////////////////////////////////////
// Version 36
// closure within the trn function contains the transition matrix
function FSM(m){
  this.$= Object.keys(m)[0];
  this.trn= function(x){
      if (x in m[this.$])
        this.$= m[this.$][x], this.get= m[this.$];
    };
  this.get= m[this.$];
}

// define:
var z= new FSM({
    red: {
      next:"green",
      shortcut:"yellow"
    }, 
    green: {next:"yellow"}, 
    yellow: {
      next:"red",
      stateRelatedData: "cool",
      stateRelatedFunc: function(a){
        this.stateRelatedData+=a;
        console.log(this.stateRelatedData);
      }
    }
  });

// operate indirectly based on state:
z.trn("shortcut");
console.log(z.$);
console.log(z.get.stateRelatedFunc(" that"));
console.log(z.get.stateRelatedData);

// no direct access



var q= new FSM({
    orange: {
      next:"purple",
      shorty:"blue"
    }, 
    purple: {next:"blue"}, 
    blue: {
      next:"orange",
      stateRelatedDat: "coolness",
      stateRelatedFun: function(a){
        this.stateRelatedDat+=a;
        console.log(this.stateRelatedDat);
      }
    }
  });

// operate indirectly based on state:
q.trn("shorty");
console.log(q.$);
console.log(q.get.stateRelatedFun(" this"));
console.log(q.get.stateRelatedDat);

// compiles to: 139 bytes
function FSM(a){this.$=Object.keys(a)[0];this.trn=function(e){e in a[this.$]&&(this.$=a[this.$][e],this.get=a[this.$])};this.get=a[this.$]}
// beautify:
function FSM(a) {
    this.$ = Object.keys(a)[0];
    this.trn = function(e) {
        e in a[this.$] && (this.$ = a[this.$][e], this.get = a[this.$])
    };
    this.get = a[this.$]
}




///////////////////////////////////////////////////////////////////////////////
// Version 37
// Shortening of 'this' with side effect of closure on 's'
function FSM(m){
  var s= this; s.$= Object.keys(m)[0];
  s.get= m[s.$];
  s.trn= function(x){
    if (x in m[s.$])
      s.$= m[s.$][x], s.get= m[s.$];
  }
}

// Reduces by hand to 121
function FSM(a,s){s=this;s.$=Object.keys(a)[0];s.trn=function(e){e in a[s.$]&&(s.$=a[s.$][e],s.get=a[s.$])};s.get=a[s.$]}

// compiles to 125
function FSM(b){var a;a=this;a.$=Object.keys(b)[0];a.get=b[a.$];a.trn=function(f){f in b[a.$]&&(a.$=b[a.$][f],a.get=b[a.$])}}

// minifies to 123
function FSM(t){var n=this;n.$=Object.keys(t)[0],n.get=t[n.$],n.trn=function($){$ in t[n.$]&&(n.$=t[n.$][$],n.get=t[n.$])}}

var q= new FSM({
    orange: {
      next:"purple",
      shorty:"blue"
    }, 
    purple: {next:"blue"}, 
    blue: {
      next:"orange",
      stateRelatedDat: "coolness",
      stateRelatedFun: function(a){
        this.stateRelatedDat+=a;
        console.log(this.stateRelatedDat);
      },
      func2tran: function(){q.trn('next');}
    }
  });

// operate indirectly based on current state:
q.trn("shorty");
console.log(q.$);
console.log(q.get.stateRelatedFun(" this"));
console.log(q.get.stateRelatedDat);
q.get.func2tran();
q.$=='orange' // true

// Advantages of version 37:
// 1. direct query of valid transitions through .get
// 2. valid use of 'this' within the state-related objects and functions
// 3. pass parameters to state-related functions
// 4. initial state is retrievable
// Disadvantages versus version 18
// 1. lacks callable function for state change (can be srm)
// 2. slightly more verbose (define method AND transition)

//srm= state-related method


// a simple definition of state -> event -> new state          check
// an enforcement of state transition                          check
// an implied initial state                                    check
// a simple method to retrieve the current state name          check
// a method call by event name for transitions                 sorta
// a closure on the internal variables                         check







///////////////////////////////////////////////////////////////////////////////
// Version 38   (fork 32)
// Require the transition to be a callable function

var state={
    red: {
      next: function(){return "green"},
      shortcut: function(){return "yellow"}
    }, 
    green: {
      next: function(){return "yellow"}
    }, 
    yellow:{
      next: function(){return "red"},
      stateRelatedData: "cool",
      stateRelatedFunc: function(a){
        this.stateRelatedData+=a;
        console.log(this.stateRelatedData);
      }
    }
  }, 
  current="red";

// operation is now a function call
current= state[current].shortcut(); // change to yellow state
//> "yellow"
state[current].stateRelatedFunc(" move");
current= state[current].next();  // change to red state
//> "red"
state[current].stateRelatedFunc("fault on this line");





///////////////////////////////////////////////////////////////////////////////
// Version 39   (fork 38) to investigate alternative methodology
// Require the transition to be a callable function

var state={
    red: {
      next: function(){state.go("green")},
      shortcut: function(){state.go("yellow")}
    }, 
    green: {
      next: function(){state.go("yellow")}
    }, 
    yellow:{
      next: function(){state.go("red")},
      stateRelatedData: "cool",
      stateRelatedFunc: function(a){
        this.stateRelatedData+=a;
        console.log(this.stateRelatedData);
      }
    },
    $: 'red',                // current state key
    current: state['red'],   // current state object
    go: function(x){
      if (x in this)
        this.$= x, this.current= this[x]
        // <- switch to new state and update current
    }
}

// Three types of access
// 1: retrieve value                 x.current.stateRelatedData
// 2: invoke function                x.current.stateRelatedFunc(arg)
// 3: transition to new state        x.trans('next')

// operation
state.current.shortcut(); // change to yellow state
//> "yellow"
state.current.stateRelatedFunc(" move");
state.current.next();  // change to red state
//> "red"
state.current.stateRelatedFunc("fault on this line");



///////////////////////////////////////////////////////////////////////////////
// Version 40   (fork 37) 
// Create constructor

function FSM(m){
  var s= this; s.$= Object.keys(m)[0];
  s.get= m[s.$];
  for(o in m) m[o].go= function(x){   // go() is placed on each state
    if (x in m) s.$= x, s.get= m[x];
  }
}

//define
var q= new FSM({
    red: {
      next: function(){this.go("green")},
      shortcut: function(){this.go("yellow")}
    }, 
    green: {
      next: function(){this.go("yellow")}
    }, 
    yellow:{
      next: function(){this.go("red")},
      stateRelatedData: "cool",
      stateRelatedFunc: function(a){
        this.stateRelatedData+=a;
        console.log(this.stateRelatedData);
      }
    }
  });

//operate
q.$ // red
q.get.shortcut()
q.$ // yellow



///////////////////////////////////////////////////////////////////////////////
// Version 41   (fork 40) 
// Shorten constructor

function FSM(m){
  var s= this; s.$= Object.keys(m)[0];
  s.get= m[s.$];
  s.go= function(x){   // .go() is shared
    if (x in m) s.$= x, s.get= m[x];
  }
}

//define
var q= new FSM({
    red: {
      next: function(){q.go("green")},
      shortcut: function(){q.go("yellow")}
    }, 
    green: {
      next: function(){q.go("yellow")}
    }, 
    yellow:{
      next: function(){q.go("red")},
      stateRelatedData: "cool",
      stateRelatedFunc: function(a){
        this.stateRelatedData+=a;
        console.log(this.stateRelatedData);
      }
    }
  });

//operate
q.$ // red
q.get.shortcut()
q.$ // yellow


// testing and compression
//define
var q= new FSM({
    red: {
      next: function(){q.go("green")},
      shortcut: function(){q.go("yellow")}
    }, 
    green: {
      next: function(){q.go("yellow")}
    }, 
    yellow:{
      next: function(){q.go("red")},
      stateRelatedData: "cool",
      stateRelatedFunc: function(a){
        this.stateRelatedData+=a;
        console.log(this.stateRelatedData);
      }
    }
  });

//operate
console.log(q.$) // red
q.get.shortcut()
console.log(q.$) // yellow
q.get.stateRelatedFunc("hello");


var r= new FSM({
    blue: {
      next1: function(){r.go("purple")},
      shorty: function(){r.go("fusia")}
    }, 
    purple: {
      next1: function(){r.go("fusia")}
    }, 
    fusia:{
      next1: function(){r.go("blue")},
      stateRelatedDat: "coolio ",
      stateRelatedFun: function(a){
        this.stateRelatedDat+=a;
        console.log(this.stateRelatedDat);
      }
    }
  });

//operate
console.log(r.$); // blue
r.get.shorty();
console.log(r.$); // fusia
r.get.stateRelatedFun("hi world");
r.get.next1();
console.log(r.$); // blue
r.get.next1();
console.log(r.$); // purple


// gcc: 107 bytes
function FSM(b){var d=this;d.$=Object.keys(b)[0];d.get=b[d.$];d.go=function(e){e in b&&(d.$=e,d.get=b[e])}}




///////////////////////////////////////////////////////////////////////////////
// Version 42   (fork from 41gcc) 
// require init state
// FINAL
// gcc: 89 bytes
function FSM(b,i){
  var d= this; d.get= b[d.$= i];
  d.go= function(e){e in b&&(d.$= e,d.get= b[e])}
  }

// minify: 89 bytes (interesting choice of $ as a variable)
function FSM(t,n){var $=this;$.get=t[$.$=n],$.go=function(n){n in t&&($.$=n,$.get=t[n])}}


var r= new FSM({
    blue: {
      next1: function(){r.go("purple"); return 'something'},
      shorty: function(){r.go("fusia")}
    }, 
    purple: {
      next1: function(){r.go("fusia")}
    }, 
    fusia:{
      next1: function(){r.go("blue")},
      stateRelatedDat: "coolio ",
      stateRelatedFun: function(a){
        this.stateRelatedDat+=a;
        console.log(this.stateRelatedDat);
      }
    }
  },'blue');

//operate
console.log(r.$); // blue
r.get.shorty();
console.log(r.$); // fusia
r.get.stateRelatedFun("hi world");
r.get.next1();
console.log(r.$); // blue
r.get.next1();
console.log(r.$); // purple

//review
// a simple definition of state -> event -> new state          check
// an enforcement of state transition                          check
// an implied initial state                                    no
// a simple method to retrieve the current state name          check
// a method call by event name for transitions                 check
// a closure on the internal variables                         check

// advantages:
// 1. small!
// 2. transition can happen any time during the tranfunc
// 3. returns can be retrieved
// 4. normal state transitions can be overridden for debugging
// disadvantages:
// 1. spec is slightly longer requiring a function call to transition
// 2. init state must be specified (to make the .get() work)





////////////////////////////////////////////////////////////////////////////////
// Version 43   (fork of 42) 
// FSM constructor with state addition

function FSM() {
  var t= {}, $= this; 
  $.add= function(k,o){t[k]=o; $.$||($.get=t[$.$=k])};
  $.go=function(n){n in t&&($.$=n,$.get=t[n])}
}

// gcc: 126
function FSM(){var d={},a=this;a.add=function(e,h){d[e]=h;a.$||(a.get=d[a.$=e])};a.go=function(e){e in d&&(a.$=e,a.get=d[e])}}


// define
var r= new FSM;
r.add("blue", {
      next1: function(){r.go("purple"); return 'something'},
      shorty: function(){r.go("fusia")}
    }); 
r.add("purple", {
      next1: function(){r.go("fusia")}
    }); 
r.add("fusia", {
      next1: function(){r.go("blue")},
      stateRelatedDat: "coolio ",
      stateRelatedFun: function(a){
        this.stateRelatedDat+=a;
        console.log(this.stateRelatedDat);
      }
    });


//operate
console.log(r.$); // blue
r.get.shorty();
console.log(r.$); // fusia
r.get.stateRelatedFun("hi world");
r.get.next1();
console.log(r.$); // blue
console.log(r.get.next1()); // "something"
console.log(r.$); // purple



////////////////////////////////////////////////////////////////////////////////
// Version 44 Investigation
// revisit state as separate objects

//FSM constructor with state addition and object swapping
// concept: install current state as the FSM object? replace? factory?

function Machine() {
  var t= {}, $= this; 
  $.go=function(n){n in t&&($.$=n,$.kur=t[n])}
}
function State(m,k,o) {
  for(z in o)this[z]=o[z]; // set up method calls in transition object
  m.$||(m.kur=this,m.$=k); // if first state, set current
  m[k]= this; // store in Machine
}
//control object? current state object?
var m= new Machine, 
s= new State(m, 'red',    {next: function(){m.go('green') }} ); 
s= new State(m, 'green',  {next: function(){m.go('yellow')}} );
s= new State(m, 'yellow', {next: function(){m.go('red')   }} );

//operation
console.log(s.$);
s.next();

// conclusion: failed design direction



////////////////////////////////////////////////////////////////////////////////
// Version 45  (fork of 42)
// move methods up to constructor level on state change; remove 'get'

function FSM(m,i) {
  var $= this, e; 
  $.go=function(n){ if (n in m) {$.$=n;for(e in m[$.$]) $[e]=m[$.$][e]} };
  $.$||($.$=i,$.go(i))
}

//ug:119
function FSM(i,n){var o,$=this;$.go=function(n){if(n in i){$.$=n;for(o in i[$.$])$[o]=i[$.$][o]}},$.$||($.$=n,$.go(n))}

//gcc:FAIL? check order of assignment in $.go method)
//    if(n in m){$.$=n;for(e in m[$.$])$[e]=m[$.$][e]}
//>   if(b in e)for(f in a.a=b,e[a.a])a[f]=e[a.a][f]

//gcc:117
function FSM(e,b){var a=this,f;a.go=function(b){if(b in e)for(f in a.$=b,e[a.$])a[f]=e[a.$][f]};a.$||(a.$=b,a.go(b))}


//definition
var x= new FSM({
  red:    {next: function(){this.go('green') }},  // now 'this' works!
  green:  {next: function(){this.go('yellow')}},
  yellow: {next: function(){this.go('red')   }}
},'red');

//operation
console.log(x.$); // red
x.next();
console.log(x.$); // green
//Yay, success!



////////////////////////////////////////////////////////////////////////////////
// Version 46  (fork of 45)
// require 'go' to be called first to set the initial state

function FSM(m) {
  var $= this, e; 
  $.go=function(n){ if (n in m) {$.$=n;for(e in m[$.$]) $[e]=m[$.$][e]} }
}

//ug:96
function FSM(i){var o,$=this;$.go=function(n){if(n in i){$.$=n;for(o in i[$.$])$[o]=i[$.$][o]}}}

//gcc:94
function FSM(e){var a=this,f;a.go=function(b){if(b in e)for(f in a.$=b,e[a.$])a[f]=e[a.$][f]}}


//definition
var x= new FSM({
  red:    {next: function(){this.go('green') }},  // now 'this' works!
  green:  {next: function(){this.go('yellow')}},
  yellow: {next: function(){this.go('red')   }}
});
x.go('red'); //init
//operation
console.log(x.$); // red
x.next();
console.log(x.$); // green
//Yay, success!


// further testing
var r= new FSM({
    blue: {
      next1: function(){r.go("purple"); return 'something'},
      shorty: function(){r.go("fusia")}
    }, 
    purple: {
      next1: function(){r.go("fusia")}
    }, 
    fusia:{
      next1: function(){r.go("blue")},
      stateRelatedDat: "coolio ",
      stateRelatedFun: function(a){
        this.stateRelatedDat+=a;
        console.log(this.stateRelatedDat);
      }
    }
  });
r.go('blue');

//operate
console.log(r.$); // blue
r.shorty();
console.log(r.$); // fusia
r.stateRelatedFun("hi world");
r.next1();
console.log(r.$); // blue
r.next1();
console.log(r.$); // purple


//review
// a simple definition of state -> event -> new state          check
// an enforcement of state transition                          check
// an implied initial state                                    manual
// a simple method to retrieve the current state name          check
// a method call by event name for transitions                 check
// a closure on the internal variables                         check

// advantages:
// 1. 'this' keyword can be used in the matrix
// 2. methods are easier to access
// disadvantages:
// 1. changing states resets properties to initial values
// 2. init state must be specified
// 3. able to call transitions out of order



///////////////////////////////////////////////////////////////////////////////
// Version 47   (fork from 42) 
// require 'go' call to init, remove 'var $=this' and move $ assignment
// 
// tweak: 72 bytes
function FSM(b){var d=this;d.go=function(e){e in b&&(d.$=e,d.get=b[e])}}

// minify: 72 bytes (interesting choice of $ as a variable)
function FSM(t){var $=this;$.go=function(n){n in t&&($.$=n,$.get=t[n])}}

// next, try removing the var declaration and inner assignment: 68 bytes!
function FSM(b){this.go=function(e){e in b&&(this.get=b[this.$=e])}}


// FINAL: miniFSM v47
function Fsm(m) {
  this.set= function(s) {
    s in m && (this.$= m[this.get= s])
  }
}
// or verbosely...
function Fsm(matrix) {
  this.set= function(state) {
    state in matrix && (this.$= matrix[this.get= state])
  }
}

// Final v47
function Fsm(m){this.set=function(s){s in m&&(this.$=m[this.get=s])}} //69 bytes

var r= new Fsm({
    blue: {
      next1: function(){r.set("purple"); return 'something'},
      shorty: function(){r.set("fusia")}
    }, 
    purple: {
      next1: function(){r.set("fusia")}
    }, 
    fusia:{
      next1: function(){r.set("blue")},
      stateRelatedDat: "coolio ",
      stateRelatedFun: function(a){
        this.stateRelatedDat+=a;
        console.log(this.stateRelatedDat);
      }
    }
  }); r.set('blue');

//operate
console.log(r.get); // blue
r.$.shorty();
console.log(r.get); // fusia
r.$.stateRelatedFun("hi world");
r.$.next1();
console.log(r.get); // blue
r.$.next1();
console.log(r.get); // purple




////////////////////////////////////////////////////////////////////////////////
// Version 48   (fork from 47) 
// shorten 'go', 'get', and 'FSM', perhaps a little cryptic
// tweak: 63 bytes

function S(m){this.f=function(s){s in m&&(this.g=m[this.c=s])}}

// S= state machine constructor                         ...was 'FSM'
// c= current state string key (property name: state)   ...was '$'
// g= get current state object (value: trans object)    ...was 'get'
// f= function/method to transition to a new state      ...was 'go'

// beautify
function S(m) {                           // pass in a machine definition
  this.f= function(s) {                  // create a method
    s in m && (this.c= s, this.g= m[s]) // to set valid states
  }
}

//define
var gState= new S({
  on:  { flip: function(){ gState.f('off')} },
  off: { flip: function(){ gState.f('on')}  }
});
//operate
gState.f('on');   // <-- set initial state
gState.g.flip();
gState.g.flip();
gState.g.flip();
gState.c          //> "off"


////////////////////////////////////////////////////////////////////////////////
// Version 49   (fork from 48) 
// require use of current state key to access current object, replacing g with m
// tweak: 62 bytes

function S(m){this.m=m;this.f=function(s){s in m&&(this.c=s)}}
//define
var gSt= new S({
  on:  { flip: function(){ gSt.f('off')} },
  off: { flip: function(){ gSt.f('on')}  }
});
//operate
gSt.f('on');   // <-- set initial state
gSt.m[gSt.c].flip(); // index using .c
gSt.m[gSt.c].flip();
gSt.m[gSt.c].flip();
gSt.c          //> "off"

// resulting in a more awkward syntax for accessing the transition methods




////////////////////////////////////////////////////////////////////////////////
// Version 50   (fork from 49)
// drop the constructor and use f() to change states
// tweak: 32 bytes (distilled mechanism)

function f(m,s){s in m&&(m.c=s)}  // don't blink
//or
function f(m,s){if(s in m)m.c=s}
//or
function f(m,s) {
    if (s in m) m.c= s
}


//define
var gSt= {
  on:  { flip: function(){ f(gSt,'off')} },
  off: { flip: function(){ f(gSt,'on')}  },
};
//operate
f(gSt,'on');   // <-- set initial state in object
console.log(gSt.c); //> "on"
gSt[gSt.c].flip(); // index into the state object using .c
gSt[gSt.c].flip();
gSt[gSt.c].flip();
gSt.c          //> "off"


// further testing
var fsm= {
    blue: {
      next1: function(){f(fsm,"purple"); return 'something'},
      shorty: function(){f(fsm,"fusia")}
    }, 
    purple: {
      next1: function(){f(fsm,"fusia")}
    }, 
    fusia:{
      next1: function(){f(fsm,"blue")},
      stateRelatedDat: "coolio ",
      stateRelatedFun: function(a){
        this.stateRelatedDat+=a;
        console.log(this.stateRelatedDat);
      }
    }
};

//operate
f(fsm,'blue');   // <-- set initial state in object
console.log(fsm.c); // blue
fsm[fsm.c].shorty();
console.log(fsm.c); // fusia
fsm[fsm.c].stateRelatedFun("hi world");
fsm[fsm.c].next1();
console.log(fsm.c); // blue
fsm[fsm.c].next1();
console.log(fsm.c); // purple
fsm[fsm.c].shorty(); // Uncaught TypeError: fsm[fsm.c].shorty is not a function
// perfect


//review
// a simple definition of state -> event -> new state          check
// an enforcement of state transition                          check
// an implied initial state                                    manual
// a simple method to retrieve the current state name          check
// a method call by event name for transitions                 check
// a closure on the internal variables                         n/a

// advantages:
// 1. minimal transition enforcement
// disadvantages:
// 1. awkward syntax to access transition object methods




////////////////////////////////////////////////////////////////////////////////
// Explore naming options for v48
function S(m) {
  this.f= function(s) {
    s in m && (this.$= m[this.s= s])
  }
}
//define
var gSt=new S({
  on:  { flip: function(){ gSt.f('off')} },
  off: { flip: function(){ gSt.f('on')}  }
});
//operate
gSt.f('on');        // <-- set initial state in object
console.log(gSt.s); //> "on"   get state name ".s"
gSt.$.flip();       //  state object selector ".$"
//>works

function Sm(m) {
  this.go= function(s) {
    s in m && (this.trn= m[this.$= s])
  }
}
//define
var gSt=new Sm({
  on:  { flip: function(){ gSt.go('off')} },
  off: { flip: function(){ gSt.go('on')}  }
});
//operate
gSt.go('on');         // set state 
console.log(gSt.$);   //> "on"   get state name ".$"
gSt.trn.flip();       //  transition object selector ".trn"
//>works


// *** preferred naming option: get & set() state and $ to access curStateObj
function Fsm(m) {
  this.set= function(s) {
    s in m && (this.$= m[this.get= s])
  }
}
//define
var state= new Fsm({
  on:  { flip: function(){ state.set('off')}, update: function(){}, dat:42},
  off: { flip: function(){ state.set('on' )}, update: function(){}, dat:43}
});
//operate
state.set('on');           // set state using key    ".set"
console.log(state.get);    //> "on"   get state name ".get"
state.$.flip();            // state object selector ".$" and transition method
state.$.update();          // accessing a method within the state object
console.log(state.$.dat);  // accessing data within the state object
//>works



//alternates: could this work?
gSt.$('on');        // state "selector" like jQuery
console.log(gSt.s); //> "on"   get state name ".s"
gSt.$.flip();       // state object selector ".$"

//interesting:
var f=function(){return f.$}   // but f is a function when inspected
f.$='red';
f(); //> "red"
//and
var f=function(){return f.$()}
f.$=function(){console.log('hi')};
f(); //> "hi"

//variant, tucking current state within method
function S(m) {
  this.$= function(s) {
    s in m && (this.$.t= m[this.s=s])
  }
}

var gSt=new S({
  on:  { flip: function(){ gSt.$('off')} },
  off: { flip: function(){ gSt.$('on')}  }
});
// works, but not ideal:
gSt.$('on');
gSt.$.t.flip();
gSt.s

//really wishing for:
gSt.$('on');
gSt.$.flip();
gSt.s

////////////////////////////////////////////////////////////////////////////////
// explore alternate self-transitional structure

var gSt={
  m: ['on','off'],
  $: function(s){ gSt.s=s },     // method to set current state
  s: 0
};
gSt.$.flip: function(){ gSt.$('off') } },

gSt.$.flip();



////////////////////////////////////////////////////////////////////////////////
// Version 51
// numeric states with named transition methods / variant of v32
var states=[
  {flip: function(){c=1}},  
  {flip: function(){c=2}},
  {flip: function(){c=0}}
], current=0;
current  // current state
states[current].flip() // go to next state

// define
var states=[
  /* 0 */ {flip: function(){current=1}, flop: function(){current=2}},
  /* 1 */ {flip: function(){current=2}},
  /* 2 */ {flip: function(){current=0}}
], current=0;
// operate
console.log(current);  // get current state
states[current].flop(); // go to state 2
states[current].flip(); // then on to state 0

// disadvantages
// everything is global, but could be closed


////////////////////////////////////////////////////////////////////////////////
// Version 52
// common transition function

// define
var 
  states= [
  /* 0 */ {flip: 1, flop: 2},
  /* 1 */ {flip: 2},
  /* 2 */ {
    flip: 0,       
    stateRelatedDat: "coolio ",
    stateRelatedFun: function(a){
      this.stateRelatedDat+=a;
      console.log(this.stateRelatedDat);
    }
  }],
  current= 0, 
  go= function(trans){
      current= states[current][trans];
  };

// operate
console.log(current);  // get current state
go("flop");   // go to state 2
states[current].stateRelatedFun(" spot");   // call on state 2 method
go("flip");   // then on to state 0



////////////////////////////////////////////////////////////////////////////////
// Version 53
// string transition method

function Fsm(m){
  this.set=function(s){this.get=s};
  this.$=function(t){m[[this.get,t]].apply(this,arguments)};
}
//define
var states= {}, f=new Fsm(states)
states[['red',   'trigger']]= function(){f.set('green' )};
states[['red',   'alt1'   ]]= function(){f.set('blue'  )};
states[['green', 'trigger']]= function(){f.set('yellow')};
states[['yellow','trigger']]= function(){f.set('red'   )};
states[['blue',  'trigger']]= function(){f.set('red'   )};

//operate
f.set('red');
f.$('trigger');
f.get
//works



////////////////////////////////////////////////////////////////////////////////
// Version 54  (fork from 53)
// add transition creation method

function Fsm(m){
  m=m||{};
  this.set=function(s){this.get=s};
  this.$=function(t){m[[this.get,t]].apply(this,arguments)};
  this.make=function(s,t,c){m[[s,t]]=c}
}
//define
var f=new Fsm;
f.make('red',   'trigger', function(){f.set('green' )} );
f.make('red',   'alt1',    function(){f.set('blue'  )} );
f.make('green', 'trigger', function(){f.set('yellow')} );
f.make('yellow','trigger', function(){f.set('red'   )} );
f.make('blue',  'trigger', function(){f.set('red'   )} );

//operate
f.set('red');
f.$('trigger');
f.get
//works

f.$('invalid'); 
// throws Uncaught TypeError: Cannot read property 'apply' of undefined



////////////////////////////////////////////////////////////////////////////////
// Version 55
// inline transition definition

function Fsm(m){
  this.set=function(s){this.get=s};
  this.$=function(t){
    m[[this.get,t]].apply(this,([].shift.apply(arguments),arguments))
  }
}

//gcc 135
function Fsm(b){this.set=function(b){this.get=b};this.$=function(e){b[[this.get,e]].apply(this,([].shift.apply(arguments),arguments))}}

function Fsm(b){var v=this;v.set=function(b){v.get=b};v.$=function(e){b[[v.get,e]].apply(v,([].shift.apply(arguments),arguments))}} // tweak to 131

//define
var f=new Fsm({
  'red,trigger'   : function(x){console.log(x);this.set('green' )},
  'red,alt1'      : function(){this.set('blue'  )},
  'green,trigger' : function(){this.set('yellow')},
  'yellow,trigger': function(){this.set('red'   )},
  'blue,trigger'  : function(){this.set('red'   )}
});

//operate
f.set('red');
f.$('trigger','hello');  // hello
f.get //green

f.set('red')
f.$('alt1')
f.get //blue

//works

////////////////////////////////////////////////////////////////////////////////

//Rudimentary state machine or manager or controller
function Fsm(m){this.set=function(s){s in m&&(this.$=m[this.get=s])}}

var f= new Fsm({ red:{}, green:{}, yellow:{} });
f.set('red'), f.$.go= function(){f.set('green')};


//Potential names for constructor instead of 'Fsm':
var z= new StateObject({ red: {}, green: {}, yellow: {} });
var z= new TransitionMatrix({ red: {}, green: {}, yellow: {} });
//When reading the code a year or two later, what makes most sense?
// StateTree, StateSwitch, FlipState
var z= new StateSwitch({
    red: { /* etc */ }, 
    green: {}, 
    yellow: {}
});

// v47 JSLint edition 2015-12-02
/*jslint
    this
*/
/*property
    $, get, hasOwnProperty, set
*/
function Fsm(m) {
    'use strict';
    this.set = function (s) {
        if (m.hasOwnProperty(s)) {
            this.get = s;
            this.$ = m[s];
        }
    };
}

// Note: the above code with the .hasOwnProperty gcc is a whopping 84 bytes
function Fsm(c){this.set=function(d){c.hasOwnProperty(d)&&(this.get=d,this.$=c[d])}}

////////////////////////////////////////////////////////////////////////////////
// Rename from Fsm to StateSwitch (for readability) v47
// Rudimentary finite state machine constructor

// 77 bytes
function StateSwitch(m){this.set=function(s){s in m&&(this.$=m[this.get=s])}}

// 92 bytes
function StateSwitch(m){this.set=function(s){m.hasOwnProperty(s)&&(this.get=s,this.$=m[s])}}

// 100 bytes
window.StateSwitch=function(a){this.set=function(b){a.hasOwnProperty(b)&&(this.get=b,this.$=a[b])}};


//define
var r= new StateSwitch({
    blue: {
      next1: function(){r.set("purple"); return 'something'},
      shorty: function(){r.set("fusia")}
    }, 
    purple: {
      next1: function(){r.set("fusia")}
    }, 
    fusia:{
      next1: function(){r.set("blue")},
      stateRelatedDat: "coolio ",
      stateRelatedFun: function(a){
        this.stateRelatedDat+=a;
        console.log(this.stateRelatedDat);
      }
    }
  }); r.set('blue');

//operate
console.log(r.get); // blue
r.$.shorty();
console.log(r.get); // fusia
r.$.stateRelatedFun("hi world");
r.$.next1();
console.log(r.get); // blue
r.$.next1();
console.log(r.get); // purple

////////////////////////////////////////////////////////////////////////////////
// Further experimentation with StateSwitch

// no object passed //
var f= new StateSwitch;
f.set('red');
// Uncaught TypeError: Cannot read property 'hasOwnProperty' of undefined
// Uncaught TypeError: Cannot use 'in' operator to search for 'red' in undefined


// empty object passed //
var f= new StateSwitch({});
f.set('red');
// state 'red' does not exist in the state object, therefore no change
// and .$ and .get are not set up (like setting an invalid state)


// valid state names are defined in the constructor call //
var f= new StateSwitch({a:0,b:1});
f.set('a')
f.get // "a"
f.$ // 0
// successfully sets .get to 'a' and .$ to 0
// methods for state transition are not defined


// ex post facto state methods setup //
var f= new StateSwitch({a:0,b:1});
f.set('a');
f.$ = {go:function(){f.set('b')}};
f.$.go();
f.get // "b"
f.$ = {go:function(){f.set('a')}}
// state machine is now fully defined and operational


// mechanism modification //
function StateSwitch(m){
    this.set=function(s){s in m&&(this.$=m[this.get=s])};
    this.add=function(o){m=o}; // <--- new method to add states *
}
var f= new StateSwitch;
f.add({a:0,b:1}); // add valid state names
f.set('a');
f.$ = {go:function(){f.set('b')}}; // add transition method

// *=this modification cannot be a prototype method due to private variable 'm'

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////eof