const mongoose = require('mongoose');
//const {ObjectId} = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicure:{
        type:String,
        default:"https://res.cloudinary.com/vijayscloud/image/upload/v1601882670/profile-icon-png-898_v76css.png"
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
    
},
{timestamps:true}
);

module.exports = mongoose.model("User",UserSchema);