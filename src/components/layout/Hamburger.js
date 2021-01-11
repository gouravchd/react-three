import React, { Component  } from 'react'
import { connect } from 'react-redux';
import { userActions } from '../../actions';

class Hamburger extends Component {
	constructor(props) {
        super(props);
        this.state = { };
        this.collapsed = this.collapsedMe.bind(this);
    }
	collapsedMe(e) {
        e.preventDefault();
        //console.log(this.props.collapsed);
		//this.props.collapsed(true);
    }
    render() {
        return (
            <>
                <ul className="navbar-nav mr-auto mt-md-0">
                        <li className="nav-item"> <a href="true" onClick={(e) => {e.preventDefault();}} className="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark" ><i className="mdi mdi-menu" /></a> </li>
                        <li className="nav-item m-l-10"> <a href="#" onClick={this.props.handleClick} className="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark"><i className="ti-menu" /></a> </li>
                </ul>
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
    logout: userActions.logout,
    collapsed : userActions.collapsed,
};

const connectedHamburgerPage = connect(mapState, actionCreators)(Hamburger);
export { connectedHamburgerPage as Hamburger };