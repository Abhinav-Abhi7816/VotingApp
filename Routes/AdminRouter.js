const express = require('express');
const Admin = require('../Models/AdminModel');
const Votes = require('../Models/VotesModel');
const { jwtVerify } = require('../Token');

const route = express.Router();

route.use(express.json());

route.post('/admin', async (req, res) => {
    try {
        const data = req.body;

        const newAdmin = new Admin(data);
        const response = await newAdmin.save();

        res.status(200).json({ message: "Successfully saved!", response: response });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error!" })
    }
})

route.post('/votesId', async (req, res) => {
    try {
        const dataArr = req.body;

        dataArr.map(async (el) => {
            let newVotes = new Votes(el);
            let response = await newVotes.save();
        })

        res.status(200).json({ message: "saved successfully!"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error!" })
    }
})

route.get('/votesCount',jwtVerify,async(req,res)=>{
    try{
        const verifyData=req.userPayload;
        if(!verifyData.isAdmin)
        {
            res.status(401).json({message:"Unauthorised data!"});
            return;
        }
        const data=await Votes.find().sort({votes:-1});

        res.status(200).json({votesCount:data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error!"});
    }
})

module.exports = route;