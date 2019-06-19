import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.sass';
import { connect } from 'react-redux';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import 'semantic-ui-css/semantic.min.css'


class App extends Component {
  // constructor(props) {
  //   super(props);

  // }
  componentDidMount() {

  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      // console.log('new props');
      if (this.props.auth.isAuth === true) {
        //check if logged in and token is valid, otherwise redirect to login
        if (!this.props.isLoading && !this.props.items) {
          this.props.loadUserSetupData();
        }
        // console.log('props updated, isAuth')
        return null;
      } else if (this.props.auth.isError) {
        // console.log('props updated, isNOTAuth', this.props.auth)
      }
    } else if (prevState !== this.state) {
      // console.log('updated state');
      return;
    } else if (snapshot !== null) {
      // console.log('snapshot exists');
      return;
    }
    return null;
  }



  render() {
    return (
      <div className="App">
        <Switch>
          {/* <Route path="/faq" component={Faq} />
          <Route path="/reset-password/:email/:token" component={EnterNewPassword} /> */}
          <Route path="/about" component={About} />
          <Route component={Home} />
        </Switch>

      </div>
    );
  }
}
const mapStateToProps = state => ({
  // ...state
  // items: state.lenderReducer.userData.items,
  // isLoading: state.lenderReducer.userData.isLoading,
  // auth: state.auth,
  router: state.router
})

export default connect(mapStateToProps, { 
  // checkForToken, loadUserSetupData
 })(App);
