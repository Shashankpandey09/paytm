require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGOOSE_URL}`);
//creating UserSchema;
const UserSchema=new mongoose.Schema({
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
    },
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
    }
    
});
const AccountSchema=new mongoose.Schema({
 userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'USER',// referencing to the User model ,restricting so that account is not created for user that does not exist
    required:true
 },
 balance:{
    type:Number,
    required:true
}
})
const USER=mongoose.model('USER',UserSchema);
const Account=mongoose.model("Account",AccountSchema);
module.exports={USER,Account};