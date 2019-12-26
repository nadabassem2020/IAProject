const {QuestionModel, TypeModel} = require('../models/hrModels');

function renderQuestions(req, res){
    TypeModel.find({}, function(err, data){
        if(err)            
            return res.status(400).send(err)
        QuestionModel.find({}, function(err, quests){
            if(err)            
                return res.status(400).send(err)
            return res.status(200).render('all-questions', {quests:quests,types:data});  
        })
    });
}

function addNewQuestion (req, res){
    let newQuest= QuestionModel(req.body);
    newQuest.save(function(err, question){
        if(err)
            return res.status(400).send(err)
        res.status(200).redirect('/all-questions');
    });
}

function viewQuestion (req, res){
    TypeModel.find({}, function(err, data){
        if(err)            
            return res.status(400).send(err)
        QuestionModel.findById(req.query.id, function(err, quest){
            if(err)            
                return res.status(400).send(err)
            return res.status(200).render('question-view', {question:quest, types:data});
        });
    });
}

function deleteQuestion (req, res){
    QuestionModel.deleteOne({_id:req.query.id}, function(err, data){
        if(err)            
            return res.status(400).send(err)
        return res.status(200).redirect('/all-questions');
    });
}

function editQuestion (req, res){
    QuestionModel.findByIdAndUpdate(req.body.id, req.body, function(err, question){
        if(err)
            return res.status(400).send(err)
        res.status(200).redirect('/all-questions');
    });
}

module.exports = { renderQuestions, addNewQuestion, deleteQuestion, viewQuestion, editQuestion };
