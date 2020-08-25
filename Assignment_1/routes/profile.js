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

// Question 7
Router.post("/emp_details", (req,res)=>{
    var key = req.body.Value1;
    
    conn.query(`select * from people where Description like'%${key}%'`, (err, rows, fields)=>{
    console.log(rows);
        if (!err) { 
            console.log(rows);     
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

// Question 6
Router.post("/selected_id", (req,res)=>{
    var name = req.body.Value1;
    conn.query(`select * from people where Person='${name}'`, (err, rows, fields)=>{
    console.log(rows);
        if (!err) { 
            console.log(rows);     
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

// Question 8
Router.post("/update_details", (req,res)=>{
    var name = req.body.Value1;
    var upd_cap = req.body.Value2;
    console.log(name);
    console.log(upd_cap);
    conn.query(`update people set Description='${upd_cap}' where Person='${name}'`, (err, rows, fields)=>{
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
    var name = req.body.Value1;
    console.log(name);
    conn.query(`select * from people where Person='${name}'`, (err, rows, fields)=>{
    console.log(rows);
        if (!err) { 
            console.log(rows);     
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

// Question 9
Router.post("/ninth_replace", (req,res)=>{
    var name1 = req.body.Value1;
    var name2 = req.body.Value2;
    
    conn.query(`update people set person = '${name2}' where person = '${name1}';`, (err, rows, fields)=>{
    console.log(rows);
        if (!err) { 
            console.log(rows);     
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

Router.post("/ninth_remove", (req,res)=>{
    var name = req.body.Value1;
    
    conn.query(`delete from people where person = '${name}'`, (err, rows, fields)=>{
    console.log(rows);
        if (!err) { 
            console.log(rows);     
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

module.exports = Router;

