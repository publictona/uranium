const mongoose = require('mongoose')
const authorSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim:true
    },
    lname: {
      type: String,
      required: true,
      trim:true,
    },
    title: {
      type: String,
      require: true,
      enum: ['Mr', 'Mrs', 'Miss'],
    },
    email: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Author', authorSchema)
