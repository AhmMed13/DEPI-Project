const FeedBack = require('../models/FeedBack')
const User = require('../models/User')

const sendFeedBackMessage = async (req, res) => {
    try {
        const { senderId } = req.params
        const { message } = req.body

        const user = await User.findById(senderId)
        const newFeedBackMessage = new FeedBack({
            message
        })

        user.feedBack.push(message)

        newFeedBackMessage.sender = senderId

        await Promise.all([newFeedBackMessage.save(), user.save()])

        res.status(201).json({success: true, data: 'message sent.'})
    } catch (error) {
        res.status(500).json({success: false, data: error.message})
    }
}

const getFeedBackMessages = async (req, res) => {
    try {
        const messages = await FeedBack.find().populate('sender')
    if (!messages){
        return res.status(401).json({success: false, data: 'no messages found'})
    }

    res.status(200).json({data: messages, success: true})
    } catch (error) {
        res.status(500).json({success: false, data: error.message})
    }
}


const getSingleFeedBackMessage = async (req, res) => {
    try {
        const { id } = req.params
        const message = await FeedBack.findById(id)
        if(!message){
            return res.status(404).json({success: false, data: 'message not found'})
        }
        res.status(200).json({success: true, data: message}).populate('sender')
    } catch (error) {
        res.status(500).json({success: false, data: error.message})
    }
}