import { Route, Redirect, Switch } from 'react-router-dom'
import NavBar from './layout/navBar';
import NotFoundPage from './pages/404page';
import Home from './pages/home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import ClipLoader from "react-spinners/ClipLoader";7
import Spinner from 'react-bootstrap/Spinner'
import { connect } from 'react-redux';
import PrivateRoute from './helpers/PrivateRoute';
import WelcomePage from './pages/welcomePage';
function App(props) {
  return (
    <div className="App">
      {props.loading?<div className="loader-wrapper"><Spinner animation="border" size="xlg"  /></div> :null}
       {/* <ClipLoader
        loading={props.loading}
        size={35}
        color="#000"

      /> */}
      <NavBar />
      <main>
        <Switch>
          <Route path="/home" component={WelcomePage} /> 
        <PrivateRoute path="/index" component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Redirect from="/" to="/home" />
        <Route path="*" render={(props)=> <NotFoundPage {...props} /> } />
      </Switch>
      </main>
    </div>
  );
}
const mapStateToProps =({user})=>{
  return{
    loading:user.loading
  }
}
export default connect(mapStateToProps)(App);
