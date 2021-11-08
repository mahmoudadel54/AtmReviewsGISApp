import React, { useState } from 'react'
import {Button, Modal} from 'react-bootstrap'
import { connect } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import RatingStars from '../RatingComponents/ratingStarsComp';

function AddReview(props) {
    
    const handleClose = () => props.setShow(false);
    const [data, setData] = useState({
        // title: "",
        reviewContent: "",
        rating:""
      });
      const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (value) setData({ ...data, [name]: value });
      };
      const handleSubmit = async () => {
          const {  openLoader,failRequest , addReviewFunc } =
          props;
        if (data.reviewContent&&data.rating) {
          try {
            openLoader();
            let res = await axiosInstance.post("/review", {...data,atmId:props.atmData.atmId, ownerId:props.user.id },{
                headers:{
                    authorization:props.user.token
                }
            });
            if (res.status === 200) {
              console.log(res.data);
              addReviewFunc({...res.data.data, ownerId:{_id:props.user.id, username:props.user.username}});
              handleClose();
            } else {
              failRequest("Invalid Inputs");
              console.log("something error");
            }
          } catch (error) {
            failRequest("Server Error");
            console.log("something error");
          }
        } else console.log("invalid input data", data);
      };
    return (
        <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Title Review
          </label>
          <input
            type="title"
            name="title"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter the review title "
            onChange={handleChange}
          />
        </div> */}
        <div className="mb-3 bt-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
         Content Review
          </label>
          <input
            type="reviewContent"
            name="reviewContent"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter your the review content"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 bt-3">
         
        <RatingStars data={data} setData={setData} />
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
</>
    )
}
const mapStateToProps = ({ user }) => {
    return {
      isAuth: user.auth.isAuth,
      token: user.auth.user.token,
      user:user.auth.user
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      openLoader: () => dispatch({ type: "OPEN_LOADER" }),
      addReviewFunc: (payload) => dispatch({ type: "ADD_REVIEW", payload }),
      failRequest: (payload) => dispatch({ type: "FAILURE_IN_REQUEST", payload }),
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(AddReview)
