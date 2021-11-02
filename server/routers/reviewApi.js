const express = require("express");
const mongoose = require("mongoose");
const Review = require("../models/reviewModel");
const AtmModel = require('../models/atmModel')
///express.Router is an express instance isolated from app
//enable me to make all request methods
const reviewRouter = express.Router();

//get all reviews
reviewRouter.get("/", (req, res, next) => {
    Review.findOne({}, (err, data) => {
      if (err) {
        return next(err);
      }else
      {
        res.send(data);
      }
    });
  });
  


//get by review id
reviewRouter.get("/:id", (req, res, next) => {
  const {
    params: { id },
  } = req;
  Review.findOne({ _id: id }, (err, data) => {
    if (err) {
      return next(err);
    }
    {
      res.send(data);
    }
  });
});



//create a review
reviewRouter.post("/", (req, res, next) => {
  const { reviewContent, title, userId, atmId } = req.body;
  const newReview = {
    title: title,
    reviewContent: reviewContent,
    userId: userId,
    atmId: atmId,
  };
  Review.create(newReview)
    .then((data) => {
      res.send("Review added successfully");
    })
    .catch((error) => {
        next(error)
        // res.send("Failed to Add");
    });
});

//done
reviewRouter.delete("/:id", (req, res, next) => {
  const {
    params: { id },
  } = req;
  console.log(555);
  Review.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.send(data);
    }
  });
});

//done
reviewRouter.patch("/:id", (req, res, next) => {
  const {reviewContent, title } = req.body;
  const {
    params: { id },
  } = req;

  const updatedReview = {
    title: title,
    reviewContent: status,
  };
  Review.updateOne({ _id: id }, { $set: updatedReview }, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.send("Edited Successfully");
    }
  });
});

//get by atmId & userID
reviewRouter.get("/:atmId/:userId", (req, res, next) => {
    const {
      params: { atmId,userId },
    } = req;
    Review.find({ atmId, userId }, (err, data) => {
      if (err) {
        return next(err);
      }
      {
        res.send(data);
      }
    });
  });

//get by atmId 
reviewRouter.get("/atmid/:atmId", (req, res, next) => {
    const {
      params: { atmId },
    } = req;
    Review.find({ atmId }, (err, data) => {
      if (err) {
        return next(err);
      }
      {
        res.send(data);
      }
    });
  });
  //get by userId 
reviewRouter.get("/userid/:userId", (req, res, next) => {
    const {
      params: { userId },
    } = req;
    Review.find({ userId }, (err, data) => {
      if (err) {
        return next(err);
      }
      {
        res.send(data);
      }
    });
  });

module.exports = {
  reviewRouter,
};
