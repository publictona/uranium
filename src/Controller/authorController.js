const authorModel = require('../models/authorModel')
const jwt = require('jsonwebtoken')

var passwordValidator = require('password-validator')

const createAuthor = async (req, res) => {
  try {
    let data = req.body
    let {email, fname,lname,title,password} = req.body
    var schema = new passwordValidator ()
    schema.is().min(8).is().max(100).has().uppercase().has().lowercase().has().digits(2).has().not().spaces().is().not().oneOf(["Passw0rd", "Password123", "myPassword@123"])
    const isPasswordValidate = schema.validate (password)
    console.log(isPasswordValidate)

    if (!fname) {
      res.status(401).send({error: "fname is missing"})
    }

    if(!lname) {
      res.status(401).send({error: "lname is missing"})
    }

    if(!title) {
      res.status(401).send({error: "title is not present"})
    }

    if(!email) {
      res.status(401).send({error: "Email is not present"})
    }

    if(!(title == "Mrs" || title == "Mr" || title == "Miss")) {
             res.status(401).send({error : "title has to be Mr or Mrs or Miss "})
    }

    if(!password) {
      res.status(401).send({error: "password is missing"})
    }
    
    if (isPasswordValidate === false) {
      res.status(401).send({error : "password isn't validate, please make sure length is minimum 8, should have one uppercase and lowercase character and Number also and donot use space and have a special character"})
    }

    console.log(email)
    let isValidEmail = await validator.validate(email)

    if (!isValidEmail){
      res.status(401).send({error: "email is not valid"})
    }

    let isUniqueEmail = await authorModel.find({email:email })
    console.log(isUniqueEmail)
    
    if (isUniqueEmail[0]) {
      res.status(401).send({error : "email already exists/ Not unique"})
    }

    let savedData = await authorModel.create(data)
    
    if (!savedData) {
      res.status(401).send({ msg: 'auther not created' })
    }
    res.status(200).send({ msg: savedData })
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ error: err.message })
  }
}

const loginUser = async function (req,res) {
  let checkEmail = req.body.email
  let checkPassword = req.body.password
  
  if (!checkEmail) {
    res.status(404).send({error : "email is missing"})
  }

  if (!checkPassword) {
    res.status(404).send({error : "password is missing"})
  }

  let user = await authorModel.findOne({ email: checkEmail, password: checkPassword });
 
  if(!user) {
    res.status(404).send({error : "check your email or password"})
  }

    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "uranium",
        organisation: "FUnctionUp",
      },"functionup-uranium");
    
    res.setHeader("x-api-key", token);
    res.send({ status: true, data: token });
  };

module.exports.loginUser = loginUser
module.exports.createAuthor = createAuthor    
             
           