import React,  {	Component} from 'react';
import { connect } from 'react-redux';
import {  Link ,withRouter,BrowserRouter as Router } from 'react-router-dom';
import { userActions,loaderActions,alertActions } from '../../actions';
import {history} from '../../helpers';
import Footer from '../layout/Footer';
import {Error} from '../layout/Error';
import ReactPaginate from 'react-paginate';
import {store,appConstants } from '../../helpers';
import { userService } from '../../services/user.service';
class Users extends Component {

	constructor(props) {
		super(props);
        this.state = {
            pageCount: 1,
            initialPage : 0,
            page : 1,
            forcePage:null,
            records:[],
        };
       
        this.handlePageClick = this.handleClick.bind(this);
        this.loadUsers = this.loadUsers.bind(this);
    }
    componentDidMount() {
        const payload = {page:this.state.page, type:2};
        this.loadUsers(payload,true);
    }
    componentDidUpdate(prevProps){
    }
    componentWillReceiveProps (prevProps){
        if(prevProps.location.key!=this.props.location.key){
            const payload = {page:this.state.page, type:2};
            this.loadUsers(payload,true);
        }
    }
    loadUsers(payload,initial=false) {
        this.props.fadeIn();
        userService.get_users(payload)
        .then(
            data => {
                this.setState({records:data.data,pageCount:data.last_page});
                if(initial){
                    this.setState({forcePage:0});
                } else {
                    this.setState({forcePage:payload.page-1});
                }
                this.props.fadeOut();
            },
            error => {
                this.props.fadeOut();
            }
        );
    }

    handleClick(e) {
        const page = e.selected+1;
        const payload = {page:page,type:2};
        this.loadUsers(payload,false);
    }
	render() {
        const { loggingIn,response } = this.props;
		return (
            <>
                    <div className="page-wrapper col-12">
                        <div className="row page-titles">
                            <div className="col-md-5 align-self-center">
                                <h3 className="text-themecolor" >Users</h3>
                            </div>
                            <div className="col-md-7 align-self-center">
                                <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" onClick={(e) => {e.preventDefault();}}>Home</a></li>
                                <li className="breadcrumb-item">pages</li>
                                <li className="breadcrumb-item active">Users</li>
                                </ol>
                            </div>
                        </div>

                        <div className="container-fluid">
                            <Error />
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header bg-primary text-white">
                                            <div className="pull-left">Users List</div>
                                            <div className="pull-right">
                                                    <Link to="/users" className="btn btn-warning btn-sm" >Add User</Link>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Firstname</th>
                                                    <th>Lastname</th>
                                                    <th>Email</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.records.map((record, i) => (
                                                <tr key={i}>
                                                    <td>{record.id}</td>
                                                    <td>{record.name}</td>
                                                    <td>{record.created_at}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>

                                        <ReactPaginate
                                            previousLabel={'previous'}
                                            nextLabel={'next'}
                                            breakLabel={'...'}
                                            breakClassName={'break-me'}
                                            pageCount={this.state.pageCount}
                                           // initialPage={this.state.initialPage}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={e => this.handlePageClick(e)}
                                            containerClassName={'pagination'}
                                            subContainerClassName={'pages pagination'}
                                            activeClassName={'active'}
                                            pageClassName={'page-item'}
                                            pageLinkClassName={'page-link'}
                                            previousClassName={'page-item'}
                                            previousLinkClassName={'page-link'}
                                            nextClassName={'page-item'}
                                            nextLinkClassName={'page-link'}
                                            forcePage={this.state.forcePage}
                                            disableInitialCallback={true}
                                            />
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

function sampleFunc(){
   const data = [];
   return {
        type: 10,
        data
    }
}
function mapState(state) {
    const { user, authentication,response } = state;
    return { user, authentication,response };
}

const actionCreators = {
    getUsers: userActions.getUsers,
    fadeIn : userActions.fadeIn,
    fadeOut : userActions.fadeOut,
    getSample:sampleFunc,
}

const connected = connect(mapState, actionCreators)(Users);
export { connected as Users };

