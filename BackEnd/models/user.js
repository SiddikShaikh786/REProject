const mongoose = require('mongoose');
const Schema= mongoose.Schema

const userSchema= new Schema({
    fname: 
    {
        type:String,
        trim:true,
        default:null
        
        
    },
    lname: 
    {
        type:String,
        default:null,
        trim:true
    },
    dob: 
    {
        type:Date,
        default:Date.now
        
    },
    email: 
    {
        type:String,
        required: true,
        // unique: true

    },
    password: 
    {
        type:String,
        required: true
    },
    role: 
    {
        type:String
    },
    
})

module.exports=mongoose.model('UserDetails',userSchema)