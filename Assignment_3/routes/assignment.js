
//Question 6
function question6_assignment() {
  var num1 = document.forms["q6_form"]["q61"].value;
  var num2 = document.forms["q6_form"]["q62"].value;
  if (num1 == "" || num2 == "") {
    alert("Name must be filled out");
    return false;
  }
  else{
    fetch('/profile/q3_q6', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Value1: num1,Value2: num2}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      question6_display(data);
    })
    .catch((error) => {
      console.log('Error:', error);
    }); 
    return false;
  }
}

function question6_display(data) {
  document.getElementById("myData").innerHTML = "";
  var mainContainer = document.getElementById("myData");
  var div = document.createElement("div");
  div.style.padding = '20px';
  mainContainer.appendChild(div)
  // added to display time taken
  for (var i = 0; i < data.length-1; i++) {
    var div = document.createElement("div");
    div.style.padding = '20px';
    div.innerHTML =  "nst is " + data[i].nst.value + "  ;latitude is " + data[i].latitude.value+ "  ;Longitude is " + data[i].longitude.value+ "  ;place is " + data[i].place.value+ "  ;mag is " + data[i].mag.value+ "  ;id is " + data[i].id.value;
    mainContainer.appendChild(div);
  }
}

//Question 7

function question7_assignment() {
  var nst1 = document.forms["q7_form"]["q71"].value;
  var nst2 = document.forms["q7_form"]["q72"].value;
  if (nst1 == "" || nst2== "") {
    alert("Name must be filled out");
    return false;
  }
  else{
    fetch('/profile/q3_q7', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Value1: nst1,Value2: nst2}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      question7_display(data);
    })
    .catch((error) => {
      console.log('Error:', error);
    }); 
    return false;
  }
}

function question7_display(data) {
  document.getElementById("myData").innerHTML = "";
  var mainContainer = document.getElementById("myData");
  //added to display time taken
  var div = document.createElement("div");
  div.style.padding = '20px';
  div.innerHTML = "Time taken is " + data[data.length-1].timeTaken + " ms";
  mainContainer.appendChild(div)
  // added to display time taken
  for (var i = 0; i < data.length-1; i++) {
    var div = document.createElement("div");
    div.style.padding = '20px';
    div.innerHTML =  "nst is " + data[i].nst.value + "  ;latitude is " + data[i].latitude.value+ "  ;Longitude is " + data[i].longitude.value+ "  ;place is " + data[i].place.value+ "  ;mag is " + data[i].mag.value+ "  ;id is " + data[i].id.value;
    mainContainer.appendChild(div);
  }
}

//Question 8

function question8_assignment() {
  var nst1 = document.forms["q8_form"]["q81"].value;
  var nst2 = document.forms["q8_form"]["q82"].value;
  var num = document.forms["q8_form"]["q83"].value;
  if (nst1 == "" || nst2 == "" || num == "") {
    alert("Name must be filled out");
    return false;
  }
  else{
    fetch('/profile/q3_q8_new', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Value1: nst1,Value2: nst2,n_times: num}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      question8_display(data);
    })
    .catch((error) => {
      console.log('Error:', error);
    }); 
    return false;
  }
}

function question8_display(data) {
  document.getElementById("myData").innerHTML = "";
  var mainContainer = document.getElementById("myData");
  //added to display time taken
  var div = document.createElement("div");
  div.style.padding = '20px';
  div.innerHTML = "Time taken is " + data[data.length-1].timeTaken + " ms";
  mainContainer.appendChild(div)
  // added to display time taken
  for (var i = 0; i < data.length-1; i++) {
    var div = document.createElement("div");
    div.style.padding = '20px';
    div.innerHTML =  "time Taken for "+ (i+1) +" is " + data[i].timeTakenforeach;
    mainContainer.appendChild(div);
  }
}

//Question 9

function question9_assignment() {
  var nst1 = document.forms["q9_form"]["q91"].value;
  var nst2 = document.forms["q9_form"]["q92"].value;
  var num = document.forms["q9_form"]["q93"].value;
  if (nst1 == "" || nst2 == "" || num == "") {
    alert("Name must be filled out");
    return false;
  }
  else{
    fetch('/profile/q3_q9', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Value1: nst1,Value2: nst2,n_times: num}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      question9_display(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    }); 
    return false;
  }
}

//display keywords for names and creating div
function question9_display(data) {
  document.getElementById("myData").innerHTML = "";
  var mainContainer = document.getElementById("myData");
  var div = document.createElement("div");
  div.style.padding = '20px';
  div.innerHTML = "Total time taken is "+ data[data.length-1].Totaltime + " ms";
  mainContainer.appendChild(div)
   for (var i = 0; i < data.length-1; i++) {
    var div = document.createElement("div");
    div.style.padding = '20px';
    div.innerHTML =  "time Taken for "+ (i+1) +" is " + data[i].timeTaken;
    mainContainer.appendChild(div);
  }
}
