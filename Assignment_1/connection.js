const ibmdb = require("ibm_db");
const connStr= "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-12.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=foobar;PWD=foobar;" //Update this with your credentials
const conn = ibmdb.openSync(connStr);

module.exports = conn;
 