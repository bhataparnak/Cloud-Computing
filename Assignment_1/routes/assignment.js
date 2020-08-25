//Question 7
function emp_details_box() {
  var key = document.forms["emp_details_form"]["emp_name"].value;
  
    fetch('/profile/emp_details', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Value1: key}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      name_disp(data);
    })
    .catch((error) => {
      console.error('Error:', error);
      if (error) {
        document.getElementById('myData').innerHTML = "no picture available"
      }
    }); 
    return false;
}

function name_disp(data) {
  document.getElementById("myData").innerHTML = "";
  var mainContainer = document.getElementById("myData");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.style.padding = '20px';
    var img = document.createElement('img'); 
    var img_url = "/images/" + data[i].PICTURE;
    img.src =  img_url;
    img.style.height = '100px';
    img.style.width = '100px';
         div.innerHTML =  "Description is "+data[i].DESCRIPTION +"";
         div.appendChild(img);
    mainContainer.appendChild(div);
  }
}

// Question 6
function emp_id_details() {
  var id = document.forms["selected_id_form"]["emp_id"].value;
  
    fetch('/profile/selected_id', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Value1: id}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      id_disp_data(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    }); 
    return false;
}

function id_disp_data(data) {
  document.getElementById("myData").innerHTML = "";
  var mainContainer = document.getElementById("myData");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.style.padding = '20px';
    var img = document.createElement('img'); 
    var img_url = "/images/" + data[i].PICTURE;
    img.src =  img_url;
    img.style.height = '100px';
    img.style.width = '100px';
    if(data[i].PICTURE=="null"){
       div.innerHTML =  "no picture"
    }
         div.innerHTML =  "year is "+data[i].YEAR;
         div.appendChild(img);
    mainContainer.appendChild(div);
  }
}

// Question 8

function update_details() {
   var name = document.forms["selected_name_form"]["name_cap"].value;
   var caption = document.forms["selected_name_form"]["cap_msg"].value;
    fetch('/profile/update_details', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Value1: name,Value2: caption}),
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
    var img = document.createElement('img'); 
    var img_url = "/images/" + data[i].PICTURE;
    img.src =  img_url;
    img.style.height = '100px';
    img.style.width = '100px';
         div.innerHTML =  "Name is "+data[i].PERSON +"  and Caption is "+data[i].DESCRIPTION;
         div.appendChild(img);
    mainContainer.appendChild(div);
  }
}

// Question 9
function ninth_replace() {
  var id1 = document.forms["ninth_from_replace"]["ninth_id_n1"].value;
  var id2 = document.forms["ninth_from_replace"]["ninth_id_n2"].value;
  
    fetch('/profile/ninth_replace', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Value1: id1,Value2: id2}),
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


function ninth_remove() {
  var id = document.forms["ninth_from"]["ninth_id_remove"].value;
  
    fetch('/profile/ninth_remove', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Value1: id}),
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