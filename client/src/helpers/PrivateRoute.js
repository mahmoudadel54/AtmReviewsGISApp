import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

//mapping

const PrivateRouter = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...rest} {...props} /> : <Redirect push to="Login" />
      }
    />
  );
};
const mapStateToProps =({user})=>{
    return{
        isAuth:user.auth.isAuth
    }
}
export default connect(
    mapStateToProps
)(PrivateRouter)
