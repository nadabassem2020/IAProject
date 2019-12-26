const session = require('express-session');

const {PositionModel, ExamModel} = require('../models/hrModels');
const {AppReqModel} = require('../models/applicantModels');

function renderFeed (req, res, next){
    PositionModel.find({}, function(err, data){
        if(err)
             return res.status(400).send(err);
        res.status(200).render('feed', {positions:data});
    });
};

function renderPosition (req, res, next){
    AppReqModel.countDocuments({position_id:req.query.id, applicant_id: session.id}, function(err, data){
        if(data===1) // To Do not apply twise
            return res.status(200).redirect('/application_sent');
        
        PositionModel.findById(req.query.id, function (err, data){
            if (err)
                return res.status(400).send(err);
            return res.render('position', {position:data});
        });
    });
};

function uploadCV(req, res) {
    let newAppReq = AppReqModel(req.body);
    newAppReq.save(function(err){
        if(err)
            res.status(400).send(err);
        
        var file = req.files.applicant_cv,
            filename = req.body.applicant_id;
        file.mv("./public/uploads/" + filename + ".pdf", function(err){
            if(err)
                res.status(400).send(err)
            res.status(200).redirect('/application_sent');  
        }); 
    });
};

function renderReqExams(req, res){
    ExamModel.findById(req.query.id, function(err, data){
        if (err)
            return res.status(400).send(err);
        if(session.id !== data.applicant_id)
            return res.status(200).redirect('feed');
        return res.status(200).render('applicant-exams', {exam:data});
    });
}

function renderExam(req, res){
    ExamModel.findById(req.query.id, function(err, data){
        if (err)
            return res.status(400).send(err);
        if(session.id !== data.applicant_id)
            return res.status(200).redirect('feed');
        
        return res.status(200).render('applicant-exam', {exam:data, type: req.query.type});
    });
}

module.exports  = {renderFeed, renderPosition, uploadCV, renderReqExams, renderExam};
