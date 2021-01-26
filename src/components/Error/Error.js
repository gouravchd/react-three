import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions,alertActions } from '../../actions';
class Error extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<div className="login-register">
				<div className="card-body">
					<h1 className="text-center text-warning">Opps!! Page Not Found</h1>
				</div>
			</div>
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

const connectedErrorPage = connect(mapState, actionCreators)(Error);
export { connectedErrorPage as Error };