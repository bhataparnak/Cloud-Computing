// Question 5 quakes within about 200 KM
function get_id_quake() {
  var id = document.forms["current_id"]["id_detail"].value;
 
 
  if (id == "") {
    alert("Details must be filled out");
    return false;
  }
  
  else{
    fetch('/profile/get_id_quake', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      append_max_earthquakes(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    }); 
    return false;
  }
}


function append_max_earthquakes(data) {
  document.getElementById("myData").innerHTML = "";
  var mainContainer = document.getElementById("myData");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.style.padding = '20px';
         div.innerHTML =  "MAG is " + data[i].MAG+ "  ;PLACE is " + data[i].PLACE+ "  ;DEPTH is " + data[i].DEPTH+ "  ;DATE is " + data[i].TIME;
    mainContainer.appendChild(div);
  }
}

//Question 7 allow a user to give a part of a location name  and a distance (for example 250 km), and show the largest magnitude quake within that distance.
function get_lat_lon_val() {
  var name = document.forms["name_distance_mag"]["name_val"].value;
  if (name == "") {
    alert("Details must be filled out");
    return false;
  }
  else{
    fetch('/profile/get_lat_lon_val', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: name}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      loc_details(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    }); 
    return false;
  }
} 

//display keywords for names and creating div
function loc_details(data) {
  document.getElementById("myData").innerHTML = "";
  var div = document.createElement("div");
  div.style.padding = '20px';
  var mainContainer = document.getElementById("myData");
  div.innerHTML = "Lattitude of Entered place is   :" + data[0][1] + " Longitude of entered palce is  " + data[0][2];
  mainContainer.appendChild(div);
}

function get_max_mag() {
  var lat = document.forms["lat_lon_dist"]["lat_loc"].value;
  var long = document.forms["lat_lon_dist"]["long_loc"].value;
  var dist = document.forms["lat_lon_dist"]["dist_range"].value;
  var min_depth = document.forms["lat_lon_dist"]["min_depth"].value;
  var max_depth = document.forms["lat_lon_dist"]["max_depth"].value;
  if (lat == "" || long == "" || dist == "" || min_depth == "" || max_depth == "") {
    alert("Details must be filled out");
    return false;
  }
  else{
    fetch('/profile/get_max_mag', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({lat: lat,long: long,dist: dist,min_depth: min_depth,max_depth: max_depth}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      high_mag_details(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    }); 
    return false;
  }
} 

//display keywords for names and creating div
function high_mag_details(data) {
  document.getElementById("myData").innerHTML = "";
  var div = document.createElement("div");
  div.style.padding = '20px';
  var mainContainer = document.getElementById("myData");
  div.innerHTML = "Highest Magnitude is " + data[0].MAG + ";Place is " +data[0].PLACE+ ";LAT is "+data[0].LATITUDE+";LON is " +data[0].LONGITUDE+"; Depth is "+data[0].DEPTH+";Date is " +data[0].TIME;
  mainContainer.appendChild(div);
}

//Question 6
function quiz2_question7() {
  var loc1_lat = document.forms["loc1_loc2_val"]["loc1_lan"].value;
  var loc1_lon = document.forms["loc1_loc2_val"]["loc1_lon"].value;
  var loc2_lat = document.forms["loc1_loc2_val"]["loc2_lan"].value;
  var loc2_lon = document.forms["loc1_loc2_val"]["loc2_lon"].value;
  var range1 = document.forms["loc1_loc2_val"]["dep1_id"].value;
  var range2 = document.forms["loc1_loc2_val"]["dep2_id"].value;
  
  if (loc1_lat == "") {
    alert("Name must be filled out");
    return false;
  }
  else{
    ///First location call
    fetch('/profile/sixth_quiz_profile', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({lat1: loc1_lat,lon1: loc1_lon,lat2: loc2_lat,lon2: loc2_lon,Range1: range1,Range2: range2}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      quiz2_question7_disp(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
    return false;
}
   

function quiz2_question7_disp(data) {
  document.getElementById("myData").innerHTML = "";
  var mainContainer = document.getElementById("myData");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.style.padding = '20px';
      div.innerHTML =   "ID is "+ data[i].ID +";Latitude is "+ data[i].LATITUDE +";Longitude is "+ data[i].LONGITUDE +";Place is "+ data[i].PLACE +" Magnitute is "+ data[i].MAG + ";Time is "+ data[i].TIME;
    mainContainer.appendChild(div);
  }
}

//Question 8 Starts
function quiz8_assignment() {
  var loc1_lat = document.forms["q8_form"]["q8_lan1"].value;
  var loc1_lon = document.forms["q8_form"]["q8_lon1"].value;
  var loc2_lat = document.forms["q8_form"]["q8_lan2"].value;
  var loc2_lon = document.forms["q8_form"]["q8_lon2"].value;
  var N_id = document.forms["q8_form"]["n_id"].value;

  
  if (loc1_lat == "") {
    alert("Name must be filled out");
    return false;
  }
  else{
    ///First location call
    fetch('/profile/eight_question', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({lat1: loc1_lat,lon1: loc1_lon,lat2: loc2_lat,lon2: loc2_lon,n: N_id}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      quiz8_assignment_disp(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
    return false;
}
 

function quiz8_assignment_disp(data) {
  document.getElementById("myData").innerHTML = "";
  var mainContainer = document.getElementById("myData");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.style.padding = '20px';
      div.innerHTML =   "Latitude is "+ data[i].LATITUDE +";Longitude is "+ data[i].LONGITUDE +";Place is "+ data[i].PLACE +" Magnitute is "+ data[i].MAG + ";Time is "+ data[i].TIME+"; ID is "+ data[i].ID;
    mainContainer.appendChild(div);
  }
}

function update_details() {
   var id = document.forms["selected_name_form"]["ninth_id_n1"].value;
   var place = document.forms["selected_name_form"]["ninth_id_n2"].value;
    fetch('/profile/update_details', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Value1: id,Value2: place}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    }); 
    return false;
}

function updated_details() {
   var name_updated = document.forms["updated_det"]["name_upd"].value;
 
    fetch('/profile/updated_details', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Value1: name_updated}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      update_details_data(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    }); 
    return false;
}

function update_details_data(data) {
   document.getElementById("myData").innerHTML = "";
  var mainContainer = document.getElementById("myData");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.style.padding = '20px';
      div.innerHTML =   "Place is "+ data[i].PLACE + "; ID is "+ data[i].ID;
    mainContainer.appendChild(div);
  }
}

