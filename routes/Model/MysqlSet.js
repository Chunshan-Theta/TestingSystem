console.log("Model of Get MySQL connection");





var mysql = require('mysql');





module.exports = function (db){
    /*
    // connect to MySQL
    // need lib : require('mysql')
    // using :
        sql = require('./MysqlSet.js');
        connection = new sql('argument');
        connection.query("SELECT * FROM `QuestionDoc`",function(returnValue) {      
            this.QuestionDoc = returnValue;
        })
    // coding: gavin
    */

    var host = "localhost";
    var user = "root";
    var password =  "root";

    var connection = mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: db
    });

    connection.connect();
    this.query = function(Sql,callback){
        
        connection.query(Sql, function (err, result, fields) {
            console.log(Sql);
            //console.log("Mysql connect state:",connection.state);
            if (err){
                console.log(err);
                callback({"text":err['code'],"status":err['errno']})
            }
            else{
                callback({'text':"success",'status':"200",'return':result});
            }
            close();
        });    
    }
    function close(){
        try{
            connection.end(function(err) {
              // The connection is terminated now
              console.log("1: The connection is terminated now");
            });

        }
        catch(e){
            setTimeout(function(){

                try{
                    connection.end(function(err) {
                      // The connection is terminated now
                      console.log("2: The connection is terminated now");
                    });
                } 
                catch(e){
                    console.log(e,"Mysql connect is timeout, destroy the connection.");                   
                    connection.destroy();
                    console.log("Mysql connect state:",connection.state);            
                }            
            
            }, 3000);
        }

        
    };    
    

}

/*
var con = mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: DB
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM `QuestionDoc`", function (err, result, fields) {
    if (err) throw err;
    console.log(result[0]['QuestionContent']);
  });
});


result =
[ RowDataPacket { QuestionId: 1, QuestionContent: 'Question test 1' },
  RowDataPacket { QuestionId: 2, QuestionContent: 'Question test 2' } ]

result[0] =
RowDataPacket { QuestionId: 1, QuestionContent: 'Question test 1' }

result[0]['Question test 1'] =
Question test 1

*/


/*
exports.do_a = function(){
  // do something ...
};
*/

