// PREPARATION
var tol = 60; // tolerance in seconds
var map;
// Define three starting points A, B, and C
// Try some other locations!
var A = {lat:47.6718336, lng:-122.1266052}, // Redmond, WA
    B = {lat:47.6759564, lng:-122.2139907}, // Kirkland, WA
    C = {lat:47.6104641, lng:-122.2028265}, // Bellevue, WA
    D = {lat:0, lng:0}; // midpoint to be determined
// Determine a candidate location for D
// Average the x coordinates and the y coordinates.
D.lat = (A.lat + B.lat + C.lat)/3;
D.lng = (A.lng + B.lng + C.lng)/3; 

var origins = [A, B, C];
var destination = [D];
var directionsDisplay;
var directionsService;

// Linear interpolation
function lerp(v0, v1, t) {
  return (1-t)*v0 + t*v1;
}

// EXECUTION
function calculateDistances() {
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix({
    origins: origins, //array of origins 
    destinations: destination, // the single destination
    travelMode: google.maps.TravelMode.DRIVING,
    // If Premium Plan customer, set departure time,
    // to obtain the duration_in_traffic value
    //drivingOptions: {departureTime: new Date(2018, 11, 24, 10, 33, 30, 0)},
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, callback);
}

function callback(response, status) {
  if (status != google.maps.DistanceMatrixStatus.OK) {
    alert('Error was: ' + status);
  } else {
    var maxN = 0, n=[];
    // If Premium Plan customer,
    // these can be changed to "duration_in_traffic" 
    n[0] = response.rows[0].elements[0].duration.value;
    n[1] = response.rows[1].elements[0].duration.value;
    n[2] = response.rows[2].elements[0].duration.value;  
    var resText = "from A:"+n[0] + "s, B:" + n[1] + "s, C:" + n[2] + "s";
    // Determine and display the longest route
    if (n[0]>n[1] && n[0]>n[2])
      displayRoute(origins[0], destination[0]);
    if (n[1]>n[0] && n[1]>n[2]) {
      displayRoute(origins[1], destination[0]);
      maxN = 1;
    }
    if (n[2]>n[1] && n[2]>n[0]){
      displayRoute(origins[2], destination[0]);
      maxN = 2;
    }

    // Log candidate midpoints to the console
    console.log(resText);

    // Are the durations within tolerance of each other?
    if (Math.abs(n[0]-n[1])<tol && 
        Math.abs(n[1]-n[2])<tol &&
        Math.abs(n[0]-n[2])<tol) {
      // If so, we are done!
      resText = "<b>Final durations:</b><br> " + resText;
      results.innerHTML = resText;
      // Display the acceptable midpoint
      dest.innerHTML = "<b>Acceptable midpoint D:</b><br>" + destination[0].lat+","+destination[0].lng+"<br><br><b>Note:</b><br>On the Google map above, the red pin labeled 'A' is one of the starting points (the longest duration in the list above) and the red pin labeled 'B' is the acceptable midpoint (called D in the code). Trial midpoints are logged to the console.";
    }
    else { // Minimize the longest duration
      // First, find the average duration
      let avg = (n[0]+n[1]+n[2])/3;
      // Divide the average by longest travel time
      let p = avg / n[maxN];
      // Compute a new point E between Q and D based on percentage p
      // E = p(D - Q) + Q
      // D = E
      destination[0].lat = lerp(origins[maxN].lat,destination[0].lat,p);
      destination[0].lng = lerp(origins[maxN].lng,destination[0].lng,p);
      // Cycle again, waiting a bit to prevent server overload
      setTimeout(calculateDistances, 500+Math.random()*100);
    }
  }
}

//Display the route.
function displayRoute(start, end) {
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  var center = new google.maps.LatLng(destination[0].lat, destination[0].lng);
  geomean.innerHTML = "<b>Geomean:</b><br> " + destination[0].lat+","+destination[0].lng + "<br>";
  var options = {
    zoom: 12,
    center: center,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(dispmap, options);
  geocoder = new google.maps.Geocoder();
  directionsDisplay.setMap(map);
  calculateDistances();
}