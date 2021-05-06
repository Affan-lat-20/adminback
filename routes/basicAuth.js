const axios = require('axios');

async function getauthUser(req, res, next) {
  let requestMethod = req.method;
   console.log(requestMethod);
   let userid=req.params.id;
   console.log(userid);
   let module=req.params.module;
   console.log(module);
   let role;
   let final;
  try {
    const response = await axios.get(`https://adminop.herokuapp.com/api/user/getspecif?_id=${req.params.id}`);
    // console.log(response.data[0].userRole);
    console.log(response.data[0].userRole);
    role=response.data[0].userRole;
  } catch (error) {
    console.error(error);
  }

 
  try {
    const roles = await axios.get(`https://adminop.herokuapp.com/api/user/rolebase?userRole=${role}&module=${module}&operation=${requestMethod}`);
    // console.log(response.data[0].userRole);
    console.log(roles.data);
    final=roles.data;
  } catch (error) {
    console.error(error);
  }

  if ( final== "") {
    res.status(403)
    return res.send('Not allowed')
  }

  // req.body.email
    if ( userid== "") {
      res.status(403)
      return res.send('Not allowed')
    }
  
    next()
  }
//=========================================================
async function authUser(req, res, next) {
  let requestMethod = req.method;
   console.log(requestMethod);
   let userid=req.body._id;
   console.log(userid);
   let module=req.body.module;
   console.log(module);
   let role;
   let final;
  try {
    const response = await axios.get(`https://adminop.herokuapp.com/api/user/getspecif?_id=${req.body._id}`);
    // console.log(response.data[0].userRole);
    console.log(response.data[0].userRole);
    role=response.data[0].userRole;
  } catch (error) {
    console.error(error);
  }

 
  try {
    const roles = await axios.get(`https://adminop.herokuapp.com/api/user/rolebase?userRole=${role}&module=${module}&operation=${requestMethod}`);
    // console.log(response.data[0].userRole);
    console.log(roles.data);
    final=roles.data;
  } catch (error) {
    console.error(error);
  }

  if ( final== "") {
    res.status(403)
    return res.send('Not allowed')
  }

  // req.body.email
    if ( userid== "") {
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
    authRole,
    getauthUser
  }