import React,  {	Component} from 'react';
import { connect } from 'react-redux';
import {  Link  } from 'react-router-dom';
import { userActions } from '../../actions';
import Footer from '../layout/Footer';
import {Error} from '../layout/Error';
import {Breadcrumb} from '../layout';
import { userService } from '../../services/user.service';
import $ from "jquery";
import ReactDatatable from '@ashvin27/react-datatable';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import {
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';

class Categories extends Component {

	constructor(props) {
        super(props);
        this.length_menu = [];
        const pageArr = [this.props.authentication.user.limit,5, 10, 20, 50];
        for(var i =0;i<pageArr.length;i++){
            if(i>0 && this.props.authentication.user.limit==pageArr[i]){
            } else {
                this.length_menu.push(pageArr[i]); 
            }
        }
        this.state = {
            is_confirm:false,
            pageCount: 1,
            initialPage : 0,
            page : 1,
            forcePage:null,
            total:0,
            page_size : this.props.authentication.user.limit,
            records:[],
            payload:{page:1, type:2},
            status_update : {},
            record_delete : []
        };
        this.columns = [
            {
                key: "id",
                text: "ID",
                sortable: true
            },
            {
                key: "name",
                text: "Name",
                sortable: true
            },
            {
                key: "status",
                text: "Status",
                sortable: true,
                cell: (record, index) => {
                    console.log(record.status);
                    return (
                        <>
                        <BootstrapSwitchButton
                            checked={(this.state.status_update && this.state.status_update.id==record.id ? this.state.status_update.status : record.status ? true : false)}
                            onChange={this.updateRecord.bind(this, record, index)}
                            onlabel='Active'
                            width={100}
                            onstyle="success"
                            offstyle="danger"
                           
                            offlabel='Disabled' />
                        </>
                    )
                }
            },
            {
                key: "created_at",
                text: "Created At",
                sortable: true
            },
            {
                key: "action",
                text: "Action",
                sortable: false,
                cell: (record, index) => {
                    return (
                    <>
                        <Nav className="mr-auto pull-right">
                            <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Action
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>Edit</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem  onClick={this.deleteRecord.bind(this, record)}>Delete</DropdownItem>
                            </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </>
                    )
                }
            }
        ];
        //this.length_menu.unshift(this.state.page_size);
        this.config = {
            page_size: this.state.page_size,
            length_menu: this.length_menu,
            show_filter: true,
            pagination: 'advance',
            show_pagination: true,
            button: {
                excel: false,
                print: false
            }
        }
        this.loadRecords = this.loadRecords.bind(this);
    }
    componentDidMount() {
        const payload = {page:this.state.page, type:2};
        this.loadRecords(payload,true);
    }
    componentDidUpdate(prevProps){
    }
    componentWillReceiveProps (prevProps){
        if(0 && prevProps.location.key!==this.props.location.key){
            $('input[type=search]').val('');
            $('select[type=text]').prop('selectedIndex',0);
            
            const payload = {page:this.state.page, type:2};
            this.loadRecords(payload,true);
        }
    }

    updateRecord = (record, index) => {
        //this.props.fadeIn();
        this.setState({status_update:{id:record.id,status:record.status ? false : true}});
        const formObj = {id:record.id,status:record.status ? 0 : 1};
        const payloadObj = {method:'post','data':formObj,url:'/playlist/add'};
        userService.request(payloadObj).then(
            data => {
                //this.props.fadeOut();
                this.props.error(data.message,'ALERT_SUCCESS','STATUS_UPDATE','toast');
                this.loadRecords(this.state.payload);
            },
            error => {
                this.props.fadeOut();
                this.props.error(error,'ALERT_ERROR','STATUS_UPDATE','inline');
            }
        );
    }
    loadRecords(payload,initial=false) {
        this.props.fadeIn();
        const payloadObj = {method:'get','params':payload,url:'/playlist/list'};
        userService.request(payloadObj)
        .then(
            data => {
                const response = data.playlist;
                this.setState({records:response.data,pageCount:response.last_page,total:response.total,page_size:response.per_page});
                this.props.fadeOut();
            },
            error => {
                this.props.fadeOut();
                this.props.error(error,'ALERT_ERROR','CATEGORY','inline');
            }
        );
    }
    tableChangeHandler = data => {
        const payload = {type:2,page:data.page_number,text:data.filter_value,page_size:data.page_size,order_by:data.sort_order.column,order:data.sort_order.order};
        this.setState({payload:payload});
        this.loadRecords(payload);
    }
    deleteRecord = (record) => {
        console.log(record);
        this.setState({is_confirm:true,record_delete:record});
    }
    onCancel = ()=>{
        this.setState({is_confirm:false});
    }
    onConfirm = (record)=>{
        console.log(record);
        this.setState({is_confirm:false,record_delete:[]});
        const formObj = {id:record.id};
        const payloadObj = {method:'post','data':formObj,url:'/playlist/delete'};
        userService.request(payloadObj).then(
            data => {
                this.props.error(data.message,'ALERT_SUCCESS','DELETE','toast');
                this.loadRecords(this.state.payload);
            },
            error => {
                this.props.fadeOut();
                this.props.error(error,'ALERT_ERROR','DELETE','inline');
            }
        );
    }
	render() {
        const { records,total,page_size,is_confirm,record_delete } = this.state;
		return (
            <> 
                <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                focusCancelBtn
                onConfirm={this.onConfirm.bind(this, record_delete)}
                onCancel={this.onCancel}
                show={is_confirm}
                >
                You will not be able to recover this imaginary file!
                </SweetAlert>
                    <div className="page-wrapper col-12">
                        <Breadcrumb heading="Categories" title="Category" subtitle="List Categories" />
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
                                            <ReactDatatable
                                                config={this.config}
                                                records={records}
                                                columns={this.columns}
                                                dynamic={true}
                                                total_record={total}
                                                onChange={this.tableChangeHandler}/>
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

const connected = connect(mapState, actionCreators)(Categories);
export { connected as Categories };

