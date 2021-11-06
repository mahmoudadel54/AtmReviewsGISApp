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
  const { reviewData, setReviewData, mapInstance } = props;
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
          <button
            title="Add Review"
            className="btn btn-primary"
            onClick={handleZoom}
          >
            <strong
              style={{
                fontSize: "15px",
              }}
            >
              <i className="fas fa-search-location fa-2x"></i>
            </strong>
          </button>
          <button
            title="Add Review"
            className="btn btn-primary"
            onClick={handleAddReview}
          >
            <strong
              style={{
                fontSize: "15px",
              }}
            >
             <i className="fas fa-plus-circle"></i>
            </strong>
          </button>
          <button
            title="Hide"
            className="btn btn-danger"
            onClick={handleHideReviewsList}
          >
            <strong
              style={{
                fontSize: "15px",
                color: "white",
              }}
            >
              <i className="far fa-times-circle"></i>
            </strong>
          </button>
        </div>

        {props.reviewList.length ? (
          props.reviewList.map((r, index) => (
            <div>
              <div class={index % 2 !== 1 ? "card-body m-2" : "card-body highlighted m-2"}>
                <h5 class="card-title">{r.title}</h5>
                <p class="card-text">{r.reviewContent}</p>
                <button
                  onClick={() => handleEdit(r._id)}
                  class="btn btn-primary p-1 m-1"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() => handleDelete(r._id)}
                  class="btn btn-secondary p-1 m-1"
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
