const 
    mongoose = require('mongoose'),
    tokenSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Users',
            unique: true
        },
        token: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default:  Date.now(),
           // expires:3600 * 24// 1 day
        }
    });


module.exports = mongoose.model('Token', tokenSchema)