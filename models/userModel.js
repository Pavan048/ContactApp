const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type:String,
        required:[true, "please add the user"],
    },
    email:{
        type:String,
        required:[true ,"please add the user mail"],
        unique:[true , "email already taken"],
    },
    password:{
        type : String,
        required:[true , "please add the user password"],
    },
},{
    timestamps:true,
})
const User = mongoose.model('User', userSchema);
module.exports = User;