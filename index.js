const express = require('express');
const app =express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Import Routes
const authRoute = require('./routes/auth');

dotenv.config();

//Connection with DB
mongoose.connect(
    process.env.DB_CONNECT,
    
    { useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex: true },
    () => console.log('connected to db'));

//Middleware
app.use(express.json());
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With, Content-Type,Accept,Authorization'
        );
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    next();
});

//Route Middlewares
app.use('/api/user',authRoute);


// app.listen(5000,() => console.log("Server Up and Running"));
// app.listen(process.env.PORT|| 5000, () => console.log(`Server started at port : ${process.env.PORT}`));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server staretd at port ${PORT}`));