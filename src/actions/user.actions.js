import { userService } from '../services';
import { appConstants,history } from '../helpers';
import axios from 'axios';
import { alertActions,loaderActions } from './';

export const userActions = {
	login,
	logout,
	register,
	collapsed,
	getUsers,
	fadeIn,
	fadeOut,
};

function login(email, password) {
	return dispatch => {
		const url = `${appConstants.BASEURL}`;
		dispatch(loaderActions.fadeIn('Waiting..'));
		userService.login(email, password)
			.then(
				user => {
					dispatch(loaderActions.fadeOut('Close'));
					dispatch(success(user));
					history.replace('dashboard');
					//this.context.history.push('dashboard');
				},
				error => {
					//console.log(error);
					dispatch(loaderActions.fadeOut('Close'));
					//dispatch(failure(String(error)));
					dispatch(alertActions.error( String(error),'LOGIN' ));
				}
			);


	};
}
function fadeIn() {
	return dispatch => {
		dispatch(loaderActions.fadeIn('Waiting..'));
	};
}
function fadeOut() {
	return dispatch => {
		dispatch(loaderActions.fadeOut('Close'));
	};
}
function getUsers(data) {
	//return data;
	return dispatch => {
		const url = `${appConstants.BASEURL}`;
		dispatch(loaderActions.fadeIn('Waiting..'));
		userService.get_users(data)
			.then(
				data => {
					dispatch(loaderActions.fadeOut('Close'));
					//return data;
					dispatch(response(data,'PLAYLIST'));
				},
				error => {
					dispatch(loaderActions.fadeOut('Close'));
					dispatch(alertActions.error(String(error), 'GETUSER', 'toast') );
				}
			);
	};
}
function request(user) {
	return {
		type: appConstants.LOGIN_REQUEST,
		user
	}
}
function response(data,type=appConstants.LOGIN_SUCCESS) {
	return {
		type: type,
		data
	}
}
function success(user) {
	return {
		type: appConstants.LOGIN_SUCCESS,
		user
	}
}

function failure(error) {
	return {
		type: appConstants.LOGIN_FAILURE,
		error
	}
}
function logout() {
    userService.logout();
    return { type: appConstants.LOGOUT };
}
function collapsed(value) {
    return {type:'collapsed',status:value};
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    // history.push('/login');
                    dispatch(alertActions.success('Registration successful. Login to Continue!'));
                },
                error => {
					console.log(error,'error--------------------------')
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) {
			 return { 
				 type: appConstants.REGISTER_REQUEST, 
				 user 
				} 
			}
    function success(user) { 
			return {
					 type: appConstants.REGISTER_SUCCESS, 
					 user 
				} 
		}
    function failure(error) { return { type: appConstants.REGISTER_FAILURE, error } }
}
