const express=require('express');
const Candidate = require('../Models/CandidateModel');
const { jwtVerify } = require('../Token');
const Votes = require('../Models/VotesModel');

const route=express.Router();

route.use(express.json());

route.get('/candidates/allData',jwtVerify,async(req,res)=>{
    try{
        const verifyData=req.userPayload;
        if(!verifyData.isAdmin)
        {
            res.status(401).json({message:"Unauthorised data!"});
            return;
        }
        const data=await Candidate.find().sort({SlNo:1});

        res.status(200).json({CandidatesData:data});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Internal server error!"})
    }
})

route.get('/candidates',async(req,res)=>{
    try{
        const data=await Candidate.find().sort({SlNo:1});
        let dataSent=data.map((el)=>({
            SlNo:el.SlNo,
            name:el.name,
            party:el.party,
            constituency:el.constituency,
            post:el.post,
            imgUrl:el.imageUrl  
        }));
        
        res.status(200).json({candidatesData:dataSent});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Internal server error!"})
    }
})
route.post('/candidates',(req,res)=>{
    try{
        const dataArr=req.body;
        dataArr.map(async(el)=>{
            let newCan=new Candidate(el)
            let response=await newCan.save();
        })
        dataArr.map(async(el)=>{
            let data={
                SlNo:el.SlNo,
                name:el.name,
                party:el.party,
                imgUrl:el.imageUrl,
                votes:0
            }
            let newVote=new Votes(data);

            let k=await newVote.save();
        })

        res.status(200).json({message:"Saved successfully"});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Internal server error!"})
    }
})

module.exports=route;