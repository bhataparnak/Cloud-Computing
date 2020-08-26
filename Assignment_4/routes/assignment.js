//Question 1

function example_bar_quiz() {
  var fir = document.forms["barForm"]["pieIdFir"].value;
 // var sec = document.forms["barForm"]["barIdSec"].value;
 fetch('/profile/bar_example_quiz', {
   method: 'POST', // or 'PUT'
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({First: fir}),
 })
 .then(response => response.json())
 .then(data => {
   console.log('Success:', data);
   example_bar_disp(data);
 })
 .catch((error) => {
   console.error('Error:', error);
 });
 return false;
}

function example_bar_disp(data1) {  
  document.getElementById("output_div").innerHTML = "";
  document.getElementById("container").innerHTML = "";
 var result =[];
 for(var i=0;i<data1.length;i++)
 {
 var data_final =[];
 data_final[0] = data1[i].Volcano_Name.value;
// data_final["x"] = integer1;
 var integer = parseInt(data1[i].Elev.value, 10);
 data_final[1] = integer;
 result.push(data_final);
 }
 console.log(result);
 Highcharts.chart('container', {
   chart: {
       type: 'column'
   },
   title: {
       text: 'Bar chart'
   },
   xAxis: {
       type: 'category',
       labels: {
           rotation: -45,
           style: {
               fontSize: '13px',
               fontFamily: 'Verdana, sans-serif'
           }
       }
   },
   yAxis: {
       min: 0,
       title: {
           text: 'Elev'
       }
   },
   legend: {
       enabled: false
   },
   plotOptions: {
      series: {
          dataLabels: {
              enabled: false
          }
      }
  },
  series: [{
       name: 'Elevation',
       data: result,
  }]
  });
}


//Question 2

function example_scatter() {
   var fir = document.forms["scatterForm"]["scatIdFir"].value;
   var sec = document.forms["scatterForm"]["scatIdSec"].value;
   fetch('/profile/example_graph', {
     method: 'POST', // or 'PUT'
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({First: fir,Second: sec}),
   })
   .then(response => response.json())
   .then(data => {
     console.log('Success:', data);
     example_scatter_disp(data);
   })
   .catch((error) => {
     console.error('Error:', error);
   }); 
   return false;
}

function example_scatter_disp(data1) {
  // console.log("Hello *******************");
   document.getElementById("output_div").innerHTML = "";
   document.getElementById("container").innerHTML = "";
   var result =[];
 for(var i=0;i<data1.length;i++)
 {
var data_final ={};
data_final["x"] = data1[i].number.value;
var integer = parseInt(data1[i].elev.value, 10);
 data_final["y"] = integer;
 result.push(data_final);
 }
 console.log(result);

 $(document).ready(function() {
   var chart = {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
   };
   var title = {
      text: 'Data in scatter chart'   
   };
   var tooltip = {
      pointFormat: '{point.x}: <b>{point.y}</b>'
   };
   
   var plotOptions = {
      pie: {
         allowPointSelect: true,
         cursor: 'pointer',
         
         dataLabels: {         
            enabled: true,
           format: '<b>{point.x}</b>: {point.y} ',
            style: {
               color: (Highcharts.theme && Highcharts.theme.contrastTextColor)||
               'black'
            }
         }
      }
   };
   
   var series = [{
      type: 'scatter',
      name: 'Scatter view',
      colorByPoint:true,
      data: result
   }];
   var json = {};   
   json.chart = chart; 
   json.title = title;     
   json.tooltip = tooltip;  
   json.series = series;
   json.plotOptions = plotOptions;
   $('#container').highcharts(json);  
});
}









