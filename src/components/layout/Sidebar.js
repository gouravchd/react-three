import React, { Component } from 'react'
import { ProSidebar,SidebarHeader,SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import { FaBeer,FaBattleNet,FaBluetoothB } from 'react-icons/fa';
import { Link,Router } from 'react-router-dom';
import {Users} from '../Users/Users';
class Sidebar extends Component {
	constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }
    render() {
        const { alert,loader } = this.props;
        return (
            <>
			<ProSidebar collapsed={this.props.sidebarPushCollapsed} toggled={this.props.sidebarToggle} onToggle={this.props.onToggle} rtl={false} breakPoint="md">
				<SidebarHeader >
					<div className="text-center p-3">Super Admin</div>
				</SidebarHeader>
				<SidebarContent>
					<Menu iconShape="square">
						<MenuItem icon={<FaBattleNet />}>Dashboard <Link to="/login" /></MenuItem>
						<SubMenu title="Categories" icon={<FaBluetoothB />}>
						<MenuItem>List Categories <Link to={{pathname: '/category/list'}} replace /></MenuItem>
						<MenuItem>Add Category <Link to={{pathname: '/category/create'}} replace /></MenuItem>
						</SubMenu>
					</Menu>
				</SidebarContent>
			</ProSidebar>
            
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

const connectedSidebarPage = connect(mapState, actionCreators)(Sidebar);
export { connectedSidebarPage as Sidebar };