const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    orderId: {
        type: Object,
    },
    message:{
        type:String
    },
    userId:{
        type:Object
    },
    displayName:{
        type:String
    },
    productId:{
        type:Object
    },
    ratings:{
        type:Number
    },
    createdDate:{
        type:Date,
    },
});

module.exports = mongoose.model('review', ReviewSchema);
  