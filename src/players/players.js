const express = require('express');
const router = express.Router();

const players = [{
        name: "manish",
        dob: "01/01/1995",
        gender: "male"
    },{
        name: 'gopal',
        dob: '01/09/1995',
        gender: 'male',
        city: 'delhi'
    },{
        name: 'lokesh',
        dob: '01/02/1992',
        gender: 'male',
        city: 'mumbai',
    }
]

router.post('/add-player', function(req,res){
const newName = req.body.name
    let flag = false
    for(let i=0; i<players.length; i++){
        if(players[i].name === newName){
            flag = true
            res.send({message: "Player '" + newName + "' already exist in the list"})
        }
    }
    if(!flag){
    players.push(req.body)
    res.send(players)
    }
});

module.exports = router;


//module.exports.players= players;