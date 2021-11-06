const initialState = {
  loading: false,
  reviewList: [],
  auth: {
    user: null,
    isAuth: false,
  },
  error: "",
};

const userReducer = (state = { ...initialState }, action) => {
  let reviewListClone, reqReviewIndex;
  switch (action.type) {
    case "OPEN_LOADER":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("tokenReviewApp", action.payload.token);
      return {
        ...state,
        loading: false,
        auth: {
          user: action.payload,
          isAuth: true,
        },
        error: "",
      };
    case "FAILURE_IN_REQUEST":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      localStorage.setItem("tokenReviewApp", action.payload.token);
      localStorage.setItem(
        "userReviewApp",
        JSON.stringify(action.payload.token)
      );
      return {
        ...state,
        loading: false,
        auth: {
          user: action.payload,
          isAuth: true,
        },
        error: "",
      };
    case "LOGOUT":
      localStorage.removeItem("tokenReviewApp");
      return {
        ...state,
        loading: false,
        auth: {
          user: null,
          isAuth: false,
        },
        error: "",
      };
    case "SET_REVIEWS":
      return {
        ...state,
        loading: false,
        reviewList: action.payload,
      };
    case "CLEAR_REVIEWS":
      return {
        ...state,
        loading: false,
        reviewList: [],
      };
    case "EDIT_REVIEW":
      reviewListClone = [...state.reviewList];
      reqReviewIndex = reviewListClone.findIndex((r) => r._id === action.reviewId);
      if (reqReviewIndex >= 0)
        reviewListClone[reqReviewIndex] = {
          ...reviewListClone[reqReviewIndex],
          ...action.payload,
        };
      return {
        ...state,
        loading: false,
        reviewList: reviewListClone,
      };
    case "DELETE_REVIEW":
      reviewListClone = [...state.reviewList];
      reqReviewIndex = reviewListClone.findIndex((r) => r._id === action.reviewId);
      if (reqReviewIndex >= 0) reviewListClone.splice(reqReviewIndex, 1);
      return {
        ...state,
        loading: false,
        reviewList: reviewListClone,
      };
    case "ADD_REVIEW":
      return {
        ...state,
        loading: false,
        reviewList: [...state.reviewList, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
