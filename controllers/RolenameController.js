const Rolenamec = require('../model/Rolename');

exports.addrolename = async(req,res)=>
{
  
    const rolename = new Rolenamec({
        userRole: req.body.userRole,
   
    
});
    try {
        const saveRole = await rolename.save();
      
        res.send(saveRole);
        
    } catch (error) {
        res.status(400).send(error);
    }

   
}


exports.getrolename = async(req,res,next)=>{
    // BrandEmployee.findOne(req.query)
    let query;
    let result = JSON.stringify(req.query);
    result = result.replace(/\b(gt|gte|lt|lte|in)\b/g,match => `$${match}`);
    console.log(result);

    query = Rolenamec.find(JSON.parse(result));
    
    const role = await query
    res
    .status(200)
    .json(role);
    
}


exports.editrolename =  function (req,res){
    var conditions ={_id: req.params.id};
   
    Rolenamec.updateOne(conditions, req.body)   
        .then(doc =>{
            if(!doc){
                return res.status(404).end();}
                return res.status(200).json(doc);
            })
            .catch(err => next(err));
        
    
        res

    
   
    }
