const { string } = require('@hapi/joi');
const mongoose = require('mongoose');
var Schema = mongoose.Schema; 

const youtubeData = new Schema({
    internalUserid:{type: mongoose.Schema.Types.ObjectId},
    userId:{type:String},
    country:{type:String},
    description:{type:String},
    title:{type:String},
    publishedAt:{type:String},
    subscriberCount:{type:String},
    videoCount:{type:String},
    viewCount:{type:String}


});

module.exports= mongoose.model('YoutubeData',youtubeData);