const mongoose = require('mongoose');
var Schema = mongoose.Schema;



const inf = new Schema(
    {
        firstName:{
            type: String,
            
            min:4,
            max:20


            },
        lastName:{
                type: String,
                
                min:4,
                max:20  
    
                },

        userRole:{
                    type: String,
                    min:4,
                    max:20
        
                    },


        email:{
                type: String,
                unique: true,
                min:6,
                max:100
            },
        password:{
            type: String,
            
            min:6,
            max:255
        },
      
      
        
        
        date:{
            type: Date,
            default: Date.now
             
        }
    });


    




// // Custom validation for email
// userSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');



//  // Virtual for user's full name
//  userSchema
// .virtual("fullName")
// .get(function () {
//     return this.firstName + " " + this.lastName;
// });


    
    module.exports= mongoose.model('inf',inf);
   

   
