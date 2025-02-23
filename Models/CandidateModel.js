const mongoose=require('mongoose');

const CandidateSchema=new mongoose.Schema({
    SlNo:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    party:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    constituency:{
        type:String,
        required:true
    },
    post:{
        type:String,
        enum:['MP',"MLA","MLC"],
        required:true
    },
    address:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    }
})

const Candidate=mongoose.model('Candidate',CandidateSchema);

module.exports=Candidate;