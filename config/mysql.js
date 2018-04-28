var mysql = require('mysql')
var db_config = {
  host     : 'sg2plcpnl0084.prod.sin2.secureserver.net',
  port     : '3306',
  user     : 'jianingwang',
  password : '000000',
  database : 'todoDB'
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } else {                              // to avoid a hot loop, and to allow our node script to
      console.log('DB connected!');       // process asynchronous requests in the meantime.
    }                                     // If you're also serving http, display a 503 error.
                                       
  });                                     
                                          
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();
module.exports = connection;