const express = require('express');

var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const today = new Date().toLocaleString()
app.use((req,res,next) => {
    console.log(today +' , '+ req.path +' , '+ req.socket.remoteAddress )
    next();
})

const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://Sushma123:oPRb0pySPR0iiGiz@cluster0.wp92b.mongodb.net/mongoosedb?authSource=admin&replicaSet=atlas-4x5pr3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
 {useNewUrlParser: true})
    .then(() => console.log('Hey Sushma !!! Go Ahead Mongo is connected'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});







