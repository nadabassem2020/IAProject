const nodemailer = require('nodemailer');

const {QuestionModel, TypeModel, PositionModel, ExamModel} = require('../models/hrModels');
const {AppReqModel} = require('../models/applicantModels');

function renderPositions(req, res){
    PositionModel.find({}, function(err, data){
        if(err)            
            return res.status(400).send(err)
        return res.status(200).render('available-positions', {positions:data});  
    });
}

function addNewPosition (req, res){
    let newPosition= PositionModel(req.body);
    newPosition.save(function(err, question){
        if(err)
            return res.status(400).send(err)
        return res.status(200).redirect('/available-positions');
    });
}

function deletePosition (req, res){
    PositionModel.deleteOne({_id:req.params.id}, function(err, data){
        if(err)            
            return res.status(400).send(err)
        return res.status(200).redirect('/available-positions');
    });
}

function renderRequests(req, res){
    AppReqModel.find(function(err, data){
        if(err)
            res.status(400).send(err);
        res.status(200).render('applicants_requests', {requests:data});
    });
}

function renderApproveReq(req, res){
    TypeModel.find({}, function(err, findedTypes){
        if(err)            
            return res.status(400).send(err);
        AppReqModel.findById(req.query.id, function(err, data){
            if(err)            
                return res.status(400).send(err);
            return res.status(200).render('approve_request', {types:findedTypes, request: data});
        })
    });
}

const transporter = nodemailer.createTransport({
    service: 'yahoo',
    secure: false,
    auth: {
        user: 'onlinetest1102@yahoo.com',
        pass: 'udgjyscbamobpwpd'
    }
});

function disApproveReq(req, res){
    AppReqModel.findById(req.query.id, function(err, data){
        if(err)
            return res.status(400).send(err);
        
        const mailOptions = {
            from: 'onlinetest1102@yahoo.com',
            to: data.applicant_id,
            subject: data.position_title,
            text: 'Sorry, Your application is disapproved by our HR, try again later Please!'
        };
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                return res.status(400).send(err);
            }
        });
        AppReqModel.findByIdAndDelete(req.query.id, function(err, data){
            if(err)
                return res.status(400).send(err);
            return res.status(200).redirect('/applicants-requests');
        });
    });
}

function aprroveReq(req, res){
    let exam = {
        applicant_id : "",
        position_id : "",
        time: "",
        dead_line:"",
        types : [],
        questions : []
    };

    // Create Exam
    exam.applicant_id = req.body.applicant_id;
    exam.position_id = req.body.position_id;
    exam.position_title = req.body.position_title;
    exam.types = req.body.types;
    exam.deadline = new Date(req.body.date+"T"+req.body.time);
    exam.time = req.body.exam_time;

    // Loop to get each type question
    var requests = 0;
    for(var i = 0 ; i < exam.types.length ; i++){
        requests++;
        let curType = exam.types[i];
        // Parameters match parameters for "find"
        QuestionModel.findRandom({type : curType}, {}, {limit: 5}, function(err, results) {
            requests--;
            if (!err) 
                exam.questions.push(results);        
            if(requests === 0)
                createExam(exam, res);
        });
    }
};

function createExam(exam, res){
    let newExam = ExamModel(exam);
    newExam.save(function(err, data){
        if(err)
            res.status(400).send(err);
        
        const mailOptions = {
            from: 'onlinetest1102@yahoo.com',
            to: exam.applicant_id,
            subject: exam.position_title,
            html: '<p>Hello, Congrats you\'re one step away from being approved, Please use the attached link to take you exam</p>'
                   +'<a href="http://localhost:3000/applicant-exams?id='+data._id+'">Your Exam</a>' 
        };
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
               console.log(error);
            }
        });
        return res.status(200).redirect('/hr-panel');
    })
}

module.exports = {
    renderPositions, addNewPosition, deletePosition, 
    renderRequests, renderApproveReq, disApproveReq,
    aprroveReq
};
