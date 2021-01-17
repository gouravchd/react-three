import React, { Component  } from 'react'
import {history} from '../../helpers';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';
import { Hamburger } from './Hamburger';

class TopBar extends Component {
	constructor(props) {
        super(props);
        this.logout = this.logoutMe.bind(this);
        this.state = { };
    }
	logoutMe(e) {
		e.preventDefault();
		this.props.logout();
		history.push('/login');
	}
    render() {
        const { loggingIn } = this.props; 
        return (
           
            <>

                <header className="topbar">
                    <nav className="navbar top-navbar navbar-expand-md navbar-light">                  
                        <div className="navbar-collapse">

                        <ul className="navbar-nav mr-auto mt-md-0">
                            <li className="nav-item"> <a role="button" tabindex="0" onClick={this.props.handleClickMob} className="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark" ><i className="mdi mdi-menu" /></a> </li>
                            <li className="nav-item m-l-10"> <a role="button" tabindex="0" onClick={this.props.handleClick} className="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark"><i className="ti-menu" /></a> </li>
                        </ul>
                        
                            <Nav className="" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle className=" text-muted waves-effect waves-dark" nav caret>
                                      <img src="../assets/images/users/1.jpg" alt="user" className="profile-pic" />
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <ul className="dropdown-user">
                                                    <li>
                                                        <div className="dw-user-box">
                                                        <div className="u-img"><img src="../assets/images/users/1.jpg" alt="user" /></div>
                                                        <div className="u-text">
                                                            <h4>Steave Jobs</h4>
                                                            <p className="text-muted">varun@gmail.com</p><a href="true" className="btn btn-rounded btn-danger btn-sm">View Profile</a></div>
                                                        </div>
                                                    </li>
                                                    <li role="separator" className="divider" />
                                                    <li><a href="true"><i className="ti-user" /> My Profile</a></li>
                                                    <li><a href="true"><i className="ti-wallet" /> My Balance</a></li>
                                                    <li><a href="true"><i className="ti-email" /> Inbox</a></li>
                                                    <li role="separator" className="divider" />
                                                    <li><a href="true"><i className="ti-settings" /> Account Setting</a></li>
                                                    <li role="separator" className="divider" />
                                                    <li><a href="#" onClick={this.logout} ><i className="fa fa-power-off" /> Logout</a></li>
                                        </ul>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </div>
                    </nav>
                </header>
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
    collapsed:userActions.collapsed,
};

const connectedTopBarPage = connect(mapState, actionCreators)(TopBar);
export { connectedTopBarPage as Topbar };