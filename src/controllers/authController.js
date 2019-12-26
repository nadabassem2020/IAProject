const session = require('express-session');
const {UserModel} = require('../models/userModel');

function registerNewUser(req, res){
    let newUser = UserModel(req.body); 
    newUser.save(function(err, user){
        if(err)
            return res.status(400).redirect('/register');
        res.status(200).redirect('/');
    });
};

function checkUserExists(req, res){
    UserModel.findOne({
        email: req.params.email
    }, function(err, user){
        if(err)
            throw err;
        if(!user)
            return res.json({'exists': false});
        else
            return res.json({'exists': true});
    });
};

function login(req, res){
    UserModel.findOne({
        email: req.body.email
    }, function(err, user){
        if(err)
            throw err;
        if(!user)
            return res.status(200).redirect('/login');
        else{
            if(user.password===req.body.password){
                session.id = user.email;
                session.username = user.name;
                session.rule = user.rule;
                if(session.rule==='user')
                    return res.status(200).redirect('/feed');
                if(session.rule==='hr')
                    return res.status(200).redirect('/hr-panel');
            } else {
                return res.status(200).redirect('/login');
            }
        }
    });
};

function loginRequired(req, res, next){
    if(session.id && session.rule==='user')
        next();
    else
        return res.status(200).redirect('/login');
};

function hrLoginRequired(req, res, next){
    if(session.id && session.rule==='hr')
        next();
    else
        return res.status(200).redirect('/login');
};

function logout(req, res){
    session.id = undefined;
    session.username = undefined;
    session.rule = undefined;
    req.session.destroy(function(err){
        res.status(200).redirect('/');
    });
};

module.exports = {registerNewUser, checkUserExists, login, loginRequired, hrLoginRequired, logout};
