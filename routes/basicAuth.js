const axios = require('axios');

async function authUser(req, res, next) {
  let requestMethod = req.method;
   console.log(requestMethod);
   let userid=req.body._id;
   console.log(userid);
  try {
    const response = await axios.get(`http://localhost:5000/api/user/getspecif?_id=${req.body._id}`);
    // console.log(response.data[0].userRole);
    console.log(response.data[0]);
  } catch (error) {
    console.error(error);
  }

 
  // try {
  //   const roles = await axios.get(`http://localhost:5000/api/user/getspecif?_id=${req.body._id}`);
  //   // console.log(response.data[0].userRole);
  //   console.log(roles.data[]);
  // } catch (error) {
  //   console.error(error);
  // }



  // req.body.email
    if ( req.body._id== "") {
      res.status(403)
      return res.send('Not allowed')
    }
  
    next()
  }
  
  function authRole(role) {
    return (req, res, next) => {
      if (req.user.role !== role) {
        res.status(401)
        return res.send('Not allowed')
      }
  
      next()
    }
  }
  
  module.exports = {
    authUser,
    authRole
  }