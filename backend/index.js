const connectToMongo = require("./db");

const express = require('express')
// var cors = require('cors');
const cors = require('cors');

const app = express();
app.use(cors()) ;
connectToMongo();
app.use(express.json());
// app.use(cors);

app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));

app.listen(5000 , ()=>{
  console.log('http://127.0.0.1:5000');
})
