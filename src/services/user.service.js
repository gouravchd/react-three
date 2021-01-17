// import { authHeader } from '../helpers';
import axios from 'axios';
import { history } from './../helpers';
export const userService = {
	login,
	logout,
	register,
	get_users,
	request
};

function login(email, password) {

	axios.interceptors.request.use((config) => {
		return config;
	});
	const body = {
		email: email,
		password: password
	};
	return axios.post(`/login`, body)
	.then(response => {
		if(response.data && response.data.data){
			localStorage.setItem('user', JSON.stringify(response.data.data));
			return response.data.data;
		}
	})
	.catch(handleResponse);
}
function axiosHeader(){
	const auth = JSON.parse(localStorage.getItem('user'));
	//console.log(auth.token);
	if(auth && auth.token){
		axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
	}
}
function get_users(data) {
	axios.interceptors.request.use((config) => {
		return config;
	});
	//return false;
	axiosHeader();
	const body ={params : data};
	return axios.get(`/playlist/list`, body)
	.then(response => {
		//console.log(response.data.playlist);
		if(response.data.playlist && response.data.playlist){
			return response.data.playlist;
		}
	})
	.catch(handleResponse);
}

function request(payload) {
	axios.interceptors.request.use((config) => {
		return config;
	});
	axiosHeader();
	return axios(payload)
	.then(response => {
		return response.data;
	})
	.catch(handleResponse);
}

// remove user from local storage to log user out
function logout() {
	localStorage.removeItem('user');
	//history.replace('login');
}

// register user request
function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`http://localhost:3001/auth/register`, requestOptions).then(handleResponse);
}


function handleResponse(error) {
	
	var response = error.response;
	//console.log(response);
	if (response.status!==200) {
		if (response.status === 401) {
			// auto logout if 401 response returned from api
			logout();
			// location.reload(true);
		}
		const error = (response.data && response.data.message) || response.statusText;
		return Promise.reject(error);
	}
	return response;
}