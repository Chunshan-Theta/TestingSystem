module.exports = function (){
    


    this.controller = function (CallbackFunc){
        var sql = require('../Model/MysqlSet.js');
        
        var Exam = {"ExamID":"1","Questions":[]};

        connection = new sql('test');
        connection.query("SELECT `Question`.`QuestionID` FROM `Question` WHERE `ExamBankID`=1 ;",function(returnValue) {      
            var re_QuestionList = returnValue;
            for(var i = 0;i<re_QuestionList["return"].length;i++){
                var QuestionID = re_QuestionList["return"][i]["QuestionID"];
                Exam["Questions"].push({"QuestionID":QuestionID,"Intros":[],"SubQuestions":[]});
            }
            
            connection_Intro = new sql('test');
            connection_Intro.query("SELECT `Question`.`QuestionID`,`IntroQuestion`.`IntroID`,`IntroQuestion`.`PicUrl` FROM `IntroQuestion`,`Question` WHERE `ExamBankID`=1 AND `IntroQuestion`.`QuestionID` = `Question`.`QuestionID`",function(returnValue_intro) {      
                var re_IntroList = returnValue_intro;
                console.log(re_IntroList);
                for(var i = 0;i<Exam["Questions"].length;i++){
                    var i_QuestionID = Exam["Questions"][i]["QuestionID"];
                    for(var j = 0;j<re_IntroList["return"].length;j++){
                        var IntroID = re_IntroList["return"][j]["IntroID"];
                        var PicUrl = re_IntroList["return"][j]["PicUrl"];
                        var QuestionID = re_IntroList["return"][j]["QuestionID"];
                        if(i_QuestionID == QuestionID){
                            Exam["Questions"][i]["Intros"].push({"IntroID":IntroID,"IntroPicUrl":PicUrl});                            
                        }
                    }                    
                }

                connection_SubQuestion = new sql('test');
                connection_SubQuestion.query("SELECT `Question`.`QuestionID`,`SubQuestion`.`SubQuestionID`,`SubQuestion`.`PicUrl` FROM `SubQuestion`,`Question` WHERE `ExamBankID`=1 AND `SubQuestion`.`QuestionID` = `Question`.`QuestionID`;",function(returnValue_SubQuestion) {      
                    re_SubQuestion = returnValue_SubQuestion;
                    
                    for(var i = 0;i<Exam["Questions"].length;i++){
                        var i_QuestionID = Exam["Questions"][i]["QuestionID"];
                        for(var j = 0;j<re_SubQuestion["return"].length;j++){
                            var QuestionID = re_SubQuestion["return"][j]["QuestionID"];
                            var PicUrl = re_SubQuestion["return"][j]["PicUrl"];
                            var SubQuestionID = re_SubQuestion["return"][j]["SubQuestionID"];
                            if(i_QuestionID == QuestionID){
                                Exam["Questions"][i]["SubQuestions"].push({"SubQuestionID":SubQuestionID,"SubQuestionPicUrl":PicUrl,"Options":[]});
                  
                            }
                        }
                       
                    }
                    connection_Option = new sql('test');
                    connection_Option.query("SELECT `OptionSubQuestion`.* FROM `SubQuestion`,`Question`,`OptionSubQuestion` WHERE `ExamBankID`=1 AND `SubQuestion`.`QuestionID` = `Question`.`QuestionID` AND `SubQuestion`.`SubQuestionID` = `OptionSubQuestion`.`SubQuestionID`",function(returnValue_Option) {      
                        re_Option = returnValue_Option ;
                        for(var i = 0;i<Exam["Questions"].length;i++){
                            for(var j = 0;j<Exam["Questions"][i]["SubQuestions"].length;j++){
                                var j_SubQuestionID = Exam["Questions"][i]["SubQuestions"][j]["SubQuestionID"];
                                console.log(j_SubQuestionID);

                                for(var k = 0;k<re_Option["return"].length;k++){
                                    var OptionID = re_Option["return"][k]["OptionID"];
                                    var PicUrl = re_Option["return"][k]["PicUrl"];
                                    var correct = re_Option["return"][k]["correct"];
                                    var SubQuestionID = re_Option["return"][k]["SubQuestionID"];
                                    if(j_SubQuestionID == SubQuestionID){
                                        Exam["Questions"][i]["SubQuestions"][j]["Options"].push({"OptionID":OptionID,"correct":correct,"OptionUrl":PicUrl});
                          
                                    }
                                }


                            }                           
                        }


                        console.log(Exam);
                        CallbackFunc(Exam);
                        
                    });
                      
                });
             

            });                      
        });
        

        

        

        


        
    } 


}


