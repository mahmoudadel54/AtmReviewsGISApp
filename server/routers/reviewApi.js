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
  const { reviewContent, title, ownerId, atmId,rating } = req.body;
  const newReview = {
    title,
    reviewContent,
    ownerId,
    atmId,
    rating
  };
  console.log(newReview);
  Review.create(newReview)
    .then((data) => {
      res.send({msg:"Review added successfully", data});
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
    title,
    reviewContent,
  };
  Review.updateOne({ _id: id }, { $set: updatedReview }, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.send({msg:"Edited Successfully", data});
    }
  });
});

//get by atmId & userID
reviewRouter.get("/:atmId/:ownerId", (req, res, next) => {
    const {
      params: { atmId,ownerId },
    } = req;
    if(!["atmid","ownerId"].includes(atmId))
    Review.find({ atmId, ownerId }).populate("ownerId", 'username').exec((err,data) => {
      if(err){
        console.log(err);
        err.status = 403;
      return next(err);
      }else
        res.send(data);
    })
    else next()
  });

//get by atmId 
reviewRouter.get("/atmid/:atmId", (req, res, next) => {
    const {
      params: { atmId },
    } = req;
    if(req.originalUrl.split("/").includes("atmid"))
    Review.find({ atmId }).populate("ownerId", 'username').exec((err, data) => {
      if (err) {
        return next(err);
      }else
      {
        res.send(data);
      }
    });
    else next()
  });
  //get by userId 
reviewRouter.get("/ownerId/:ownerId", (req, res, next) => {
    const {
      params: { ownerId },
    } = req;
    if(req.originalUrl.split("/").includes("ownerId"))
    Review.find({ ownerId }, (err, data) => {
      if (err) {
        return next(err);
      }
      {
        res.send(data);
      }
    });
    else next()
  });

module.exports = reviewRouter;
