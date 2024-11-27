const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },


  userEmail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        return validator.isEmail(v); 
      },
      message: props => `${props.value} is not a valid email!`
    }
  },


  userPassword: {
    type: String,
    required: true,
    minlength: 6,
  },


  userImage: {
    type: String, 
    default: '../Images/default.png', 
  },


  userCountry: {
    type: String,
  },


  userPhoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{10,15}/.test(v); 
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },


  userGender: {
    type: String,
  },


  isProvider: {
    type: Boolean,
    default: false,  
  },


  servicesProvided: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Servise'
    }],


  servicesUsed: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Servise'
    }]
    
}, { timestamps: true }); 


const User = mongoose.model('User', userSchema);

module.exports = User;
