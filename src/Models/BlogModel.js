const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Author',
    },
    tags: {
      type: [String],
      // required: true, // this is not mandatory // its printing null null 
    },
    category: {
      type: String, 
      required: true,
    },
    subcategory: {
      type: [String],
    },
    deletedAt: {
      type: Date,
      default: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: Date,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('blog', blogSchema)
