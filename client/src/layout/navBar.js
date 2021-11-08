import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'
import LOGO from "../assets/images/atm_app_logo.png";
function NavBar(props) {
  const handleLogout =()=>{
    props.logout();
    props.history.replace("/")
  }
  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand"> <img src={LOGO} alt="app logo" style={{width:"2.2rem"}} /> Review Application</Link>
          <div className="d-flex">
            {!props.isAuth?<><Link to="/register" className="btn btn-secondary m-1">
              Register
            </Link>
            <Link to="/login" className="btn btn-outline-success m-1">
              Login
            </Link></>:<>
            <strong className="username-in-nav m-1">Hi {props.user.username} !!</strong>
            <button to="/" className="btn btn-danger m-1" onClick={handleLogout}>
              Log out
            </button>
            </>
            }
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
const mapStateToProps =({user})=>{
  return{
    isAuth:user.auth.isAuth,
    user:user.auth.user
  }
}

const mapDispatchToProps =(dispatch)=>{
  return{
    logout:()=>dispatch({type:"LOGOUT"})
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NavBar));
