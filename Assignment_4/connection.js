const{Connection,Request}=require("tedious");
 
// Create connection to database
const config={
 authentication:{
 options:{
 userName:"Your_username", //update this
 password:"Your_password", //update this

},
 type:"default"
},
 server:"Your_servername", //update this
 options:{
 database:"Your_Database", //update this
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