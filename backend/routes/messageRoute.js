const express = require('express')
const Router = express.Router();
const { getMessages, sendMessage } = require('../controlers/messageControler.js');



Router.get("/:senderId/:recieverId", getMessages);
Router.post("/send/:senderId/:receiverId", sendMessage);

module.exports = Router