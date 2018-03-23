import React, { Component } from 'react';

class Modal extends Component {

	constructor(props) {
		super(props);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClose() {
		this.props.onHandleClose();
	}

	render() {
		return (
			<div className="modal">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLongTitle">{this.props.title}</h5>
			        <button type="button" className="close" onClick={this.handleClose}>
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        {this.props.message}
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" onClick={this.handleClose}>Close</button>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}

export default Modal;
