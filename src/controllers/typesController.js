const {TypeModel} = require('../models/hrModels');

function addNewType (req, res){
    let newType= TypeModel(req.body);
    newType.save(function(err, user){
        if(err)            
            return res.status(400).send(err)
        res.status(200).redirect('/available-exams-types');
    });
}

function getAllTypes (req, res){
    TypeModel.find({}, function(err, data){
        if(err)            
            return res.status(400).send(err)
        return res.status(200).render('available-exams-types', {types:data});
    });
}

function deleteType (req, res){
    TypeModel.deleteOne({_id:req.query.id}, function(err, data){
        if(err)            
            return res.status(400).send(err)
        return res.status(200).redirect('/available-exams-types');
    });
}

function viewType (req, res){
    TypeModel.findById(req.query.id, function(err, data){
        if(err)            
            return res.status(400).send(err)
        return res.status(200).render('exam-type', {type:data});
    });
}

function editType (req, res){
    console.log(req.body);
    TypeModel.findByIdAndUpdate(req.body._id,req.body, function(err, data){
        if(err)            
            return res.status(400).send(err)
        return res.status(200).redirect('available-exams-types');
    });
}

module.exports = { addNewType, getAllTypes, deleteType, viewType, editType};
