const express=require('express');
const CandRoute=require('./Routes/CandidateRoute')
const VoterRoute=require('./Routes/VoterRoute');
const adminRoute=require('./Routes/AdminRouter');
const app=express();
const db=require('./db');

const cors=require('cors');

app.use(cors());
app.use(VoterRoute);
app.use(adminRoute);

app.use(CandRoute);
app.get('/',(req,res)=>{
    try{
        res.send("This is server!")
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal server Error!"});
    }
})

app.listen(3000,()=>{
    console.log("Server connected!");
})