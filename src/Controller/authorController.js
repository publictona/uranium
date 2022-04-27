const authorModel = require('../Models/AuthorModel')

const createAuthor = async (req, res) => {
  try {
    let data = req.body
    let savedData = await authorModel.create(data)
    if (!savedData) {
      res.status(404).send({ msg: 'auther not created' })
    }
    res.status(200).send({ msg: savedData })
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ error: err.message })
  }
}

module.exports = { createAuthor }
