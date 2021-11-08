import React, { useState } from "react";
import { connect } from "react-redux";
import AddReview from "../modals/addReview";
import DeleteReview from "../modals/DeleteReview";
import EditReview from "../modals/editReview";

function ReviewsList(props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editReviewID, setEditReviewID] = useState("");
  const [deleteReviewID, setDeleteReviewID] = useState("");
  const handleAddReview = () => {
    setShowAddModal(true);
    console.log("add review");
  };
  const handleDelete = (reviewId) => {
      setShowDeleteModal(true)
    setDeleteReviewID(reviewId);
    console.log("delete", reviewId);
  };
  const handleEdit = (reviewId) => {
      setShowEditModal(true)
    setEditReviewID(reviewId);
    console.log("edit review", reviewId);
  };
  const handleHideReviewsList = () => {
    props.setShowReviewList({ bool: false, atmId: "", latlng: "" });
    props.clearReviewsList();
  };
  const handleZoom = () => {
    const { mapInstance } = props;
    mapInstance.flyTo(props.showReviewList.latlng);
  };
  return (
    <>
      <div class="reviews-list-container card text-center">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            background: "gray",
          }}
        >
          <div class="card-header">Atm Reviews</div>
          <span
            title="Zoom To"
            className="btn"
            onClick={handleZoom}
          >
            <strong
              style={{
                fontSize: "15px",
                color:"white"
              }}
            >
              <i className="fas fa-search-location fa-2x"></i>
            </strong>
          </span>
          <span
            title="Add Review"
            className="btn"
            onClick={handleAddReview}
          >
            <strong
              style={{
                fontSize: "15px",
                color:"white"
              }}
            >
             <i className="fas fa-plus-circle"></i>
            </strong>
          </span>
          <span
            title="Hide"
            className="btn"
            onClick={handleHideReviewsList}
          >
            <strong
              style={{
                fontSize: "15px",
                color: "red",
              }}
            >
              <i className="far fa-times-circle"></i>
            </strong>
          </span>
        </div>

        {props.reviewList.length ? (
          props.reviewList.map((r, index) => (
            <div>
              <div class={"card-body"}>
                {/* <h5 class="card-title">Title: {r.title}</h5> */}
                <p class="card-text">{r.reviewContent}</p>
                {r.rating&&<p class="card-text">{Array(r.rating).fill(1).map(r=><>
                  <svg 
                width="15" 
                height="15" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#393939" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                style={{
                  fill: 'yellow'
              }}
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
                </>)}
                </p>}
                <p class="card-text" style={{fontSize:"10px"}}>Created at ({r.createdAt.split("T")[0]})</p>

                <button
                  onClick={() => handleEdit(r._id)}
                  class="btn btn-secondary p-1 m-1"
                  title="Edit Review"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() => handleDelete(r._id)}
                  class="btn btn-secondary p-1 m-1"
                  title="Delete Review"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <h5>No Reviews </h5>
        )}
      </div>
      {showAddModal&&<AddReview
        show={showAddModal}
        setShow={setShowAddModal}
        atmData={props.showReviewList}
      />}
      {showEditModal&&<EditReview
        show={showEditModal}
        setShow={setShowEditModal}
        editReviewID={editReviewID}
        setEditReviewID={setEditReviewID}
      />}
      {showDeleteModal&&<DeleteReview
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        deleteReviewID={deleteReviewID}
        setDeleteReviewID={setDeleteReviewID}
      />}
    </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    clearReviewsList: () => dispatch({ type: "CLEAR_REVIEWS" }),
  };
};
const mapStateToProps = (state) => {
  let { user } = state;
  return {
    reviewList: user.reviewList,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsList);
