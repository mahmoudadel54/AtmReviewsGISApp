import React, { useState, useEffect } from 'react'
import {Button, Modal} from 'react-bootstrap'
import { connect } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';

function EditReview(props) {    
    const handleClose = () => props.setShow(false);
    const [data, setData] = useState({
        title: "",
        reviewContent: "",
      });
      useEffect(() => {
          let review = props.reviewList.find(r=>r._id===props.editReviewID);
         setData({
            title:review?review.title:"",
            reviewContent:review?review.reviewContent:"",  
        })
        return () => {
          
        }
      }, [])
      const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (value) setData({ ...data, [name]: value });
      };
      const handleSubmit = async () => {
          const {  openLoader, failRequest, editReviewFunc } = props;
        if (data.title && data.reviewContent) {
          try {
            openLoader();
            let res = await axiosInstance.patch(`/review/${props.editReviewID}`, 
            {...data },
            {
                headers:{
                    authorization:props.user.token
                }
            });
            if (res.status === 200) {
              console.log(res.data);
              editReviewFunc(data,props.editReviewID);
              props.setEditReviewID("")
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
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Title Review
          </label>
          <input
            type="title"
            name="title"
            value={data.title}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter the review title "
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 bt-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
         Content Review
          </label>
          <input
            type="reviewContent"
            name="reviewContent"
            value={data.reviewContent}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter your the review content"
            onChange={handleChange}
          />
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
      user:user.auth.user,
      reviewList:user.reviewList
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      openLoader: () => dispatch({ type: "OPEN_LOADER" }),
      editReviewFunc: (payload, reviewId) => dispatch({ type: "EDIT_REVIEW", payload,reviewId }),
      failRequest: (payload) => dispatch({ type: "FAILURE_IN_REQUEST", payload }),
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(EditReview)