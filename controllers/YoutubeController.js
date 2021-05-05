const YoutubeData = require("../model/YoutubeData");


exports.addyoutubeData = async(req,res,next)=>{
    const youtubedata = new YoutubeData({
        internalUserid: {_id:req.params.id},         
        userId:req.body.userId, 
        country:req.body.country,                           
        description:req.body.description,
        title:req.body.title,
        publishedAt:req.body.publishedAt,
        subscriberCount:req.body.subscriberCount,
        videoCount:req.body.videoCount,
        viewCount:req.body.viewCount
 
    });
        try {
            const savedyoutubedata = await youtubedata.save();
            // console.log(savedUser);
    
            res.send(savedyoutubedata);
            next();
            
        } catch (error) {
            res.status(400).send(error);
        }
 
    }


    exports.getuseryoutubedata=async(req , res)=> {
        YoutubeData.find({internalUserid : req.params.id}).then(function (youtubedata) {
        res.send(youtubedata);
        });
       }