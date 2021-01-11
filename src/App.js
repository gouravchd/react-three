import React, { Component } from 'react';
import { Router, Route,Switch,BrowserRouter } from 'react-router-dom';
import {Login} from './components/auth/Login';
import { Register } from './components/auth/Register';
import {Home} from './components/Home/Home';
import {Dashboard} from './components/Dashboard/Dashboard';
import {Error} from './components/Error/Error';
import {Logout} from './components/auth/Logout';
import {Topbar} from './components/layout/Topbar';
import {Sidebar} from './components/layout/Sidebar';
import {ToastError} from './components/layout/ToastError';
import { history } from './helpers';
import { PrivateRoute } from './components/PrivateRoute'
import { PublicRoute } from './components/PublicRoute';
import { connect } from 'react-redux';
import { alertActions,loaderActions } from './actions';
import {Users} from './components';
import './App.css';
import './App.scss';
import { css } from "@emotion/core";
import {ClipLoader,BarLoader} from "react-spinners";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  transform-origin: center center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sidebarPushCollapsed: false,
      sidebarToggle:false,
    };
    history.listen((location, action) => {
        // clear alert on location change
        this.props.clearAlerts();
    });
    this.handleClick = this.handleClick.bind(this);
    this.handleClickMob = this.handleClickMob.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }
  onToggle() {
    this.setState({
      sidebarToggle: false,
      sidebarPushCollapsed:false,
    });
  }
  handleClickMob() {
    
    this.setState({
      sidebarToggle: !this.state.sidebarToggle
    });
  }
  handleClick() {
    //console.log(34);
    this.setState({
        sidebarPushCollapsed: !this.state.sidebarPushCollapsed
    });
  }
  render() {
    const { alert,loader } = this.props;
  // console.log(alert);
    return (
      
      <div className={`app  ${this.state.sidebarToggle ? 'toggled' : ''}`}>
          <ToastError />
          { loader.type && 
            <div className="sweet-loading">
              <BarLoader
                css={override}
                size={150}
                color={"#123abc"}
                loading={true}
              />
              </div>
          }
        <Router history={history} >
          {this.props.authentication.loggedIn && 
            <Sidebar sidebarPushCollapsed={this.state.sidebarPushCollapsed} sidebarToggle={this.state.sidebarToggle} onToggle={this.onToggle} />
          }
          <main>
          {alert.action_type=='LOGIN' && alert.message &&
            <div className={` ${alert.message ? 'd-block' : 'd-none'} mb-0 b-0 alert alert-dismissible fade show ${alert.type}`} role="alert">
              {alert.message}
              <button type="button" className="close d-none" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
          }
          {this.props.authentication.loggedIn && 
            <Topbar handleClick={this.handleClick} handleClickMob={this.handleClickMob}   />
          }
            
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/users" component={Users} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/register" component={Register} />
                <Route component={Error} />
              </Switch>
            
          </main>
        </Router>
      </div>
     
    );
  }
}

function mapState(state) {
  const { alert,loader,authentication } = state;
  return { alert,loader,authentication };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
