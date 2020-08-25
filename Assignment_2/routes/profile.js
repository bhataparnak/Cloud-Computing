const express = require("express");
const Router = express.Router();
const conn = require("../connection");

var path = require("path");
const { response } = require("express");
const { endTransaction } = require("../connection");


//calling root folder from server.js by app.use("/profile", PeopleRoutes);
Router.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname+'/../index.html'));
})
// -----------------------------------------------------------------------------------------

//Question 5 please show the total number of earthquakes ("quakes") fix this got 70/100----done ready to re-submit

Router.post("/get_id_quake", (req,res)=>{
    var id = req.body.id;
    conn.query(`SELECT latitude,longitude,place,q.time,q.mag,q.depth FROM q , i where q.id = i.id and q.id= '${id}'
        UNION ALL SELECT latitude,longitude,place,q.time,q.mag,q.depth FROM q , i where q.id = i.id and q.mag 
        between ((SELECT q.mag FROM q , i where q.id = i.id and q.id= '${id}')-(0.1)) 
        and ((SELECT q.mag FROM q , i where q.id = i.id and q.id= '${id}')+(0.1));`, (err, rows, fields)=>{
    if (!err) {
        console.log(rows);
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

// Question7 allow a user to give a part of a location name (for example "Mina" or "Nevada") 
// and a distance (for example 250 km), and show the largest magnitude quake (if one exists),
// within that distance.Please display the lat, long, mag, place, depth and date. (Fix this got 50/100)----done ready to re-submit

Router.post("/get_lat_lon_val", (req,res)=>{
    var name = req.body.name;
    //var distance = req.body.distance;
    conn.query(`select max(latitude),max(longitude) from i where place like '%${name}%';`, (err, rows, fields)=>{
    if (!err) {
        console.log(rows);
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

Router.post("/get_max_mag", (req,res)=>{
    var lat = req.body.lat;
    var long = req.body.long;
    var dist = req.body.dist;
    var min_depth = req.body.min_depth;
    var max_depth = req.body.min_depth;
    conn.query(`select * from q,i where  q.id = i.id and (depth between ${min_depth} and ${max_depth}) and 
        ((6371*acos(cos(radians(${lat}))* cos(radians(latitude))* cos(radians(longitude) - radians(${long}))+ sin(radians(${lat}))*sin(radians(latitude)))) < ${dist});`, (err, rows, fields)=>{
    if (!err) {
        console.log(rows);
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

//Question 6 GIVE LOCATIOIN 1 and LOCATION 2 DETAILS AND Value V
Router.post("/sixth_quiz_profile", (req,res)=>{
    var loc_lat1 = req.body.lat1;
    var loc_lon1 = req.body.lon1;
    var loc_lat2 = req.body.lat2;
    var loc_lon2 = req.body.lon2;
    var ran1 = req.body.Range1;
    var ran2 = req.body.Range2;
    conn.query(`select * from I as a,Q as b where a.ID=b.ID and latitude between ${loc_lat1} and ${loc_lat2} and longitude between ${loc_lon1} and ${loc_lon2} and depth between ${ran1} and ${ran2} order by mag desc limit 3;`, (err, rows, fields)=>{
        if (!err) {
            console.log(rows);
            //res.send(rows);
                res.json(rows);
            } else {
                console.log(err);
            }
    })
})

// Question 8 not yet graded and submitted 
Router.post("/eight_question", (req,res)=>{
    var loc_lat1 = req.body.lat1;
    var loc_lon1 = req.body.lon1;
    var loc_lat2 = req.body.lat2;
    var loc_lon2 = req.body.lon2;
    var N = req.body.n;
    conn.query(`select * from I as a,Q as b where a.ID=b.ID and latitude between ${loc_lat1} and ${loc_lat2} and longitude between ${loc_lon1} and ${loc_lon2} order by mag desc limit ${N};`, (err, rows, fields)=>{
        if (!err) {
            console.log(rows);
                res.json(rows);
            } else {
                console.log(err);
            }
    })
})

Router.post("/update_details", (req,res)=>{
    var id = req.body.Value1;
    var upd_cap = req.body.Value2;
    conn.query(`update i set place='${upd_cap}' where id='${id}'`, (err, rows, fields)=>{
    console.log(rows);
        if (!err) { 
            console.log(rows);     
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

Router.post("/updated_details", (req,res)=>{
    var id = req.body.Value1;
    conn.query(`select * from i where id='${id}'`, (err, rows, fields)=>{
    console.log(rows);
        if (!err) { 
            console.log(rows);     
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

//Question 9 

Router.post("/get_lat_lon_val_bonus", (req,res)=>{
    var name = req.body.name;
    //var distance = req.body.distance;
    conn.query(`select latitude,longitude,place from i where place like '%${name}%';`, (err, rows, fields)=>{
    if (!err) {
        console.log(rows);
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

Router.post("/get_depth_quiz", (req,res)=>{
    var lat1 = req.body.lat1;
    var long1 = req.body.long1;
    var lat2 = req.body.lat2;
    var long2 = req.body.long2;
    var min_depth = req.body.min_depth;
    var max_depth = req.body.min_depth;
    conn.query(`select * from I as a,Q as b where a.ID=b.ID and latitude between ${lat1} and ${lat2} and longitude between ${long1} and ${long2};`, (err, rows, fields)=>{
    if (!err) {
        console.log(rows);
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})
module.exports = Router;
