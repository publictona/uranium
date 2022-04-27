const mongoose = require('mongoose')
const authorSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      require: true,
      enum: ['Mr', 'Mrs', 'Miss'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: 'Please fill a valid email address',
      },
      required: [true, 'Email required'],
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Author', authorSchema)
