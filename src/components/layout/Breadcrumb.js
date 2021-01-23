import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
class Breadcrumb extends Component {
	constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { heading, title, subtitle } = this.props;
        return (
            <>
                <div className="row page-titles">
                    <div className="col-md-5 align-self-center">
                        <h3 className="text-themecolor" >{heading}</h3>
                    </div>
                    <div className="col-md-7 align-self-center">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#" onClick={(e) => {e.preventDefault();}}>Home</a></li>
                            <li className="breadcrumb-item">{title}</li>
                            <li className="breadcrumb-item active">{subtitle}</li>
                        </ol>
                    </div>
                </div>
            </>
        )
    }
}

function mapState(state) {
	const { loggingIn } = state.authentication;
	return { loggingIn };
}

const actionCreators = {
	login: userActions.login,
};

const connected = connect(mapState, actionCreators)(Breadcrumb);
export { connected as Breadcrumb };