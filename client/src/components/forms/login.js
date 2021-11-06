import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";
import axiosInstance from "../../utils/axiosInstance";

function LoginForm(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (value) setData({ ...data, [name]: value });
  };
  const handleSubmit = async () => {
    const { getLoginData, openLoaderForLoginRequest, failToLogin, history } =
      props;
    if (data.email && data.password) {
      console.log("submit", data);
      try {
        openLoaderForLoginRequest();
        let res = await axiosInstance.post("/user/login", data);
        if (res.status === 200) {
          console.log(res.data);
          getLoginData(res.data);
          history.replace("/index");
        } else {
          failToLogin("Invalid Inputs");
          console.log("something error");
        }
      } catch (error) {
        failToLogin("Server Error");
        console.log("something error");
      }
    } else console.log("invalid input data", data);
  };
  if (props.isAuth) return <Redirect to="/" />;
  else
    return (
      <div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 bt-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
      <div className="submit-btn-container">

        <button onClick={handleSubmit} className="submit-btn btn btn-primary">
          Sign in
        </button>
      </div>
      </div>
    );
}
const mapStateToProps = ({ user }) => {
  return {
    isAuth: user.auth.isAuth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    openLoaderForLoginRequest: () => dispatch({ type: "OPEN_LOADER" }),
    getLoginData: (payload) => dispatch({ type: "LOGIN_SUCCESS", payload }),
    failToLogin: (payload) => dispatch({ type: "FAILURE_IN_REQUEST", payload }),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
