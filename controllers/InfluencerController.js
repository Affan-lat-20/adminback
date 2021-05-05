const User = require('../model/Users');

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Joi = require('@hapi/joi');

exports.influencerRegister = async(req,res)=>
{

    //Check if email already on Database

    const emailExist = await Influencer.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    //Influencer password hashing

    const salt = await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(req.body.password, salt);
    
   //Create new Influencer

   const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userRole:req.body.userRole,
    contactNo:req.body.contactNo,
    country: req.body.country,
    email: req.body.email,  
    password:hashedPassword,
    econcent:req.body.econcent,  
    signature:req.body.signature,
});
    try {
        const savedUser = await influencer.save();
      
        res.send(savedUser);
        
    } catch (error) {
        res.status(400).send(error);
    }

   
}

exports.influencerLogin = async(req,res) =>
{
    //Influencer Validation before login
    
    const schema = Joi.object({ 
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });
    
    const {error} = schema.validate(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);
    
     //Check if email is on Database
    
     const influencer = await Influencer.findOne({email:req.body.email});
     if(!influencer) return res.status(400).send('There is no Account with this Email');
     
     //Password Validation
     const validPass = await bcrypt.compare(req.body.password, influencer.password);
     if(!validPass) return res.status(400).send('Invalid password');
    res.send(influencer);
     //Create and assign jwt tokken
     const token = jwt.sign({_id: influencer._id}, process.env.TOKEN_SECRET);
     res.header('auth-token',token).send(token);
     res.send('Influencer logged in');
}    

exports.influencerDelete =  async(req,res)=>{

    Influencer.findOne({_id: req.params.id}, function (error, influencer){
        console.log("This influencer will get deleted " + influencer);
        
        influencer.remove();
        res.send("This influencer is removed "+ influencer.firstName);
    
    });
    
}

exports.influencerEdit =  function (req,res){
    var conditions ={_id: req.params.id};
    if(req.body != {email:req.body.email} || req.body != req.body.password){
        Influencer.updateOne(conditions, req.body)   
        .then(doc =>{
            if(!doc){
                return res.status(404).end();}
                return res.status(200).json(doc);
            })
            .catch(err => next(err));
        
    }
    else{
        res.send("cant update email or password");

    }
   
    }


    exports.influencerGet=async(req,res)=>{
        Influencer.findOne({_id: req.params.id},function(error, influencer){
            console.log("This Influencer will get selected "+ influencer);

            res.send("This Influencer is selected"+ influencer);
        });
    }

    exports.influencerallGet=async(req , res)=> {
        Influencer.find({}).then(function (influencer) {
        res.send(influencer);
        });
       }


       exports.getspecific = async(req,res,next)=>{
        // BrandEmployee.findOne(req.query)
        let query;
        let result = JSON.stringify(req.query);
        result = result.replace(/\b(gt|gte|lt|lte|in)\b/g,match => `$${match}`);
        console.log(result);

        query = Influencer.find(JSON.parse(result));
        
        const inf = await query
        res
        .status(200)
        .json({inf});
        
    }

    