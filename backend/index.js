const connectToMongo = require("./db");

const express = require('express')
connectToMongo();
const app = express();
app.use(express.json());

app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));

app.listen(5000 , ()=>{
  console.log('http://127.0.0.1:5000');
})
