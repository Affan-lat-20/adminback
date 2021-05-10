const mongoose = require('mongoose');
var Schema = mongoose.Schema;



const Rolename = new Schema(
    {
        userRole:{
            type: String,
            unique: true,
            min:4,
            max:20

            },
        
        date:{
            type: Date,
            default: Date.now
             
        },
        status:{
            type:String,
            default:"Active"
        }
    });







    
    module.exports= mongoose.model('Rolename',Rolename);
   