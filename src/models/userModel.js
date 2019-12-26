const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: false
    },
    rule:{
        type: String,
        required: false,
        default: "user"
    }
});

const UserModel = mongoose.model('user',userSchema);

module.exports = {UserModel};
