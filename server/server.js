const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//routes declartion
const personRouter = require('./routes/Person');
const familyRouter = require('./routes/Family');
const memberRouter = require('./routes/Member');

const result = dotenv.config({path: './.env'});
if(result.error){
    throw result.error;
}

const app = express();
const port = process.env.port || 8000;

//middleware
app.use(cors());
app.use(express.json());

//db connection
const uri = process.env.SERVER_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to the database');
});

//routes
app.use('/person', personRouter);
app.use('/family', familyRouter);
app.use('/family/member', memberRouter);

//app
app.listen(port , () => {
    console.log(`Server is running in port ${port}`);
});
