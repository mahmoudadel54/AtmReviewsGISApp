import axiosInstance from "../../utils/axiosInstance";

//action creaters
export const fetchUsersRequest = () => {
  return {
    type: "FETCH_USERS_REQUEST",
  };
};

//in case of fetching data
export const fetchUsersSuccess = (users) => {
  return {
    type: "FETCH_USERS_SUCCESS",
    payload: users,
  };
};
// export const
//in case of failure in fetching data
export const fetchUsersFailure = (error) => {
  return {
    type: "FETCH_USERS_FAILURE",
    payload: error,
  };
};

//async fetch function is a spacial action creator that return action creator
export const fetchUsers = (url) => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axiosInstance
      .get(url)
      .then((res) => {
        let users = res.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        let err = error.message;
        dispatch(fetchUsersFailure(err));
      });
  };
};


export const createUSer = (url) => {
    return (dispatch) => {
      dispatch(fetchUsersRequest());
      axiosInstance
        .get(url)
        .then((res) => {
          let users = res.data;
          dispatch(fetchUsersSuccess(users));
        })
        .catch((error) => {
          let err = error.message;
          dispatch(fetchUsersFailure(err));
        });
    };
  };
export const  checkAuth =async(url, action)=>{
  try {
    let res = await axiosInstance.get(url);
    return res
  } catch (error) {
    console.log(error);
    return "not authorized"
  }
}
