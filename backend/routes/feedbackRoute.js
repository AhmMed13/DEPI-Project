const express = require('express')
const Router = express.Router()


Router.post('/:senderId', sendFeedBackMessage)
Router.get('/:id', getSingleFeedBackMessage)
Router.get('/', getFeedBackMessages)


module.exports = Router