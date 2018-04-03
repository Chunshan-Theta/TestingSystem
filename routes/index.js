var express = require('express');
var router = express.Router();






/* GET argument page. */
router.get('/', function(req, res) {

    var controller_of_argument = require('./Controller/ShowExam.js');
    c = new controller_of_argument();


    c.controller(function(QuestionList){

        console.log(QuestionList);
        
        
        res.render('index',{'wdata':JSON.stringify(QuestionList)});
    });
    
    
});



module.exports = router;
