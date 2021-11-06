import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import axiosInstance from "../../utils/axiosInstance";

function RegisterForm(props) {
    const [data, setData] = useState({
        email:"",
        password:"",
        confirmedPassword:"",
        username:""
    });
    const formRef = useRef(null);
    const handleChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        if(value) setData({...data, [name]:value});
    }
    const handleSubmit =async()=>{
      const { openLoaderForRegisterRequest, failToRegister, getRegisterData, history } = props;
        if(data.email&&data.password&&data.password===data.confirmedPassword&&data.username)
       {
           console.log("submit", data);
        try {
          openLoaderForRegisterRequest();
            delete data.confirmedPassword;
            console.log({data});
            let res = await axiosInstance.post("/user/register",data)       
            if(res.status===201){
                console.log(res.data);
                getRegisterData(res.data);
                history.replace("/index");
            }else{
            console.log("something error");  
            failToRegister("Invalid Inputs");
            }
        } catch (error) {
          failToRegister("Invalid Inputs");  
          console.log("something error");
        }
    
    }
        else console.log("invalid input data",data);
    }
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
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          User Name
        </label>
        <input
          type="text"
          name="username"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Mahmoud Adel"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
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
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Confirmed Password
        </label>
        <input
          type="password"
          name="confirmedPassword"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter the confirmed password"
          onChange={handleChange}
        />
      </div>
      <div className="submit-btn-container">
  <button onClick={handleSubmit} className="btn btn-primary">Register</button>
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
    openLoaderForRegisterRequest: () => dispatch({ type: "OPEN_LOADER" }),
    getRegisterData: (payload) => dispatch({ type: "REGISTER_SUCCESS", payload }),
    failToRegister: (payload) => dispatch({ type: "FAILURE_IN_REQUEST", payload }),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterForm));
