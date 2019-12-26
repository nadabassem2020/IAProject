const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const appReqSchema = new Schema({
    position_title: {
        type: String,
        required: true
    },
    position_id: {
        type: String,
        required: true
    },
    applicant_id: {
        type: String,
        required: true
    }
});
const AppReqModel = mongoose.model('applicant_request',appReqSchema);

module.exports = {AppReqModel};
