const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({ 
    title: {
        type : String,
        required : true
    },

    content : {
        type : String,
        required : true
    },

    date : {
        type : Date ,
        default : Date.now
    },

    user_id :{
        type: String,
        required : true
    },

    name : { 
        type : String,
        required : true
    }
} , {
    timestamps: true
})

module.exports = mongoose.model("memories",memorySchema)