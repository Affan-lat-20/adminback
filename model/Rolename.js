const mongoose = require('mongoose');
var Schema = mongoose.Schema;



const Rolename = new Schema(
    {
        userRole:{
            type: String,
            min:4,
            max:20

            },
        
        date:{
            type: Date,
            default: Date.now
             
        }
    });







    
    module.exports= mongoose.model('Rolename',Rolename);
   