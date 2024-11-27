const Joi = require('joi')
const Servise = require('../models/Service')
const User = require('../models/User')

const validateAddService = (obj) => {
    const schema = Joi.object({
        serviceTitle: Joi.string().trim().max(20).min(5).required(),
        serviceDetails: Joi.string().trim().max(50).min(5).required(),
        serviceCategory: Joi.string().trim().max(20).min(5).required(),
        servicePrice: Joi.number().required()
    })
    return schema.validate(obj)
}

const validateEditService = (obj) => {
    const schema = Joi.object({
        serviceTitle: Joi.string().trim().max(20).min(5),
        serviceDetails: Joi.string().trim().max(50).min(5),
        serviceCategory: Joi.string().trim().max(20).min(5),
        servicePrice: Joi.number()
    })
    return schema.validate(obj)
}

//  Add service

const createService = async (req, res) => {
    try {
        const { error } = validateAddService(req.body)
        if (error) {
            return res.status(400).json({ data: error.details[0].message, success: false });
        }

        const newService = new Servise({...req.body, provider: req.params.userId});  // Corrected model name here
        await newService.save();

        const serviceProvider = await User.findById(req.params.userId)
        serviceProvider.servicesProvided.push(newService._id)
        serviceProvider.isProvider = true
        await serviceProvider.save()


        res.status(201).json({ body: newService, success: true, data: 'service added successfully' });
    } catch (error) {
        return res.status(400).json({ data: error.message, success: false });
    }
};


const buyService = async (req, res) => {
    try {
        const servicetoBuy = await Servise.findById(req.params.serviceId)
        if(!servicetoBuy){
            return res.status(404).json({success: false, data: 'service not found'})
        }
        if(!servicetoBuy.provider){
            return res.status(400).json('error')
        }

        const user = await User.findById(req.params.userId)
        // user.servicesUsed.map(service => {
        // if(service._id == req.params.serviceId){
        //     return res.status(400).json({success: false, data: 'You already bought this service!!'})
        // }})
        user.servicesUsed.push(servicetoBuy._id)
        await user.save()

        servicetoBuy.status = 'inProgress'
        servicetoBuy.users.push(req.params.userId)
        await servicetoBuy.save()

        res.status(200).json({success: true, data: 'service was order, waiting the provider to reply'})
    
    } catch (error) {
        return res.status(400).json({data: error.message, success: false})
    }
}

// Get all services
const getServices = async (req, res) => {
    try {
        const services = await Servise.find().populate('provider').populate('users').exec(); // Populating provider details if needed
        return res.status(200).json({ success: true, data: services });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get a specific service by ID
const getServiceById = async (req, res) => {
    try {
        const service = await Servise.findById(req.params.userId).populate('users').populate('provider');
        if (!service) {
            return res.status(404).json({ data: 'Service not found', success: false });
        }
        return res.status(200).json({ success: true, data: service });
    } catch (error) {
        return res.status(500).json({ date: error.message, success: false });
    }
};

//  update service

const editService = async (req, res) => {
    try{
        if(!Servise.findById(req.params.userId)){
            return res.status(404).json({success: false, data: 'Service not found'})
        }
        const { error } = validateEditService(req.body)
        if(error){
            return res.status(400).json({data: error.details[0].message, success: false })
        }
        const service = await Servise.findByIdAndUpdate(req.params.userId, {
            $set:{
                ...req.body
            }
        }, { new: true })
        return res.status(200).json({data: service, success: true})
    } catch (error) {
        return res.status(400).json({data: error, success: false })
    }
}

// Delete a service
const deleteService = async (req, res) => {
    try {
        const deletedService = await Servise.findByIdAndDelete(req.params.userId);
        if (!deletedService) {
            return res.status(404).json({ data: 'Service not found', success: false });
        }
        return res.status(200).json({ data: 'Service deleted successfully!', success: true });
    } catch (error) {
        return res.status(500).json({ data: error.message, success: false });
    }
};


module.exports = {
    createService,
    getServices,
    getServiceById,
    editService,
    deleteService,
    buyService
};