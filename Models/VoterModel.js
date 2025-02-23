const mongoose=require('mongoose');

const voterSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        required:true,
        type:Number
    },
    gender:{
        type:String,
        enum:['male','female','other'],
        required:true
    },
    aadharNo:{
        type:Number,
        required:true,
        unique:true
    },
    voterId:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobileNo:{
        type:Number,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isVoted:{
        type:Boolean,
        default:false
    }
})

const Voter=mongoose.model('Voter',voterSchema);

module.exports=Voter;