import React,  {	Component} from 'react';
import { connect } from 'react-redux';
import {  Link  } from 'react-router-dom';
import { userActions } from '../../actions';
import Footer from '../layout/Footer';
import {Error} from '../layout/Error';
import {Breadcrumb} from '../layout';
import { userService } from '../../services/user.service';
import { history } from '../../helpers';
class EditCategory extends Component {

	constructor(props) {
		super(props);
        this.state = {
            form : {}
        };
        //console.log(this.props.match.params.id);
        this.loadRecord();
        this.submitRecord = this.submit.bind(this);
        this.handleInputChange = this.inputChange.bind(this);
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps){
    }
    componentWillReceiveProps (prevProps){
        document.getElementById("add").reset();
    }
	inputChange(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({[name]: value});
	}
    submit(e) {
        e.preventDefault();
        const { name , status} = this.state;
        const data = new FormData(e.target);
        const formObj = {};
        for (var pair of data.entries()) {
          formObj[pair[0]] = pair[1];
        }
        this.props.fadeIn();
        const payloadObj = {method:'post','data':formObj,url:'/playlist/add'};
        userService.request(payloadObj)
        .then(
            data => {
                //const response = data.playlist;
                console.log(data);
                this.props.fadeOut();
                history.replace('/category/list');
            },
            error => {
                this.props.fadeOut();
                this.props.error(error,'ALERT_ERROR','CATEGORY_Add','inline');
            }
        );
       //console.log(data);
    }
    loadRecord(id=null) {
        if(!id){
            this.props.error('Invalid Record','ALERT_ERROR','CATEGORY','toast');
            history.replace('/category/list');
        }
    }
	render() {
        const { records } = this.state;
		return (
            <>
                    <div className="page-wrapper col-12">
                        <Breadcrumb heading="Categories" title="Category" subtitle="Create" />


                        <div className="container-fluid">
                            <Error />
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header bg-primary text-white">
                                            <div className="pull-left">Category Create</div>
                                        </div>
                                        <div className="card-body">
                                            <div className="col-6">
                                            <form id="add" onSubmit={this.submitRecord}>
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                            <label className="control-label">Name </label>
                                                            <input type="text" id="name" className="form-control" placeholder="Name" name="name" onChange={this.handleInputChange} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Status</label>
                                                                <select name="status" className="form-control" onChange={this.handleInputChange}>
                                                                    <option value="1">Active</option>
                                                                    <option value="0">In-Active</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-actions">
                                                    <button type="submit" className="btn btn-success"> <i className="fa fa-check" /> Save</button>
                                                    <Link to="/category/list" className="btn btn-info ml-2">Cancel</Link>
                                                </div>
                                            </form>
                                            </div>
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
    error : userActions.error,
}

const connected = connect(mapState, actionCreators)(EditCategory);
export { connected as EditCategory };