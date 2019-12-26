const mongoose =  require('mongoose');
const random = require('mongoose-simple-random');

const Schema = mongoose.Schema;

const examSchema = new Schema({
    applicant_id:{
        type: String,
        required: true
    },
    position_id:{
        type: String,
        required: true
    },
    position_title:{
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    types: {
        type : Array,
        required: true
    },
    questions: {
        type : Array,
        required: true
    }
});
const ExamModel = mongoose.model('exam',examSchema);


const questionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    answers: {type : Array}
});
questionSchema.plugin(random);
const QuestionModel = mongoose.model('questions',questionSchema);


const positionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
const PositionModel = mongoose.model('positions',positionSchema);


const typeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});
const TypeModel = mongoose.model('exam-type',typeSchema);

module.exports = {ExamModel, TypeModel, QuestionModel, PositionModel};
