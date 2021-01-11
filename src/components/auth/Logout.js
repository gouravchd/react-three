import React, { Component } from 'react';
import {	Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';

class Logout extends Component {
	constructor(props) {
		super(props);
		this.props.logout();
	}
    componentDidMount(){
       console.log(45);
       
    }
    
	render(){
		return(
            null
		)
	}
}
function mapState(state) {
	const { loggingIn } = state.authentication;
	return { loggingIn };
}

const actionCreators = {
	login: userActions.login,
	logout: userActions.logout
};

const connectedLogoutPage = connect(mapState, actionCreators)(Logout);
export { connectedLogoutPage as Logout };
