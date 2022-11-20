const mongoose = require('mongoose');
//const {ObjectId} = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true,
        max:500
    },
    img:{
        type:String,
    },
},
  {timestamps:true}  
);

module.exports = mongoose.model("Post", PostSchema);