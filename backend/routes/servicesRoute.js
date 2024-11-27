const express = require('express');
const Router = express.Router();

const { 
    createService,
    getServices,
    getServiceById,
    editService,
    deleteService,
    buyService}

= require('../controlers/servicesControler.js');


Router.route('/').get(getServices)


Router.route('/:userId').get(getServiceById)
                        .put(editService)
                        .delete(deleteService)
                        .post(createService)

                        
Router.route('/:serviceId/:userId').get(buyService)
                                                

module.exports = Router;
