const mongoo = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017"

const connectToMongo = ()=>{
    mongoo.connect(mongoURI , {useNewUrlParser: true, 
        useUnifiedTopology: true,});
}

module.exports = connectToMongo;