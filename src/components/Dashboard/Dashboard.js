import React, { Component } from 'react'
import {Topbar} from '../layout/Topbar';
import {Sidebar} from '../layout/Sidebar';
import Footer from '../layout/Footer';
import { connect } from 'react-redux';
import {  Link } from 'react-router-dom';
import { userActions } from '../../actions';
class Dashboard extends Component {
	constructor(props) {
        super(props);
      //  this.state = { showMenu: true };
     //   this.toggleMenu = this.toggleMenu.bind(this);
    }
   
    render() {
        return (
            <>
                    <div className="page-wrapper col-12">
                        <div className="row page-titles">
                            <div className="col-md-5 align-self-center">
                                <h3 className="text-themecolor">Animation</h3>
                            </div>
                            <div className="col-md-7 align-self-center">
                                <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" onClick={(e) => {e.preventDefault();}}>Home</a></li>
                                <li className="breadcrumb-item">pages</li>
                                <li className="breadcrumb-item active">Animation</li>
                                </ol>
                            </div>
                        </div>


                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            This is some text within a card block.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <Footer />
            </>
        )
    }
}
function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedDashboard = connect(mapState, actionCreators)(Dashboard);
export { connectedDashboard as Dashboard };