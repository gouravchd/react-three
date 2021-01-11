import { appConstants } from '../helpers';

export const loaderActions = {
	fadeIn,
	fadeOut
};

function fadeIn(message) {
	return { type: appConstants.FADEIN, message };
}

function fadeOut(message) {
	return { type: appConstants.FADEOUT, message };
}