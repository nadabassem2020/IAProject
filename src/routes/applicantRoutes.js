const {loginRequired} = require('../controllers/authController');
const {renderFeed, renderPosition, uploadCV, renderReqExams, renderExam} = require('../controllers/applicantController');

function applicantRoutes(app) {

    app.get('/feed', loginRequired, renderFeed);

    app.get('/applicant-position',loginRequired, renderPosition);

    app.post('/cv_upload', loginRequired, uploadCV);

    app.get('/application_sent', function(req, res){
        res.status(200).render('application_sent');
    });

    app.get('/applicant-exams', loginRequired, renderReqExams)

    app.get('/applicant-exam', loginRequired, renderExam)
}

module.exports = applicantRoutes;
