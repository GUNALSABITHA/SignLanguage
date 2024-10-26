const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const Users = require('./users');
const bcrypt = require('bcrypt');
const connectDB = require('./connectDB');

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
connectDB;

app.post('/register',async(req,res)=>{
    const { firstname , lastname , email , password } = req.body;
    try{
        const findUser = await Users.findOne({ email }).exec();
        if(findUser){
            return res.status(404).json({success:false,message:'Found user, please login '});
        }else{

            const hashedPassword = await bcrypt.hash(password,10);

            const newUsers = new Users({
                firstname:firstname,
                lastname:lastname,
                email:email,
                password:hashedPassword
            });

            await newUsers.save();
            return res.status(200).json({success:true,message:"User registered successfully "});
        }
    }catch(err){
        return res.status(404).json({success:false,message:err})
    }
});

app.post('/login',async(req,res)=>{
    const { email , password } = req.body;
    try{
        const findUser = await Users.findOne({ email }).exec();
        if(findUser && await bcrypt.compare(password,findUser.password)){
            return res.status(200).json({success:true,message:'Login Success'})
        }else if(!findUser){
            return res.status(404).json({success:false,message:"Couldnt find user , please register "})
        }else if(!await bcrypt.compare(password,findUser.password)){
            return res.status(404).json({success:false,message:"Check Password"});
        }
    }catch(err){
        console.log(err);
    }
})

mongoose.connection.on('connected',()=>{
    app.listen(8000,()=>{
        console.log("Server is connected on 8000")
    })
});