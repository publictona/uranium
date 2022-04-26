const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
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
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['technology', 'entertainment', 'lifestyle', 'food', 'fashion'],
    },
    subcategory: {
      type: [String],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.Schema('blog', blogSchema)
