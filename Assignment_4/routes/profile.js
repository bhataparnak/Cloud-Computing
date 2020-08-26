const express = require("express");
const Router = express.Router();
const conn = require("../connection");
const lodash = require("lodash");
//random value generation
const random = require('random');


    var path = require("path");
    const{Connection,Request}=require("tedious");
const { result } = require("lodash");
//calling root folder from server.js by app.use("/profile", PeopleRoutes);
    Router.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname+'/../home.html'));
})


//Question 1

Router.post("/bar_example_quiz", (req,res)=>{
    var fir = req.body.First;
    var sql=`select * from volcano where Country = '${fir}';`;
    const call=new Request(sql,(err,rowCount,rows)=>{
        if (err) {
        console.error(err.message);
        }else{
         
        console.log(`${rowCount} row(s) returned`);
        console.log(rows);
        res.send(rows);
        }
    });
         
        conn.execSql(call);
});


//Question 2

Router.post("/example_graph", (req,res)=>{
    var fir = req.body.First;//1980
    var sec = req.body.Second;//2012
    var sql=`select number,elev from volcano where Number between ${fir} and ${sec};`;
    const call=new Request(sql,(err,rowCount,rows)=>{
        if (err) {
        console.error(err.message);
        }else{
         
        console.log(`${rowCount} row(s) returned`);
        console.log(rows);
        res.json(rows);
        }
        });
         
        conn.execSql(call);
});

module.exports = Router;
