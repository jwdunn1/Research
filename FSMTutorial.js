// Finite State Machine tutorial
// Engineer: James William Dunn
// Date: 20151208

/* A state machine is defined by a list of states and events that trigger transitions. This transition matrix (or set of rules) can be represented as an object. It is used to instantiate an FSM object using the constructor below. The FSM constructor was designed to be ultra-lightweight and operate on a set of declarative rules. This tutorial explains how to formulate those rules. */

//////////////////////////////////////////////////////////////////////////////80

function Fsm(m){this.set=function(s){s in m&&(this.$=m[this.get=s])}} //69 bytes


// For debugging and inspection, here is the constructor source for miniFSM v47:
function Fsm(matrix) {            // pass in a machine definition
  this.set= function(state) {     // create a method such that
    if (state in matrix) {        // if state exists in the matrix
      this.get= state;            // set the current state key
      this.$= matrix[state]       // and the current state object
    } 
  }
}

/* 
  Manifest of variables
    Fsm = finite state machine constructor

  internals
    matrix = an object defining the state transition matrix
    state = named argument (state key) in method

  externals
    get = gets the current state string key (property name: state)
    $   = gets the current state object (value: state object)
    set = sets the current state string and object / Note: other than initialization, set() should not be called outside of the state object
*/

////////////////////////////////////////////////////////////////////////////////
// Sample definition and operation
////////////////////////////////////////////////////////////////////////////////

/* 
Defined below is a table of states modeling the basic sequence of a traffic light:

  State:   Event:    Next state:
  red      trigger   green
  green    trigger   yellow
  yellow   trigger   red
  
Building the transitionMatrix object is a three step process:

1) List each state as a property name. For every property name, the corresponding value is defined initially as an empty object. Using literal notation, begin with setting up the construct call as follows:
*/
  var tL= new Fsm({
      red:    {},     // <---- each value is an empty 'state' object
      green:  {},     //       which can hold state-related properties,
      yellow: {}      //       methods, and transitions.
  });

/* 
2) Next, load each of the empty state objects with a property/value pair: where the new property name identifies a transition method and the value becomes the next valid state function. For example, 'trigger' might be the name of the transition method common to each of the states. In the next step, the function body will be added, but for illustrative purposes, the following code appears to closely resemble the table of states above.
*/

  var tL= new Fsm({
      red:    {trigger: 'green' },
      green:  {trigger: 'yellow'},
      yellow: {trigger: 'red'   }
  });

/*
3) Finally, add the function body to complete the method, passing the 'next state value' as a string argument to the constructor 'set()' method which properly assigns the current state string and object. Note: 'this.set()' cannot be used due to 'this' referencing the state object and not the FSM object.
*/

  var tL= new Fsm({
    red:    {trigger: function() { tL.set('green' ) }},
    green:  {trigger: function() { tL.set('yellow') }},
    yellow: {trigger: function() { tL.set('red'   ) }}
  });

// The tL object is now fully defined and ready to functionally manage state.


// alternate definition style in ES6
  var red={},green={},yellow={}, f= new Fsm({red,green,yellow});
  red.trigger= function(){f.set('green')};
  green.trigger= function(){f.set('yellow')};
  yellow.trigger= function(){f.set('red')};
  f.set('red');
  f.$.trigger();
  f.get
// or in ES5
  var r={},g={},y={}, 
  f= new Fsm({red:r,green:g,yellow:y});   // objects in the Fsm closure refer
  r.trigger= function(){f.set('green')};  // to globals which can be dynamically
  g.trigger= function(){f.set('yellow')}; // adjusted as needed
  y.trigger= function(){f.set('red')};
  f.set('red');
  f.$.trigger();
  f.get
// or define transitions within a defined current state
  var f= new Fsm({red:{},green:{},yellow:{}});
  f.set('green');  f.$.trigger= function(){f.set('yellow')};  // quite flexible!
  f.set('yellow'); f.$.trigger= function(){f.set('red')};
  f.set('red');    f.$.trigger= function(){f.set('green')};
  f.$.trigger();
  f.get



// Operation is simple.

  // First, set the initial state by calling the tL.set() method. This is the only instance when the set() method should be called outside of a state object. The set() method assigns the .get and .$ properties in the FSM object.

  tL.set('red');

  // Second, the current state key is available to query in the 'get' property:

  tL.get; //-> "red"

  // Third, to change state, use the '.$' property of the FSM object to gain access to the current state object in the transition matrix and invoke a valid transition method.

  tL.$.trigger(); // transition to "green" state
  console.log(tL.get);
  //-> "green"






////////////////////////////////////////////////////////////////////////////////
// The transition matrix can be augmented in many ways. Explorations follow:


// The transition functions can have different names.

  var tL2= new Fsm({
      red:    {c1: function() {tL2.set('green') }},
      green:  {c2: function() {tL2.set('yellow')}},
      yellow: {c3: function() {tL2.set('red')   }}
  }); tL2.set('red');
    // this requires knowing current state to fire the appropriate trigger, which may be the case if a set of buttons are present on a UI.

// Additional transitions can be specified which can have one or more paths to other states.
    
  // Given four states where 'red' has two allowable transitions:
  // red    ->  green    <or>    red -> blue
  // green  ->  orange
  // orange ->  blue
  // blue   ->  red

  var x= new Fsm({
      red:    {next: function() {x.set('green' )},
               alt:  function() {x.set('blue'  )}},
      green:  {next: function() {x.set('orange')}},
      orange: {next: function() {x.set('blue'  )}},
      blue:   {next: function() {x.set('red'   )}}
  }); x.set('red');


// A transition method can do more than merely trigger a new state. Simply execute additional statements. For example:

  var tL3= new Fsm({
    red: {
      next: function() {          // <---- transition object method
        console.log('red->green');
        tL3.set('green')
      }
    },
    green:  {next: function() {tL3.set('yellow')}},
    yellow: {next: function() {tL3.set('red'   )}}
  }); tL3.set('red');

// All transitions are invoked the same way - with a call to .$.next() In this case, when transitioning from 'red' to 'green', a message is logged to the console.

    tL3.$.next();     //-> red->green

// Additional state-related functionality can be added to a state object. For example, below the action1 method is added to the 'red' state:

    var tL4= new Fsm({
      red: {
        go: function() {
          console.log('red->green');
          tL4.set('green')
        },
        action1: function(){
          console.log("red action1");
        }
      },
      green:  {go: function(){tL4.set('yellow')}},
      yellow: {go: function(){tL4.set('red'   )}}
    }); tL4.set('red');

    // the action may be invoked, without a change of state.
    tL4.$.action1();
    //-> red action1
    tL4.get
    //-> "red"

    // Attempting to invoke the action on another state is benign.
    tL4.$.go(); // switch to 'green' state

// If the following call is attempted in the 'green' state, an exception occurs.
    tL4.$.action1(); //> Uncaught TypeError: tL4.$.action1 is not a function
    


// For brevity within the transition matrix passed to the FSM constructor, functions can be defined in advance.
    function transition1() {
      console.log('red->green');
      tL5.set('green')
    }
    function transition2() {
      console.log('green->yellow');
      tL5.set('yellow')
    }
    function transition3() {
      console.log('yellow->red');
      tL5.set('red')
    }
    function action1(){
      console.log("red action1");
    }
    var tL5= new Fsm({
        red:    {go: transition1, action: action1},
        green:  {go: transition2},
        yellow: {go: transition3}
    });
    tL5.set('red');



// Transition functions can be invoked with defined parameters
    var tL6= new Fsm({
        red:    {chng: function(){tL6.set('green') }},
        green:  {chng: function(){tL6.set('yellow')}},
        yellow: {chng: function(msg) { console.log(msg);tL6.set('red')} }
    }); tL6.set('red');

    // The following transitions the state from 'red' to 'green' to 'yellow' and finally to 'red' with a parameterized message.
    tL6.$.chng();
    tL6.$.chng();
    tL6.$.chng('Going to red state');
    //-> Going to red state
    tL6.get;
    //-> "red"



// 'this' references the current state object. It can be used to access properties and methods local to the state object.


    var tL7= new Fsm({
        red:    {chng: function(){tL7.set('green' )}},
        green:  {chng: function(){tL7.set('yellow')}},
        yellow: {                                // yellow state object
          chng: function(){tL7.set('red')},
          stateRelatedDat: "coolio ",
          stateRelatedFun: function(a){
            this.stateRelatedDat+=a;             // <-- 'this' references the
            console.log(this.stateRelatedDat);   //      yellow state object
            }
        }
    }); tL7.set('red');

tL7.set('yellow')
tL7.$.stateRelatedFun('doolio')
console.log(tL7.$.stateRelatedDat);
//> "coolio doolio"



// The FSM can be used to define pre- and post-state transition actions within the state object. These actions can be executed within the transition method or as state-related support functions.



////////////////////////////////////////////////////////////////////////////////
// The following examples use an early version (v14) of the FSM constructor:

function FSM(d){function q(g){return function(h){g in e&&(h="function"==typeof e[g]?e[g].apply(e,arguments):e[g],h in d&&(e=d[h],this.$=h))}}var m,n,e=d[this.$=Object.keys(d)[0]];for(n in d)for(m in d[n])this[m]=q(m)} // 217 bytes

// With this version of the constructor, $ is the current state string and the methods defined within the state objects are exported to the FSM object level. State transition methods are required to return a next valid state string. Initial state is the first defined state in the transition matrix.

////////////////////////////////////////////////////////////////////////////////
// Additional scenarios...


    // The following function is called just prior to state change, perhaps to adjust the view 
    function dink(c){}

    var x= new FSM({
      red: {
        flip: function() {
          dink(0x00cc00);    /* <-- pre state-change function call */
          return 'green';    /* required: return*/
        },
        update: function() {console.log("update in red state")}
      },
      green: {
        flip: function() {
          dink(0xff7700);
          return 'orange'
        },
        update: function() {console.log("update in green state")}
      },
      orange: {
        flip: function() {
          dink(0x0000ff);
          return 'blue'  
        },
        update: function() {console.log("update in orange state")}
      },
      blue: {
        flip: function() {
          dink(0xcc0000);
          return 'red'   
        },
        update: function() {console.log("update in blue state")}
      }
    });


// update() method is called for each different state.

    x.update();
    x.flip();
    x.update();
    x.$
    //-> "green"






////////////////////////////////////////////////////////////////////////////////
/* Example of a four-way traffic-light controller. This can be modeled using nested (parent/child) state machines. The intersection has four traffic lights. Each light controls a direction of flow. The northbound and southbound lights are synchronized, as are the east and west. A controller (parent) state machine manages the overall flow state. It is initialized with east/west traffic flowing, and north/south halted. The 'parent' state controller has a state-related action called 'trigger' and an event called 'complete', while each 'child' light has one event: 'trigger'.

Transition table for controller:
State:      Trigger:  Next state:  Action:
eastWest    trigger                trigger eb/wb lights to yellow
eastWest    complete  northSouth   trigger all lights
northSouth  trigger                trigger nb/sb lights to yellow
northSouth  complete  eastWest     trigger all lights

Transition table for traffic light:
State:      Trigger:  Next state:  Action:
red         trigger   green        *
green       trigger   yellow
yellow      trigger   red

* none presently, but the real-world action would be switching the light.

*/

var nbLight,sbLight,ebLight,wbLight,control,
    lightState= { // start up with red state
      red:    {trigger: 'green' },
      green:  {trigger: 'yellow'},
      yellow: {trigger: 'red'   }
    },
    masterState= {
        eastWest: { // start up with east/west flow
            trigger: function() {
                ebLight.trigger(),wbLight.trigger();
            },
            complete: function() {
                nbLight.trigger(),sbLight.trigger(),ebLight.trigger(),wbLight.trigger();
                return 'northSouth'
            }
        },
        northSouth: {
            trigger: function() {
                nbLight.trigger(),sbLight.trigger();
            },
            complete: function() {
                nbLight.trigger(),sbLight.trigger(),ebLight.trigger(),wbLight.trigger();
                return 'eastWest'
            }
        }
    };
    nbLight= new FSM(lightState);
    sbLight= new FSM(lightState);
    ebLight= new FSM(lightState); ebLight.trigger(); //init to 'green'
    wbLight= new FSM(lightState); wbLight.trigger();
    control= new FSM(masterState);

// Check initialization of east/west flow:
    control.$=='eastWest'&& nbLight.$=='red' && sbLight.$=='red' && ebLight.$=='green' && wbLight.$=='green'

// Two step sequence to change to north/south flow:
control.warn();
    control.$=='eastWest'&& nbLight.$=='red' && sbLight.$=='red' && ebLight.$=='yellow' && wbLight.$=='yellow'
control.complete();
    control.$=='northSouth'&& nbLight.$=='green' && sbLight.$=='green' && ebLight.$=='red' && wbLight.$=='red'

// Two step sequence to change to east/west flow:
control.warn();
    control.$=='northSouth'&& nbLight.$=='yellow'&&sbLight.$=='yellow' && ebLight.$=='red' && wbLight.$=='red'
control.complete();
    control.$=='eastWest'&& nbLight.$=='red'&& sbLight.$=='red' && ebLight.$=='green' && wbLight.$=='green'
    

////////////////////////////////////////////////////////////////////////////////
// Add timing to transitions

/* transition table for controller
State:      Trigger:  Next state:  Action:
eastWest    trigger                trigger eb/wb lights to yellow, timer
eastWest    complete  northSouth   trigger all lights
northSouth  trigger                trigger nb/sb lights to yellow, timer
northSouth  complete  eastWest     trigger all lights
*/

// Create a recursive asynchronous function to add some delay and eventually complete the transition.

  function async(to, t) {
    var p= "Pending state: ";
    if (t==0) {
      console.log("Entering state: " + to);
      control.complete(); // trigger deferred state transition
    }
    else {
      console.log(p+to+" in "+t+" seconds...");
      setTimeout(function() {
        async(to, t-1);
      }, 1000);
    }
  }

var nbLight,sbLight,ebLight,wbLight,control,
    lightState= { // start up with red state
      red:    {trigger: 'green' },
      green:  {trigger: 'yellow'},
      yellow: {trigger: 'red'   }
    },
    masterState= {
      eastWest: { // start up with east/west flow
        trigger: function() {
          ebLight.trigger(),wbLight.trigger();
          async('northSouth',5);
        },
        complete: function() {
          nbLight.trigger(),sbLight.trigger(),ebLight.trigger(),wbLight.trigger();
          return 'northSouth'
        }
      },
      northSouth: {
        trigger: function() {
          nbLight.trigger(),sbLight.trigger();
          async('eastWest',5);
        },
        complete: function() {
          nbLight.trigger(),sbLight.trigger(),ebLight.trigger(),wbLight.trigger();
          return 'eastWest'
        }
      }
    };
    nbLight= new FSM(lightState);
    sbLight= new FSM(lightState);
    ebLight= new FSM(lightState); ebLight.trigger(); //init to 'green'
    wbLight= new FSM(lightState); wbLight.trigger();
    control= new FSM(masterState);

// Check initialization of east/west flow:
    control.$=='eastWest'&& nbLight.$=='red' && sbLight.$=='red' && ebLight.$=='green' && wbLight.$=='green'

// Single step to change to north/south flow:
control.trigger();
    control.$=='eastWest'&& nbLight.$=='red' && sbLight.$=='red' && ebLight.$=='yellow' && wbLight.$=='yellow'

// Check for northSouth state after three seconds:
    control.$=='northSouth'&& nbLight.$=='green' && sbLight.$=='green' && ebLight.$=='red' && wbLight.$=='red'

// Change to east/west flow:
control.trigger();
    control.$=='northSouth'&& nbLight.$=='yellow'&&sbLight.$=='yellow' && ebLight.$=='red' && wbLight.$=='red'

// Check for eastWest state after three seconds:
    control.$=='eastWest'&& nbLight.$=='red'&& sbLight.$=='red' && ebLight.$=='green' && wbLight.$=='green'

// Verified as working


//////////////////////////////////////////////////////////
/* Implementing an (semi)hierarchical state machine

Application: Active/Standby Server Pair

http://www.eventhelix.com/RealtimeMantra/HierarchicalStateMachine.htm

Transition table for high-level states:
State:      Trigger:  Next state:  Action:
inService   fault     outService   runDiag
outService  diagPass  inService    

Transition table for inService low-level states:
State:      Trigger:  Next state:  Action:
active      failover  standby      performSwitchover
standby     failover  active       performSwitchover

Transition table for outService low-level states:
suspect     diagFail  failed       alertOp
failed      opReset   suspect      runDiag

*/
// The tables above translate to the following objects
var unitState= {
  _: {init: 'inService'},
  inService: {
    fault: function(){
        runDiagFail();
        return 'outService'
      }
  },
  outService: {
    diagPass: 'inService'
  }
}, inState= {
  _: {init: 'active'},
  active: {
    failover: function(){
      performSwitchover();
      return 'standby'
    }
  },
  standby: {
    failover: function(){
      performSwitchover();
      return 'active'
    }
  }
}, outState= {
  _: {init: 'suspect'},
  suspect: {
    diagFail: function(){
      alertOp();
      return 'failed'
    }
  },
  failed: {
    opReset: function(){
      runDiagPass();
      return 'suspect'
    }
  }
}, server= new FSM(unitState);
server.inServ= new FSM(inState);
server.outServ= new FSM(outState);

function performSwitchover(){
  console.log('performSwitchover()');
}

function runDiagPass(){
  console.log('running diagnostics...');
  setTimeout(function(){
    console.log('outService -> inService');
    server.diagPass(); // <-- pass, go back to inService
  },3000);
}
function runDiagPass_thisDoesNotWork(){
  console.log('running diagnostics...');
  console.log('outService -> inService');
  setTimeout(server.diagPass,1000);  // <-- runs the wrong context
}

function runDiagPass_thisDoes(){
  console.log('running diagnostics...');
  console.log('outService -> inService');
  setTimeout(server.diagPass.bind(server),1000);  // <-- runs correctly
}



function runDiagFail(){
  console.log('running diagnostics...');
  setTimeout(function(){
    console.log('suspect -> failed');
    server.outServ.diagFail();
  },3000); // <-- triggers alertOp()
}

function reset(){
  console.log('failed -> suspect');
  server.outServ.opReset();
}

function alertOp(){
  console.log('Diagnostics failure! Fix the problem and then run reset()');
}


server.init(); // bring the server into initial state
server.inServ.init();
server.outServ.init();
server.$
server.inServ.$
server.inServ.failover();
server.inServ.$
server.inServ.failover();
server.inServ.$

server.fault(); // <-- triggers runDiagFail()
console.log(server.$);

reset(); // <-- triggers runDiagPass()
console.log(server.$);



////////////////////////////////////////////////////////////////////////////////
// Now add two servers, with failover if active server faults
var 
  s1= new FSM({
  _: {init: 'inService'},
  inService: {
    fault: function(){
        if (s1.inServ.$=='active') s1.inServ.failover();
        runDiagFail(s1);  // <-- parameterized these functions
        return 'outService'
      }
  },
  outService: {
    diagPass: 'inService'
  }
}), 
  s2= new FSM({
  _: {init: 'inService'},
  inService: {
    fault: function(){
        if (s2.inServ.$=='active') s2.inServ.failover();
        runDiagFail(s2);  // note, 'this' does not refer to the FSM
        return 'outService'
      }
  },
  outService: {
    diagPass: 'inService'
  }
});
s1.init();
s2.init();

s1.inServ= new FSM({
  _: {init: 'active'},
  active: {
    failover: function(){
      performSwitchover(s1); // self referential
      return 'standby'
    },
    swap: 'standby'  // <-- added to force state
  },
  standby: {
    failover: function(){
      performSwitchover(s1);
      return 'active'
    },
    swap: 'active'
  }
});
s1.inServ.init();

s1.outServ= new FSM({
  _: {init: 'suspect'},
  suspect: {
    diagFail: function(){
      alertOp(s1);
      return 'failed'
    }
  },
  failed: {
    opReset: function(){
      runDiagPass(s1);
      return 'suspect'
    }
  }
});
s1.outServ.init();

s2.inServ= new FSM({
  _: {init: 'active'},
  active: {
    failover: function(){
      performSwitchover(s2);
      return 'standby'
    },
    swap: 'standby'
  },
  standby: {
    failover: function(){
      performSwitchover(s2);
      return 'active'
    },
    swap: 'active'
  }
});

s2.inServ.init();
s2.inServ.swap(); // force into standby without failover
s2.outServ= new FSM({
  _: {init: 'suspect'},
  suspect: {
    diagFail: function(){
      alertOp(s2);
      return 'failed'
    }
  },
  failed: {
    opReset: function(){
      runDiagPass(s2);
      return 'suspect'
    }
  }
});
s2.outServ.init();


function performSwitchover(srv){
  if (srv==s1)
    s2.inServ.swap();
  else
    s1.inServ.swap();
}

function runDiagPass(srv){
  console.log('running diagnostics...');
  setTimeout(function(){
    console.log('outService -> inService');
    srv.diagPass(); // <-- pass, go back to inService
  },3000);
}

function runDiagPass_thisDoes(srv){
  console.log('running diagnostics...');
  console.log('outService -> inService');
  setTimeout(srv.diagPass.bind(srv),1000);  // <-- runs correctly
}

function runDiagFail(srv){
  console.log('running diagnostics...');
  setTimeout(function(){
    console.log('suspect -> failed');
    srv.outServ.diagFail();
  },3000); // <-- triggers alertOp()
}

function reset(srv){
  console.log('failed -> suspect');
  srv.outServ.opReset();
}

function alertOp(srv){
  console.log('Diagnostics failure! Fix the problem and then run reset(s1)');
}

// use some console.assert() calls to check expected results
console.assert(s1.$=='inService');
console.assert(s1.inServ.$=='active');
console.assert(s2.inServ.$=='standby');

// simulate a fault on the active server
s1.fault(); // <-- triggers failover to s2 and runDiag on s1
//> running diagnostics...
// wait for 3 seconds while simulated diagnostics run and fail
//> suspect -> failed
//> Diagnostics failure! Fix the problem and then run reset(s1)



////////////////////////////////////////////

console.assert(s2.inServ.$=='active');
console.assert(s1.outServ.$=='failed');
console.assert(s1.$=='outService');
reset(s1); // <-- triggers runDiagPass()
//> running diagnostics...
// wait for 3 seconds while simulated diagnostics run and pass
//> outService -> inService

////////////////////////////////////////////

console.assert(s1.$=='inService');       // s1 is back in service
console.assert(s1.inServ.$=='standby');  // inService states are not affected
console.assert(s2.inServ.$=='active');   // s2 is still active

s1.inServ.failover();
console.assert(s1.inServ.$=='active');   // s1 back to active
console.assert(s2.inServ.$=='standby');  // with s2 as standby





//////////////////////////////////////////////////////////
// Game states (generic)
// http://homepage.ttu.edu.tw/jmchen/gameprog/slides/fsm-game-new.ppt
/*
State:      Trigger:  Next state:  Action:
loading     done      menu         showMenuScreen
menu        setBtn    settings     showSettingScr
menu        start     lvlStart     showLevelStartScr
settings    back      menu         showMenuScreen
lvlStart    ok        gameOn       showGameScreen

gameOn      win       lvlComplete  showLvlComplScr
gameOn      lose      gameOver     showGameOverScr
gameOn      shop      shop         showShopScr
gameOn      pause     pause        showPauseScr

pause       back      gameOn       showGameScreen
pause       restart   lvlStart     showLevelStartScr
pause       menu      menu         showMenuScreen

shop        ok        gameOn       showGameScreen
lvlComplete ok        lvlStart     showGameScreen
lvlComplete okLast    victory      showVictoryScr
victory     ok        menu         showMenuScreen

gameOver    retry     lvlStart     showLevelStartScr
gameOver    menu      menu         showMenuScreen
*/


var gameState=new FSM({
  loading: {done: 'menu'},
  menu: {
    setBtn: 'settings',
    start: 'lvlStart'
  },
  lvlStart: {ok: 'gameOn'},
  settings: {back: 'menu'},
  gameOn: {
    win: 'lvlComplete',
    lose: 'gameOver',
    shop: 'shop',
    pause: 'pause'
  },
  lvlComplete: {
    ok:'lvlStart',
    okLast: 'victory'
  },
  gameOver: {
    retry: 'lvlStart',
    menu: 'menu'
  },
  victory: {ok: 'menu'},
  shop: {ok: 'gameOn'},
  pause: {
    back: 'gameOn',
    restart: 'lvlStart',
    menu: 'menu'
  }
});



/*or alternatively (view in fullscreen):

states: loading   menu    settngs  lStart  gameOn  pause  shop   lvlCom  victory  gameOv
events:                                                                                 
done    menu                                                                            
setBtn            settngs                                                               
start             lStart                                                                
ok                        menu     gameOn                 gameOn lStart  menu           
win                                        lvlCom                                       
lose                                       gameOv                                       
shop                                       shop                                         
pause                                      pause                                        
back                                               gameOn                               
restart                                            lStart                               
menu                                               menu                           menu  
retry                                                                             lStart

*/



//////////////////////////////////////////////////////////
// States for robot
// hierarchical state study
/*
State:      Trigger:  Next state:  Action:
off         reboot    idle         showBootup
idle        move      idle         showMove
idle        locate    attack       startAttack
idle        shutdown  off          showShutdown
attack      shutdown  off          showShutdown
attack      lost      idle         showConfusion
attack      locate    attack       startAttack

substates of attack
State:      Trigger:  Next state:  Action:
_           under     _            startMelee
_           over      _            showMissile

substates of melee
State:      Trigger:  Next state:  Action:
_           smash     _            showSmash
_           punchL    _            showLeftPunch
_           punchR    _            showRightPunch

*/

// Back to miniFSM v47:
function Fsm(m){this.set=function(s){s in m&&(this.$=m[this.get=s])}} //69 bytes

var g,h,robot=new Fsm({
  off: {reboot: function(){
    robot.power= 100;
    console.log('ready',robot.power);
    robot.set('idle')
    }
  },
  idle: {
    locate: function(){
      console.log('target acquired',robot.power);
      attackInit();
      robot.set('attack')
    },
    move: function(){
      console.log('moved',robot.power);
      if (robot.power<100) robot.power+= 5;
      robot.set('idle')
    },
    shutdown:function(){
      console.log('powered down',robot.power);
      robot.set('off')
    }
  },
  attack: {
    fire: function(){
      attack();
      robot.set( robot.power<=0?'off':'attack' )
    },
    lost: function(){
      console.log('target lost',robot.power);
      robot.set('idle')
    },
    shutdown: function(){
      console.log('powered down',robot.power);
      robot.set('off')
    }
  }
});
function attackInit(){
  g= new Fsm({
    _: {
      over: function(){
        robot.power-=5;
        console.log('attack: missile',robot.power);
        g.set('_')
      },
      under: function(){
        melee();
        g.set('_')
      }
    }
  });
  g.set('_')
}
function attack(){
  if(Math.random()>0.5)g.$.over(); else g.$.under();
}
function melee(){
  h= new Fsm({
    _:{
      smash: function(){
        robot.power-=5;
        console.log('attack: smash',robot.power);
        h.set('_')
      },
      punchL: function(){
        robot.power-=5;
        console.log('attack: punchL',robot.power); 
        h.set('_')
      },
      punchR: function(){
        robot.power-=5;
        console.log('attack: punchR',robot.power); 
        h.set('_')
      }
    }
  });
  h.set('_')
  if(Math.random()<0.33333333) h.$.smash(); 
  else if (Math.random()>0.5) h.$.punchL();
    else h.$.punchR();
}

robot.set('off'); //init
robot.$.reboot()
robot.$.move()
robot.$.locate()
console.log(robot.get) //> attack
robot.$.fire()
robot.$.fire()
robot.$.fire()
robot.$.fire()
robot.$.fire()
robot.$.lost()
robot.$.move()
robot.$.move()
robot.$.shutdown()
console.log(robot.get) //> off



//////////////////////////////////////////////////////////
// Game states for a side-scrolling platform game
// http://gameprogrammingpatterns.com/state.html
/*
State:      Trigger:  Next state:  Action:
standing    bkey      jumping
standing    downkey   ducking
standing    arrow     walking
walking     arrowrel  standing
jumping     downkey   diving
ducking     downrel   standing
*/