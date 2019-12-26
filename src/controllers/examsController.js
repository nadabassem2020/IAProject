const nodemailer = require('nodemailer');
const {ExamModel} = require('../models/hrModels');

var transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: 'amr.ister@yahoo.com',
      pass: 'ibornin2261998'
    }
});
  
var mailOptions = {
    from: 'amr.ister@yahoo.com',
    to: 'suleimanhesham99@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};
  
function createExam (req, res){
    let newExam = ExamModel(req.body);
    newExam.save(function(err, user){
        if(err)            
            return res.status(400).send(err);
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
        res.status(200).redirect('/hr-panel');
    });
}
  
module.exports = { createExam };
