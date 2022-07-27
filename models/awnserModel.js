const 
    mongoose = require('mongoose'),
    awnserSchema = new mongoose.Schema({
       
        decscription: {
            type: String,
            required: true,
        },
        raiting: {
            type: Number,
            required: true
        },
        userName: {
            type: String,
            required: true,
        }, 
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Users',
            unique: false
        }, 
        questionId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Questions',
            unique: false
        }
    });


module.exports = mongoose.model('Awnsers', awnserSchema)