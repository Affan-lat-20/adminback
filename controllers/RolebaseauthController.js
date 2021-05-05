const RolebaseAuth = require('../model/RolebaseAuth');

exports.Rolebaseadd = async(req,res)=>
{
  
    const rolebaseauth = new RolebaseAuth({
    userRole: req.body.userRole,
    module: req.body.module,
    operation:req.body.operation,
    
});
    try {
        const saveRole = await rolebaseauth.save();
      
        res.send(saveRole);
        
    } catch (error) {
        res.status(400).send(error);
    }

   
}


exports.findrole = async(req,res,next)=>{
    // BrandEmployee.findOne(req.query)
    let query;
    let result = JSON.stringify(req.query);
    result = result.replace(/\b(gt|gte|lt|lte|in)\b/g,match => `$${match}`);
    console.log(result);

    query = RolebaseAuth.find(JSON.parse(result));
    
    const role = await query
    res
    .status(200)
    .json(role);
    
}


exports.roleedit =  function (req,res){
    var conditions ={_id: req.params.id};
   
    RolebaseAuth.updateOne(conditions, req.body)   
        .then(doc =>{
            if(!doc){
                return res.status(404).end();}
                return res.status(200).json(doc);
            })
            .catch(err => next(err));
        
    
        res

    
   
    }
