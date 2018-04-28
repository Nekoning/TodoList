var express = require('express');
var router = express.Router();
var connection = require('../../../config/mysql');

// (Create) Add to-do item
router.post('/todoitem', function(req, res) {
  var item = [req.body.todoitem];
  console.log("req body: " + item);
  var query = connection.query('INSERT INTO todoTable SET todoitem = ?', item, function (error, results, fields) {
    // connection.end();
    if (error) throw error;
    else {
      console.log(results.insertId);
      res.send("Created successfully!");
      return;
    }
    // Neat!
  });
  // console.log(query.sql);
});

// (Read) Viewing to-do lists
router.get("/todolist",function(req,res){
  connection.query('SELECT * FROM todoTable', function(err, rows, fields) {
    
    if (!err)
      return res.json(rows);
    else
      console.log('Error while performing Query.');
  });
});

// (Update) Selete to-do item
router.put('/todoitem', function(req, res) {
  console.log("req: " + req);
  var id = req.body.ID;
  var isDone = req.body.isDone;
  var post = [isDone, id];
  var query = connection.query('UPDATE todoTable SET isDone = ? WHERE ID = ?', post, function (error, results, fields) {
    if (error) throw error;
    else res.send("Updated successfully!");
    // Neat!
  });
  console.log(query.sql);
});

// (Delete) Delete to-do item
router.delete('/todoitem', function(req, res) {
  var id = [req.body.ID];
  var query = connection.query('DELETE FROM todoTable WHERE ID = ?', id, function (error, results, fields) {
    if (error) throw error;
    else res.send("Deleted successfully!");
    // Neat!
  });
  console.log(query.sql);
});

// (Delete) Delete all completed items
router.delete('/completeditem', function(req, res) {
  var query = connection.query('DELETE FROM todoTable WHERE isDone = false', function (error, results, fields) {
    if (error) throw error;
    else res.send("Deleted successfully!");
    // Neat!
  });
  console.log(query.sql);
});

// (Update) Selete all completed items
router.put('/completeditem', function(req, res) {
  var isAllCheck = [req.body.isAllCheck];
  var query = connection.query('UPDATE todoTable SET isDone = ?', isAllCheck, function (error, results, fields) {
    if (error) throw error;
    else res.send("Updated All completed item successfully!");
    // Neat!
  });
  console.log(query.sql);
});

module.exports = router;