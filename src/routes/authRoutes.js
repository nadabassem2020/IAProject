const {registerNewUser, checkUserExists, login, logout} = require('../controllers/authController');

function authRoutes(app){
    
    app.route('/register')
        .get(function(req, res){
            res.status(200).render('register');
        })
        .post(registerNewUser);
    
    app.get('/register/:email/exists',checkUserExists);

    app.route('/login')
        .get(function(req, res){
            res.status(200).render('login');
        })
        .post(login);

    app.get('/logout', logout);
};


module.exports = authRoutes;
