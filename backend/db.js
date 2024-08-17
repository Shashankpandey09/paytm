const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://shashankpandey0910:qkVRBnMoeHmHKlez@cluster0.p5ln8mo.mongodb.net/Basic-Paytm");
//creating UserSchema;
const UserSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});
const USER=mongoose.model('USER',UserSchema);
module.exports={USER};