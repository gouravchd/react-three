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

        };
       
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps){
    }
    componentWillReceiveProps (prevProps){

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