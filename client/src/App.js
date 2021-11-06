import { Route, Redirect, Switch } from 'react-router-dom'
import NavBar from './layout/navBar';
import NotFoundPage from './pages/404page';
import Home from './pages/home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Loader from "react-loader";
import { connect } from 'react-redux';
import PrivateRoute from './helpers/PrivateRoute';
import WelcomePage from './pages/welcomePage';
function App(props) {
  return (
    <div className="App">
       <Loader
        loaded={!props.loading}
        lines={13}
        length={20}
        width={10}
        radius={30}
        corners={1}
        rotate={0}
        direction={1}
        color="#000"
        speed={1}
        trail={60}
        shadow={false}
        hwaccel={false}
        className="spinner"
        zIndex={2e9}
        top="50%"
        left="50%"
        scale={1.0}
        loadedClassName="loadedContent"
      />
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
