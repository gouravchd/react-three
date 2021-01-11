import React, { Component  } from 'react'
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ToastError extends Component {
	constructor(props) {
        super(props);
        this.state = { };
    }
    render() {
        const { alert } = this.props;
       // console.log(alert);
       if(alert.mode=='toast' && alert.message){
            if(alert.type=='ALERT_ERROR'){
                toast.error(alert.message);
            } else if(alert.type=='ALERT_ERROR'){
                 toast.success(alert.message);
            } else {
                toast(alert.message);
           }
       }
        return (
            <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            </>
        )
    }
}
function mapState(state) {
	const { alert } = state;
	return { alert };
}

const actionCreators = {
	login: userActions.login
};

const connected = connect(mapState, actionCreators)(ToastError);
export { connected as ToastError };