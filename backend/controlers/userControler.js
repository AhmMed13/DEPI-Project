const Joi = require('joi')
const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const path = require('path') 
const multer  = require('multer')

dotenv.config()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images/"); // Folder where images will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname); // Naming the file with a timestamp
    }
});

// Initialize multer
const upload = multer({
    storage: storage,
})

function validateUserPost(obj){
    const schema = Joi.object({
        username: Joi.string().trim().min(3).max(15).required(),
        userEmail: Joi.string().trim().min(10).max(25).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        userPassword: Joi.string().trim().min(8).max(15).required(),
        userCountry: Joi.string().trim().min(2).max(15),
        userPhoneNumber: Joi.string().trim().min(11).max(15),
        isProvider: Joi.string(),
        userImage: Joi.string().uri()
    })
    return schema.validate(obj)
}
function validateUserPut(obj){
    const schema = Joi.object({
        username: Joi.string().trim().min(3).max(15),
        userEmail: Joi.string().trim().min(10).max(25),
        userPassword: Joi.string().trim().min(8).max(15),
        userCountry: Joi.string().trim().min(2).max(15),
        userPhoneNumber: Joi.string().trim().min(11).max(15),
        isProvider: Joi.string(),
        userImage: Joi.string().uri()
    })
    return schema.validate(obj)
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('servicesProvided').populate('servicesUsed')
        return res.status(200).json({status: 'success', data: users || 'No users found'})
    } catch (error) {
        res.json({status: 'failed', data: error.message})
    }
}

const getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.userId).populate('servicesProvided').populate('servicesUsed')
        if(!user){
            return res.status(404).json({status: 'failed', message: 'User not found'})
        }
        res.status(200).json({status: 'success', data: user})
    } catch (error) {
        res.json({status: 'failed', data: error.message})
    }
}

const loginUser = async (req, res) => {
    const loggingInUser = await User.findOne({userEmail: req.body.userEmail})
    if(!loggingInUser){
        return res.status(500).json({data: 'This Email is not registered!', success: false})
    }
    const isPasswordCorrect = await bcrypt.compare( req.body.userPassword, loggingInUser.userPassword)
    if(!isPasswordCorrect){
        return res.status(500).json({data: 'Password is wrong', success: false})
    }
    const genToken = jwt.sign({ id: loggingInUser._id, email: loggingInUser.userEmail }, process.env.SECRET_KEY, {
        expiresIn: '15d'
    })

    return res.status(200).json({data: 'Logged in Successfully', success: true, body: {
        id: loggingInUser._id,
        email: loggingInUser.userEmail,
        name: loggingInUser.username, 
        image: loggingInUser.userImage
    }})
}


const createUser = async (req, res) => {
    try {
        const { error } = validateUserPost(req.body)
        if( error ){
            return res.json({data: error.details[0].message, success: false })
        }

        const isAlreadyUser = await User.findOne({userEmail: req.body.userEmail})
        if(isAlreadyUser){
            return res.status(500).json({data: 'This email already excists', success: false})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.userPassword, salt)

        
        const newUser = new User({ ...req.body , userImage: "/Images/default.png", userPassword: hashedPassword})


        const genToken = jwt.sign({ id: newUser._id, email: req.body.userEmail }, process.env.SECRET_KEY, {
            expiresIn: '15d'
        })

        
        await newUser.save()

        return res.status(201).json({data: 'User Added Successfully', success: true, body: {
            id: newUser._id,
            email: newUser.userEmail,
            name: newUser.username, 
            image: newUser.userImage
        }})
        
    } catch (error) {
        res.json({data: error.message, success: false})
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        if(!user){
            return res.status(404).json({success: false, data: 'User not found'})
        }
        
        const { error } = validateUserPut(req.body)
        if( error ){
            return res.json({message: error.details[0].message })
        }
        const isPasswordCorrect = await bcrypt.compare(user.userPassword, req.body.userConfirmPassword)
        if(!isPasswordCorrect){
            return res.status(400).json({data: 'Password is not correct', success: false})
        }
        const newUser = await User.findByIdAndUpdate(req.params.userId, {
            $set:{
                username: req.body.username,
                userPassword: req.body.userNewPassword,
                userPhoneNumber: req.body.userPhoneNumber,
                userCountry: req.body.userCountry,
                userGender: req.body.userGender,
            }
        }, { new: true })
        return res.status(200).json({data: newUser, success: true})        
    } catch (error) {
        res.json({status: 'failed', data: error.message})
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        if(!user){
            return res.status(404).json({status: 'failed', message: 'User not found'})
        }
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json({status: 'success', data: 'user was deleted'})
    } catch (error) {
        res.json({status: 'failed', data: error.message})
    }
}



const getProviders = async (req, res) => {
    try {
        const providers = await User.find({isProvider: true, _id: { $ne: req.params.userId}}).populate('servicesProvided').populate('servicesUsed')
        res.status(200).json({success: true, data: providers})
    } catch (error) {
        res.status(400).json({success: false, data: error.message})
    }
}

const getConversations = async (req, res) => {
    try {
        const providers = await User.find({_id: { $ne: req.params.userId}}).populate('servicesProvided').populate('servicesUsed')
        res.status(200).json({success: true, data: providers})
    } catch (error) {
        res.status(400).json({success: false, data: error.message})
    }
}


module.exports = {
    deleteUser,
    updateUser,
    createUser,
    loginUser,
    getUsers,
    getUser,
    upload,
    // uploadImage,
    getProviders,
    getConversations
}