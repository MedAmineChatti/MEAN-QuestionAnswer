const 
    mongoose = require('mongoose'),
    questionSchema = new mongoose.Schema({         
        title: {
            type: String  
            //required: true,
        },
        description: {
            type: String,
            //required: true,
        },
        tags: {
            type: [String],
            required: true
        },
        userId : {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Users',
            unique: false
        }, 
        creationDate: {
            type: String,
            default:  new Date().toISOString().slice(0, 10),
            required: true
        } 
    });

module.exports = mongoose.model('Questions', questionSchema)