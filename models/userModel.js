const 
    mongoose = require('mongoose'),
    userSchema = new mongoose.Schema({
        role: {
            type: Number,
            default: 0
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        }, 
        password: {
            type: String,
            required: true
        } ,
        verified: {
            type: Boolean               
        },
        password_clear:{
            type: String,
            required: true
        } 
    });


module.exports = mongoose.model('Users', userSchema)