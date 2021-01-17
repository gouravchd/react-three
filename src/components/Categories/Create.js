import React,  {	Component} from 'react';
import { connect } from 'react-redux';
import {  Link  } from 'react-router-dom';
import { userActions } from '../../actions';
import Footer from '../layout/Footer';
import {Error} from '../layout/Error';
import ReactPaginate from 'react-paginate';
import { userService } from '../../services/user.service';
class CreateCategory extends Component {

	constructor(props) {
		super(props);
        this.state = {
            form : {}
        };
        this.submitRecord = this.submit.bind(this);
        this.handleInputChange = this.inputChange.bind(this);
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps){
    }
    componentWillReceiveProps (prevProps){
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
        console.log(data);
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
                                <li className="breadcrumb-item">Category</li>
                                <li className="breadcrumb-item active">Create</li>
                                </ol>
                            </div>
                        </div>

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
                                            <form onSubmit={this.submitRecord}>
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                            <label className="control-label">Name</label>
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
}

const connected = connect(mapState, actionCreators)(CreateCategory);
export { connected as CreateCategory };