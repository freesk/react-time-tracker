import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import * as moment from 'moment';

// styles
import 'react-datepicker/dist/react-datepicker.css';

class ExportModal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			from: moment(),
			to: moment(),
			error: ""
		};

		this.handleClose = this.handleClose.bind(this);
		this.handleDownload = this.handleDownload.bind(this);
		this.handleFromChange = this.handleFromChange.bind(this);
		this.handleToChange = this.handleToChange.bind(this);
	}

	handleClose() {
		this.props.onHandleExportModalClose();
	}

	handleDownload() {

		const from = this.state.from;
		const to = this.state.to;

		if(!(from.isValid() && to.isValid())) return this.setState({
			error: "Invalid data format"
		});

		// reset
		this.setState({ error: "", from: moment(), to: moment()});

		this.props.onHandleDownloadCsv({
			from: from.unix(),
			to: to.unix()
		});
	}

	handleFromChange(date) {
		this.setState({ from: date });
	}

	handleToChange(date) {
		this.setState({ to: date });
	}

	render() {

		const error = this.state.error;

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
									{error ? getErrorMessage(error) : null}
								</div>
							</div>
							<div className="row">
								<label className="col-2 col-form-label">From</label>
								<div className="col-10">
									<DatePicker
										selected={this.state.from}
										onChange={this.handleFromChange} />
								</div>
							</div>
							<div className="row mt-3">
								<label className="col-2 col-form-label">To</label>
								<div className="col-10">
									<DatePicker
										selected={this.state.to}
										onChange={this.handleToChange} />
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

function getErrorMessage(message) {
	return (
		<div class="alert alert-danger" role="alert">
			{message}
		</div> : null
	);
}

export default ExportModal;
