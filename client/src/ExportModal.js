import React, { Component } from 'react';

import * as moment from 'moment';

class Modal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			from: "",
			to: "",
			error: ""
		};

		this.handleClose = this.handleClose.bind(this);
		this.handleDownload = this.handleDownload.bind(this);
		this.handleFromChange = this.handleFromChange.bind(this);
		this.handleToChange = this.handleToChange.bind(this);
	}

	handleClose() {
		this.setState({ error: "", from: "", to: "" });
		this.props.onHandleExportModalClose();
	}

	handleDownload() {

		const from = moment(this.state.from, "MM/DD/YYYY");
		const to = moment(this.state.to, "MM/DD/YYYY");

		if(!(from.isValid() && to.isValid())) return this.setState({
			error: "Invalid data format"
		});

		this.setState({ error: "", from: "", to: "" });

		this.props.onHandleDownloadCsv({
			from: dateObjectToString(from.toObject()),
			to: dateObjectToString(to.toObject())
		});
	}

	handleFromChange(e) {
		this.setState({ from: e.target.value });
	}

	handleToChange(e) {
		this.setState({ to: e.target.value });
	}

	render() {
		return (
			<div className="modal">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLongTitle">Export to CSV</h5>
			        <button type="button" className="close" onClick={this.handleClose}>
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
							<div className="row">
								<div className="col-12">
									{
										this.state.error ?
											<div class="alert alert-danger" role="alert">
												{this.state.error}
											</div> : null
									}
								</div>
							</div>
			        <div className="row">
								<label className="col-2 col-form-label">From</label>
								<div className="col-10">
									<input
										type="text"
										required={true}
										className="form-control"
										placeholder={"mm/dd/yyyy"}
										onChange={this.handleFromChange}
										value={this.state.from} />
								</div>
							</div>
							<div className="row mt-3">
								<label className="col-2 col-form-label">To</label>
								<div className="col-10">
									<input
										type="text"
										required={true}
										className="form-control"
										placeholder={"mm/dd/yyyy"}
										onChange={this.handleToChange}
										value={this.state.to} />
								</div>
							</div>
			      </div>
			      <div className="modal-footer">
							<button type="button" className="btn btn-primary" onClick={this.handleDownload}>Download</button>
			        <button type="button" className="btn btn-secondary" onClick={this.handleClose}>Close</button>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}

function dateObjectToString(obj) {
	return (obj.months + 1) + "-" + obj.date + "-" + obj.years;
}

export default Modal;
