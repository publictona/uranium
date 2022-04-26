const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    body: {
      type: String,
      require: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Author',
    },
    tags: {
      type: Array,
      require: true,
    },
    category: {
      type: String,
      require: true,
      enum: ['technology', 'entertainment', 'lifestyle', 'food', 'fashion'],
    },
    subcategory: {
      type: Array,
    },
    deletedAt: {
      type: Date,
      require: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      require: true,
    },
    isPublished: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  { timestamp: true },
)

module.exports = mongoose.Schema('blogSchema', blogSchema)
