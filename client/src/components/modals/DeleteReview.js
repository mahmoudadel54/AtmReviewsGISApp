import React, { useState } from 'react'
import {Button, Modal} from 'react-bootstrap'
import { connect } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';

function DeleteReview(props) {    
    const handleClose = () => props.setShow(false);
 
   
      const handleSubmit = async () => {
          const {  openLoader, failRequest, editReviewFunc } = props;
          try {
            openLoader();
            let res = await axiosInstance.delete(`/review/${props.deleteReviewID}`, 
            {
                headers:{
                    authorization:props.user.token
                }
            });
            if (res.status === 200) {
              console.log(res.data);
              props.deleteReviewFunc(props.deleteReviewID);
              props.setDeleteReviewID("")
              handleClose();
            } else {
              failRequest("Invalid Inputs");
              console.log("something error");
            }
          } catch (error) {
            failRequest("Server Error");
            console.log("something error");
          }
      };
    return (
        <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation to delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="mb-3">
      Are you sure to delete this review ???
        </div>
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Yes
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
      deleteReviewFunc: (reviewId) => dispatch({ type: "DELETE_REVIEW",reviewId }),
      failRequest: (payload) => dispatch({ type: "FAILURE_IN_REQUEST", payload }),
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(DeleteReview)