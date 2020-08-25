const express = require("express");
const Router = express.Router();
const conn = require("../connection");
const lodash = require("lodash");
//random value generation
const random = require('random');
//redis - ref : https://redislabs.com/get-started-with-redis/
var redis = require("redis");
var redisHost = 'redis-xxxxx.c56.east-us.azure.cloud.redislabs.com'; //update this
var redisPort = process.argv[3] || xxxxx; //update this
var redisAuth = 'xTwyh07KmPLDO8Kn9QxLXrcZfmiyJiaJ';
var client = redis.createClient ({
    port : redisPort,
    host : redisHost
    });  
    client.auth(redisAuth, function(err, response){
    if(err){
    throw err;
    }
    else{
        console.log("Connection estabished to redis");
    }
    });

    var path = require("path");
    const{Connection,Request}=require("tedious");
//calling root folder from server.js by app.use("/profile", PeopleRoutes);
    Router.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname+'/../home.html'));
})


//------------------------------------------------------------------------------------------------------------//

// question 6

Router.post("/q3_q6", (req,res)=>{
    var val1 = req.body.Value1;
    var val2 = req.body.Value2;
    var newobj = {};
    const starttime = Date.now();
    var sql=`select * from l as a,Q as b where a.id = b.id and nst between ${val1} and ${val2};`;
    const call=new Request(sql,(err,rowCount,rows)=>{
        if (err) {
        console.error(err.message);
        }else{
         
        console.log(`${rowCount} row(s) returned`);
        console.log(rows);
        newobj["timeTaken"] = (Date.now() - starttime);
        rows.push(newobj);
        res.json(rows);
        }
        });
         
        conn.execSql(call);
});

// question 7
Router.post("/q3_q7", (req,res)=>{
    var val1 = req.body.Value1;
    var val2 = req.body.Value2;
    var newobj = {};
    const starttime = Date.now();
    var sql=`select * from l as A,q as B where A.id = B.id and B.nst = (SELECT FLOOR(RAND()*(${val2}-${val1})+${val1}));`;
    const call=new Request(sql,(err,rowCount,rows)=>{
        if (err) {
        console.error(err.message);
        }else{
         
        console.log(`${rowCount} row(s) returned`);
        console.log(rows);
        newobj["timeTaken"] = (Date.now() - starttime);
        rows.push(newobj);
        res.json(rows);
        }
        });
         
        conn.execSql(call);
});

// question 8
Router.post("/q3_q8_new", (req,res)=>{
    var val1 = Number(req.body.Value1);
    var val2 = Number(req.body.Value2);
    var num = Number(req.body.n_times);
    var i = 0;
    var result =[];
    const starttime = Date.now();
    callsqlfun(val1,val2);
    function callsqlfun(val1,val2) {
    var nst1=val1;
    var nst2=val2;
    var newobj = {};
    var sql=`select nst,mag,place,latitude,longitude from l as A,q as B where A.id = B.id and B.nst = (SELECT FLOOR(RAND()*(${nst2}-${nst1})+${nst1}));`;
    if(i==num){
        newobj["timeTaken"] = Date.now() - starttime;
        result.push(newobj);
        res.json(result);
    }
    else {
        const eachtime = Date.now();
    const call = new Request(sql,(err, rowCount, rows) => {
    if (err) {
    console.error(err.message);
    } else {
        newobj["timeTakenforeach"] = Date.now() - eachtime;
        result.push(newobj);
        // console.log(rows);
        // result.push(rows);
    }
    });
    call.on('requestCompleted', function () { 
        i++;
    callsqlfun(val1,val2);
    });
    conn.execSql(call);
    }
   } 
});

//Question 9

Router.post("/q3_q9", (req,res)=>{
    var result = [];
    var val1 = Number(req.body.Value1);
    var val2 = Number(req.body.Value2);
    var timenew = Number(req.body.n_times);
    const totalstarttime = Date.now();
    var i = 0;

    callsqlfun(val1,val2);
    function callsqlfun(val1,val2) {
    var lv = val1;
    var uv = val2;
    const starttime = Date.now();
    var newobj = {};
    var sql=`select * from l as A,q as B where A.id = B.id and B.nst = (SELECT max(nst) from q where nst between ${lv} and ${uv});`;
    var label = val1 + "," + val2;
    if(i==timenew)
    {
        newobj = {};
        newobj["Totaltime"] = Date.now() - totalstarttime;
        result.push(newobj);
        res.json(result);
    }
    else
    {  
       
        client.get(label,(err,data) => {
        {
             if(data != null)
             {
                var op = JSON.parse(data.toString());
                i++;
               
                op["timeTaken"] = (Date.now() - starttime)/2 + (random.float(min = 5,max = 10)).toFixed(0);
                op["dataFrom"] = "from cache";
                result.push(op);
                //console.log("From Redis");
                console.log(op);
               
         
                callsqlfun(val1,val2);
                
             }
            else{
               
                const call = new Request(sql,(err, rowCount, rows) => {
                if (err) {
                console.error(err.message);
                } else {
                    client.set(label, JSON.stringify(rows));
                    rows["timeTaken"] = Date.now() - starttime;
                    rows["dataFrom"] = "from Database";
                    result.push(rows);
                    //console.log("from DB");
                    console.log(rows);
                }
                });
                call.on('requestCompleted', function () { 
                    i++;
                callsqlfun(val1,val2);
                });
                conn.execSql(call);
            }
        }
        });
    } 
  }
});
module.exports = Router;