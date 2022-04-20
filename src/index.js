const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://pattamu:iKHwECgQCaYNVpge@sandeepcluster.9rzkh.mongodb.net/SushmaLandge", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )
const today = new Date().toLocaleString()
app.use((req,res,next) =>{
    console.log(today + ' , ' +req.path + ' , '+ req.socket.remoteAddress)
    next();
})


app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
