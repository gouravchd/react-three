import React, { Component } from 'react';
import {	Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import { appConstants,history } from '../../helpers';
class Login extends Component {
	constructor(props) {
		super(props);
		this.props.logout();
		this.state = {
			email: '',
			password: '',
			submitted: false
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.submitLogin = this.submitLogin.bind(this);
		
	}

	handleInputChange(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}

	submitLogin(e) {
		e.preventDefault();
		this.setState({ submitted: true });
		const { email, password } = this.state;
	
		if (email && password) {
			this.props.login(email, password);
		}
	}

	render(){
		const { loggingIn } = this.props;
		const { email, password, submitted } = this.state;
		return(
			<section id="wrapper">
				<div className="login-register" style={{backgroundImage: 'url(../assets/images/background/login-register.jpg)'}}>
					<div className="login-box card">
					<div className="card-body">
						<form className="form-horizontal form-material" id="loginform" name="form" onSubmit={this.submitLogin}>
						<h3 className="box-title m-b-20">Sign In</h3>
						<div className="form-group ">
							<div className="col-xs-12">
							<input className="form-control" type="text" required placeholder="Username" value={this.state.email} onChange={this.handleInputChange} name="email" /> </div>
						</div>
						<div className="form-group">
							<div className="col-xs-12">
							<input className="form-control" type="password" required placeholder="Password" value={this.state.password}	onChange={this.handleInputChange} name="password" /> </div>
						</div>
						<div className="form-group row">
							<div className="col-md-12 font-14">
							<div className="checkbox checkbox-primary pull-left p-t-0">
								<input id="checkbox-signup" type="checkbox" />
								<label htmlFor="checkbox-signup"> Remember me </label>
							</div> 
						</div>
						</div>
						<div className="form-group text-center m-t-20">
							<div className="col-xs-12">
							<button className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="submit">Log In</button>
							</div>
						</div>
						<div className="form-group m-b-0">
							<div className="col-sm-12 text-center">
							<div>Don't have an account? <a href="pages-register.html" className="text-info m-l-5"><b>Sign Up</b></a></div>
							</div>
						</div>
						</form>
					</div>
					</div>
				</div>
			</section>
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

const connectedLoginPage = connect(mapState, actionCreators)(Login);
export { connectedLoginPage as Login };
