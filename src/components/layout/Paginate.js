import React, { Component  } from 'react'
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import ReactPaginate from 'react-paginate';

class Paginate extends Component {
	constructor(props) {
        super(props);
        this.state = { };
    }
    render() {
        return (
            <>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.props.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={e => this.props.handlePageClick(e)}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    forcePage={this.props.forcePage}
                    disableInitialCallback={true}
                    />
            </>
        )
    }
}
function mapState(state) {
	const { alert } = state;
	return { alert };
}

const actionCreators = {
	login: userActions.login
};

const connected = connect(mapState, actionCreators)(Paginate);
export { connected as Paginate };