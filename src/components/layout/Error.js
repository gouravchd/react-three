import React, { Component  } from 'react'
import { connect } from 'react-redux';
import { userActions } from '../../actions';

class Error extends Component {
	constructor(props) {
        super(props);
        this.state = { };
    }
    render() {
        const { alert } = this.props;
      //  console.log(alert);
        return (
            <>
             {alert.mode=='inline' && alert.message &&
                <div className="row mb-2">
                    <div className="col-12 ">
                    <div className={` ${alert.message ? 'd-block' : 'd-none'} mb-0 b-0 alert alert-dismissible fade show ${alert.class}`} role="alert">
                        {alert.message}
                        <button type="button" className="close d-none" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        </div>
                    </div>
                </div>
            }
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

const connected = connect(mapState, actionCreators)(Error);
export { connected as Error };