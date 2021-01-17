import { appConstants } from '../helpers';

export const alertActions = {
	success,
	error,
	clear
};

function success(message,type=appConstants.SUCCESS,mode='inline') {
	return { type: appConstants.SUCCESS, mode:mode ,action_type:type, message };
}

function error(message,type=appConstants.ERROR,action_type='',mode='inline') {
	return { type: type,action_type:action_type,mode:mode, message };
}

function clear() {
	return { type: appConstants.CLEAR };
}