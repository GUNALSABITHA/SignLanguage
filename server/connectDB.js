const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/SampleLogin';

const connectDB = async()=>{
    try{
        await mongoose.connect(uri);
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB();