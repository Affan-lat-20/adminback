const router = require('express').Router();
const { authUser, authRole } = require('./basicAuth')
const User = require('../model/User');
const Influencer = require("../model/Users");
const YoutubeData = require("../model/YoutubeData");
const RolebaseAuth= require('../model/RolebaseAuth');
const { Router } = require('express');
const AuthController = require("../controllers/AuthController");

const InfluencerController=require("../controllers/InfluencerController");
const YoutubeController=require("../controllers/YoutubeController");
const InstagramController=require("../controllers/InstagramController");
const TicktokController=require("../controllers/ticktokController")
const InstaControl=require("../controllers/InstaControl");
const RolebaseController=require("../controllers/RolebaseauthController")
//const registerValidation = require('../validation');

//***********************************Company routes start**********************/    
//register new user
router.post('/register',AuthController.register);

//login
router.post('/login',authUser,AuthController.login);

//delete user from db//
router.delete('/delete/:id',AuthController.delete);


//update user info//

router.put('/edit/:id',AuthController.edit);

//get one userinfo//
router.get('/userGet/:id',AuthController.userGet);
//get all users data//
router.get('/userlist',authUser,AuthController.allusersGet);
router.get('/getspecif',AuthController.finduser);

//**************************************Company user ends here**************************************//

//Influencer
//influencer login 
router.post('/influencerLogin',InfluencerController.influencerLogin);
//register new influencer
router.post('/influencerRegister',InfluencerController.influencerRegister);

//delete influencer from db
router.delete('/influencerDelete/:id',InfluencerController.influencerDelete);

// //update influencer info//

router.put('/influencerEdit/:id',InfluencerController.influencerEdit);

// //get one influencerinfo//
router.get('/:id/influencerGet',InfluencerController.influencerGet);
// //get all influencer data//
router.get('/influencerallGet',InfluencerController.influencerallGet);

router.get('/getspecificinf',InfluencerController.getspecific);

//***************************************Ends Influencer Routes**************************************//

//***************************************Youtube api Routes**************************************//
router.post('/:id/addyoutubedata',YoutubeController.addyoutubeData);
router.get('/:id/getyoutubedata',YoutubeController.getuseryoutubedata);
//***********************************New Campagine *********************************************//


router.get('/scrapes',InstagramController.instagramfollowers);

router.get('/insta/:username',InstaControl.instagramfollow);

router.get('/tiktok/:username',TicktokController.tiktokfollower);

//++++++++++++++++++++++++++++++++++++++++++++++Role Controller paths+++++++++++++++++++++++//

router.post('/rolebase',RolebaseController.Rolebaseadd);
router.get('/rolebase',RolebaseController.findrole);
router.put('rolebase/:id',RolebaseController.roleedit);

module.exports = router;