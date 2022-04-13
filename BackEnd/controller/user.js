const user=require('../models/user');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const SECRET_KEY="REProject"

const register= async (req,res,next) => {
    let{fname,lname,dob,email,password,role}=req.body 
    try
    {
        if(!(fname && lname && dob && email && password && role))
        {
            res.json({
                error:true,
                message:"All input required",
                data:null
            }) 
        }

        const emailExists= await user.findOne({email})
        if(emailExists)
        {
            res.status(400).json({
                error:true,
                message:'Email allready exists',
                data:null
            })
        }
        else{
            const saltround=10;
          //salt of the password,we are encrypting the password using saltround
            const genSaltround = await bcrypt.genSalt(saltround)

            //hash password,it makes the password encrypted
            const hashpassword = await bcrypt.hash(password,genSaltround)
            console.log("hash password",hashpassword)

       const reg=await user.insertMany([
                {fname,lname,dob,email:email.toLowerCase(),password:hashpassword,role}
                
            ])
            res.status(200).json({
                error:false,
                message:" registartion succesfully",
                data:{reg}
            })
            
        }

    }
    catch(error){
        console.log(error)
        next(error);
    }

}

//login
const login= async (req,res,next)=>
{
    //Get user Input
    const {email,password}=req.body

    try { 
        
    // Validate if user exist in our database

        if(!(email && password)){
            res.status(200).json({
                error:true,
                message:"All Input Required",
                data:null 
            })
        }
        const isEMail=await user.findOne({email})
        if(isEMail)
        {
            let{fname,role} =isEMail
            const isPassmatch=bcrypt.compare(password,isEMail.password)
            if(isPassmatch)
            {
                // const payload={fname,role}
                const token= await jwt.sign({fname,role},SECRET_KEY,
                    {
                        expiresIn:"5h"
                    })
                    res.json({
                        error:false,
                        message:"login successfully",
                        data:{fname,role,token}
                    })
                    console.log("login successfully")
                    console.log("Token" ,token)


            }
            else{
            res.json({
                error:true,
                message:"login failed",
                data:null
            })
        }
    }
        else
        {
            res.json({
                error:true,
                message:"New User Please Register!!!",
                data:null
            })
        }
        
    } catch (error) {
        next(error)
        
    }
    
}

//get user details
const getAllUserDetails= async (req, res, next) => {

const userDetails= await user.find().lean();
try{

if(userDetails)
{
    console.log({userDetails})
    res.json({
        error:false,
        message:`user details found: ${{userDetails}}`,
        data:{userDetails}
    })

}
else
{
    res.json({
              error:true,
              message:"User details not found",
              data:null})
}
}catch (error) {
    console.log(error)
    next(error)
}

}


//EDIT details
//get User 
const getID= async (req, res,next)=>
{
    // let{_id,fname,lname}=req.body
    console.log(req.params)
    _id=parseInt(req.params._id)
    try {
        const isId=await user.findOne({_id:req.params._id}).lean();
        // console.log(isId)
       res.json({
           error:false,
           message:"edit ID",
           data:{isId}
       })
        
    } catch (error) {
        console.log(error)
        next(error)
        
    }


}

const editUserDetails= async(req, res, next) => {
    let{_id,fname,lname,email}=req.body
    try {
const isUser= await user.updateOne({_id},
            {$set: {
                fname,
                lname,
                email}})

                res.json({
                    error:false,
                    message:" edited successfully",
                    data:{isUser}

                })
        

        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}

//DELETE USERS 
const deleteUsers = async (req, res, next) => {
    console.log(req.params)
    let { _id } = req.params
    console.log(_id);
    try {
        await user.deleteOne({ _id: _id })
        res.json({
            error: false,
            message: " user deleted Successfully",
            data: null
        })
    }
    catch (err) {
        next(err)
    }

}




module.exports ={
    register,
    login,
    getAllUserDetails,
    getID,
    editUserDetails,
    deleteUsers
}