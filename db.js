const { error } = require('console');
const mongoose=require('mongoose');
require('dotenv').config();

// const mongoUrl='mongodb://localhost:27017/votingApp';
const mongoUrl=process.env.MONGO_ATLAS_URL;

mongoose.connect(mongoUrl)

const db=mongoose.connection;

db.on('open',()=>{
    console.log('Mongoose server started!');
})

db.on('disconnect',()=>{
    console.log('Mongoose server disconnected!');
})
db.on('error',(err)=>{
    console.log("Mongoose server error",err)
})

module.exports=db;