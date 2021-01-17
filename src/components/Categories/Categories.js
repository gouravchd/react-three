import React,  {	Component} from 'react';
import { connect } from 'react-redux';
import {  Link ,withRouter,BrowserRouter as Router } from 'react-router-dom';
import { userActions,loaderActions,alertActions } from '../../actions';
import {history} from '../../helpers';
import Footer from '../layout/Footer';
import {Error} from '../layout/Error';
import {Paginate} from '../layout';

import {store,appConstants } from '../../helpers';
import { userService } from '../../services/user.service';
class Categories extends Component {

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
        this.loadRecords = this.loadRecords.bind(this);
    }
    componentDidMount() {
        const payload = {page:this.state.page, type:2};
        this.loadRecords(payload,true);
    }
    componentDidUpdate(prevProps){
    }
    componentWillReceiveProps (prevProps){
        if(prevProps.location.key!=this.props.location.key){
            const payload = {page:this.state.page, type:20};
            this.loadRecords(payload,true);
        }
    }
    loadRecords(payload,initial=false) {
        this.props.fadeIn();
        const payloadObj = {method:'get','params':payload,url:'/playlist/list'};
        userService.request(payloadObj)
        .then(
            data => {
                const response = data.playlist;
                this.setState({records:response.data,pageCount:response.last_page});
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
        this.loadRecords(payload,false);
    }
	render() {
        const { records } = this.state;
		return (
            <>
                    <div className="page-wrapper col-12">
                        <div className="row page-titles">
                            <div className="col-md-5 align-self-center">
                                <h3 className="text-themecolor" >Categories</h3>
                            </div>
                            <div className="col-md-7 align-self-center">
                                <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" onClick={(e) => {e.preventDefault();}}>Home</a></li>
                                <li className="breadcrumb-item">pages</li>
                                <li className="breadcrumb-item active">categories</li>
                                </ol>
                            </div>
                        </div>

                        <div className="container-fluid">
                            <Error />
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header bg-primary text-white">
                                            <div className="pull-left">Category List</div>
                                            <div className="pull-right">
                                                    <Link to="/category/create" className="btn btn-warning btn-sm" >Add Category</Link>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Created At</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {records.map((record, i) => (
                                                <tr key={i}>
                                                    <td>{record.id}</td>
                                                    <td>{record.name}</td>
                                                    <td>{record.created_at}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>

                                        <Paginate pageCount={this.state.pageCount} forcePage={this.state.forcePage} handlePageClick={this.handlePageClick} />
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
    const { user, authentication,response } = state;
    return { user, authentication,response };
}

const actionCreators = {
    fadeIn : userActions.fadeIn,
    fadeOut : userActions.fadeOut,
}

const connected = connect(mapState, actionCreators)(Categories);
export { connected as Categories };

