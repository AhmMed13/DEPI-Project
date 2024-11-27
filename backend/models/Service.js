const mongoose = require('mongoose')

const servicesSchema = new mongoose.Schema(
    {
        provider: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        }],
        users: [{
                type: mongoose.Schema.Types.ObjectId, ref: 'User'
            }],
        serviceTitle: String,
        serviceDetails: String,
        servicePrice: Number,
        serviceCategory: String,
        currentState: {
            enum: ['inProgress', 'done', 'delivered', 'canceled']
        }
    },
    {
        timestamps: true
    }
)

const Servise = mongoose.model('Servise', servicesSchema)
module.exports = Servise 