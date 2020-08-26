const ibmdb = require("ibm_db");
 

const connStr= "DATABASE=BLUDB;HOSTNAME=Your_hostname;PORT=50000;PROTOCOL=TCPIP;UID=Foobar;PWD=foobar" //Update this with your dns credentials
const conn = ibmdb.openSync(connStr);

module.exports = conn;
 
