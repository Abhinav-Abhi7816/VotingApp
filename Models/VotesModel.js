const mongoose=require('mongoose');

const votesSchema=new mongoose.Schema({
    SlNo:{
        type:Number,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true
    },
    party:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    votes:{
        type:Number,
        required:true,
        default:0
    }
})

const Votes=mongoose.model("Votes",votesSchema);

module.exports=Votes;