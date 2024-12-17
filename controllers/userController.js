const users = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//adduser
exports.addUserControler =async(req,res)=>{
    console.log("Inside addUserControler");
    const {username,email,password} =req.body
    // console.log(username,email,password);
    
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User Already existing....Please Login!!!")
        }else{
            const encryptedPassword = await bcrypt.hash(password,10)
            const newUser = new users({
                username,email,password:encryptedPassword,profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
    
}

//login
exports.loginController = async(req,res)=>{
    console.log("Inside loginController");
    const {email,password} = req.body
    try{
        const existingEmail = await users.findOne({email})
        if(existingEmail){
            let isUserpswdMatch = await bcrypt.compare(password,existingEmail.password)
            if(isUserpswdMatch || password==existingEmail.password){
                const token = jwt.sign({userId:existingEmail._id},process.env.JWTPASSWORD)
                res.status(200).json({user:existingEmail,token})
            }else{
                res.status(404).json("Invalid Email/Password")
            }

        }else{
            res.status(404).json("Invalid Email/Password")
        }

    }catch(err){
        res.status(401).json(err)
    }
    
}

// edit user
exports.editUserController = async (req,res)=>{
    console.log("Inside editUserController");
    const {profilePic} = req.body
    const userId = req.userId
    try {
        const existingUser = await users.findById({_id:userId})
        existingUser.profilePic = profilePic
        await existingUser.save()
        res.status(200).json(existingUser)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get all users
exports.getAllUsersController = async (req,res)=>{
    console.log("Inside getAllUserController");
    try {
        const allUsers = await users.find({role:"User"}) // .skip(1)
        res.status(200).json(allUsers)
    } catch (err) {
        res.status(401).json(err)
    }
    
}