const express = require('express');
const dotenv =require('dotenv');
dotenv.config();
require('./config/db.js');
const app = express();
const morgan = require('morgan');

const userRoutes = require('./routes/userRouter');
const classRoutes = require('./routes/classRouter');

app.locals.moment= require("moment");


app.use(express.json());

if( process.env.NODE_ENV ==='development' ){
    app.use(morgan('dev'));
}

app.get('/',(req,res)=>{ res.send('API is running...')})

app.use('/api/user',userRoutes);
app.use('/api/class', classRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);
});
