const express = require("express");
const AtmModel = require('../models/atmModel')

///express.Router is an express instance isolated from app
//enable me to make all request methods
const atmRouter = express.Router();

//get all atms
atmRouter.get("/", (req, res, next) => {

  AtmModel.find({},{_id:0}, (err, data) => {
    if (err) {
      return next(err);
    }else
    {
      if(data){
        res.send(data);
      }else{
        let error = new Error("No data found");
        error.status = 403;
        next(error)
      }
    }
  });
});
//get by id
atmRouter.get("/:id", (req, res, next) => {
  const {
    params: { id },
  } = req;
  console.log(req.params);
  AtmModel.findOne({ _id: id }, (err, data) => {
    if (err) {
      err.status = 403;
      return next(err);
    }else
    {
      if(data){
        res.send(data);
      }else{
        let error = new Error("No found data");
        error.status = 403;
        next(error)
      }
    }
  });
});

//create a review
atmRouter.post("/create", (req, res, next) => {
  const { geojson, userId } = req.body;
  const newATM = {
    geojson, userId
  };
  AtmModel.create(newATM)
    .then((data) => {
      res.send("ATM added successfully");
    })
    .catch((error) => {
      error.message="Failed to Add";
        next(error)
    });
});

//done
atmRouter.delete("/:id", (req, res, next) => {
  const {
    params: { id },
  } = req;
  console.log(555);
  AtmModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.send(data);
    }
  });
});

//done
atmRouter.patch("/:id", (req, res, next) => {
  const {geojson } = req.body;
  const {
    params: { id },
  } = req;

  const updatedAtm = {
   geojson
  };
  AtmModel.updateOne({ _id: id }, { $set: updatedAtm }, (err, data) => {
    if (err) {
      err.status = 403;
      return next(err);
    } else {
      res.send("Edited Successfully");
    }
  });
});

//get by userID
atmRouter.get("/userid/:userId", (req, res, next) => {
    const {
      params: { userId },
    } = req;
    console.log(req.params);
    AtmModel.find({ userId },{ __v:0} ,(err, data) => {
      if (err) {
        return next(err);
      }
      {
        res.send(data);
      }
    });
  });
module.exports = {
  atmRouter,
};
