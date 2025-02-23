const express=require('express');
const Voter = require('../Models/VoterModel');
const {jwtVerify,generateToken}=require('./../Token');
const Votes = require('../Models/VotesModel');
const Admin=require('./../Models/AdminModel')
const route=express.Router();

route.use(express.json());

route.post('/signUp',async(req,res)=>{
    try{
        const data=req.body;
    const newVoter=new Voter(data);

    const response=await newVoter.save();

    res.status(200).json({message:"successfully saved!",response:response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error!"});
    }
})

route.post('/signUpAll',(req,res)=>{
    try{
        let dataArr=req.body;
        dataArr.map(async(el)=>{
            let newVoter=new Voter(el);

            let response=await newVoter.save();
        })

    res.status(200).json({message:"successfully saved!"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error!"});
    }
})

route.get('/votersList',jwtVerify,async(req,res)=>{
    try{
        const verifyData=req.userPayload;
        if(!verifyData.isAdmin)
        {
            res.status(401).json({message:"Unauthorised data!"});
            return;
        }
        const data=await Voter.find();

        res.status(200).json({list:data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error!"});
    }
})

route.post("/submitVote",jwtVerify,async(req,res)=>{
    try{
        const {SlNo,name}=req.body;
        const user=req.userPayload;

        const userData=await Voter.findById({_id:user.id});

        if(userData.isVoted)
        {
            res.status(400).json({message:"You already voted! Cannot cast multiple votes!"});
            return;
        }
        userData.isVoted=true;
        const savedData=await userData.save();
        console.log(savedData)

        const party=await Votes.findOne({SlNo:SlNo});
        let temp=party.votes;
        party.votes=temp+1;

        let response=await party.save();
        console.log(response);

        res.status(200).json({message:"Successfully Voted!"});

    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Internal server error!"})
    }
})

route.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body;

        const isAdmin=await Admin.findOne({username:username});
        const isVoter=await Voter.findOne({username:username});
        if(!isAdmin && !isVoter)
        {
            res.status(404).json({message:"User not found!"});
            return;
        }
        if(isAdmin)
        {
            const isPass=isAdmin.password===password?true:false;
            if(isPass)
            {
                const payload={
                    id:isAdmin.id,
                    username:isAdmin.username,
                    email:isAdmin.email,
                    isAdmin:true
                }
                const token=generateToken(payload);
                res.status(200).json({message:"Admin logged in",token:token,logName:isAdmin.name});
                return;
            }
        }
        if(isVoter)
        {
            const isPass=isVoter.password===password?true:false;
            if(isPass)
            {
                const payload={
                    id:isVoter.id,
                    username:isVoter.username,
                    email:isVoter.email,
                    isAdmin:false
                }
                const token=generateToken(payload);
                res.status(200).json({message:"Voter logged in",token:token,logName:isVoter.name});
                return;
            }
        }
        res.status(404).json({message:"Incorrect Password!",token:""})
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Internal server error!"})
    }
})

module.exports=route;