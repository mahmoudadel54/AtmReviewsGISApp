import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'
function NavBar(props) {
  const handleLogout =()=>{
    props.logout();
    props.history.replace("/")
  }
  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand">Review Application</Link>
          <div className="d-flex">
            {!props.isAuth?<><Link to="/register" className="btn btn-secondary">
              Register
            </Link>
            <Link to="/login" className="btn btn-outline-success">
              Login
            </Link></>:<>
            <strong className="username-in-nav">Hi {props.user.username} !!</strong>
            <button to="/" className="btn btn-danger" onClick={handleLogout}>
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
