const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  atmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Atm' },
  title: { type: String, required: true, minlength:5, maxlength:20, default:"title review" },
  reviewContent: {type: String, required: true },
  rating:{ type:Number }
},
{timestamps: { createdAt: true, updatedAt: true }
})

const Review = mongoose.model('Review', reviewSchema)


  module.exports = Review