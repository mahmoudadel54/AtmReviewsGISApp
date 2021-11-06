const mongoose = require('mongoose')

const {Schema} = mongoose;


const reviewSchema = Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User ' },
  atmId: { type: Schema.Types.ObjectId, ref: 'ATM ' },
  title: { type: String, required: true, minlength:5, maxlength:20, index:true },
  reviewContent: {type: String, required: true },
},
{timestamps: { createdAt: true, updatedAt: true }
})

const Review = mongoose.model('Review', reviewSchema)


  module.exports = Review