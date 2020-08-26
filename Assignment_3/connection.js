const{Connection,Request}=require("tedious");
 
// Create connection to database
const config={
 authentication:{
 options:{
 userName:"foobar", //update this
 password:"pwd123", //update this

},
 type:"default"
},
 server:"foobar.database.windows.net", //update this
 options:{
 database:"foobar", //update this
 encrypt:true,
 rowCollectionOnRequestCompletion:true,
 useColumnNames:true,
 multipleStatements: true,
 
}
};
 
const connection=new Connection(config);
//config.options.rowCollectionOnRequestCompletion
 
// Attempt to connect and execute queries if connection goes through
connection.on("connect",err=>{
if (err) {
console.error(err.message);
}else{
//queryDatabase();
}
});
 
//module.exports = requests;
module.exports=connection;