import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import collectjs from '../node_modules/collect.js';

// styles
import 'react-datepicker/dist/react-datepicker.css';

import CheckList from './CheckList';

class ExportModal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			from: moment(),
			to: moment(),
			error: "",
			// to exclude
			projects: [],
			clients: [],
			activities: [],
			details: []
		};

		this.handleClose = this.handleClose.bind(this);
		this.handleDownload = this.handleDownload.bind(this);
		this.handleFromChange = this.handleFromChange.bind(this);
		this.handleToChange = this.handleToChange.bind(this);
		this.handleProjectsSelection = this.handleProjectsSelection.bind(this);
		this.handleClientsSelection = this.handleClientsSelection.bind(this);
		this.handleActivitiesSelection = this.handleActivitiesSelection.bind(this);
		this.handleDetailsSelection = this.handleDetailsSelection.bind(this);

	}

	handleClose() {
		this.props.onHandleExportModalClose();
	}

	handleProjectsSelection(projects) {
		this.setState({ projects: projects });
	}

	handleActivitiesSelection(activities) {
		this.setState({ activities: activities });
	}

	handleDetailsSelection(details) {
		this.setState({ details: details });
	}

	handleProjectsSelection(projects) {
		this.setState({ projects: projects });
	}

	handleClientsSelection(clients) {
		this.setState({ clients: clients });
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
		const tasks = this.props.tasks;
		const from = this.state.from;
		const to = this.state.to;

		const collection = collectjs(tasks);

		const clients = collection.unique('client').all().map(task => task.client);
		const projects = collection.unique('project').all().map(task => task.project);
		const activities = collection.unique('activity').all().map(task => task.activity);
		const details = collection.unique('details').all().map(task => task.details);

		const filterOf = this.state.clients.concat(this.state.projects).concat(this.state.activities).concat(this.state.details);

		console.log("filter of ", filterOf);

		const filtered = tasks.filter(task => {
			const date = moment.unix(task.timestamp);
			if (!(date.isBetween(from, to) || date.isSame(from, 'day'))) return false;

			const props = ['client', 'activity', 'details', 'project'];

			let isOkay = true;

			for (let i = 0; i < props.length; i++) {
				if(filterOf.indexOf(task[props[i]]) > -1) {
					isOkay = false;
				}
			}

			return isOkay;
		});

		console.log("filtered", filtered);

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
										className={"form-control"}
										selected={from}
										onChange={this.handleFromChange} />
								</div>
							</div>
							<div className="row mt-3">
								<label className="col-2 col-form-label">To</label>
								<div className="col-10">
									<DatePicker
										className={"form-control"}
										selected={to}
										onChange={this.handleToChange} />
								</div>
							</div>
							<div className="row">
								<div className="col-12 mt-4">
									<ul className="nav nav-tabs" id="myTab" role="tablist">
									  <li className="nav-item">
									    <a className="nav-link active" id="client-tab" data-toggle="tab" href="#client" role="tab" aria-controls="client" aria-selected="true">Client</a>
									  </li>
									  <li className="nav-item">
									    <a className="nav-link" id="project-tab" data-toggle="tab" href="#project" role="tab" aria-controls="project" aria-selected="false">Project</a>
									  </li>
									  <li className="nav-item">
									    <a className="nav-link" id="activity-tab" data-toggle="tab" href="#activity" role="tab" aria-controls="activity" aria-selected="false">Activity</a>
									  </li>
										<li className="nav-item">
											<a className="nav-link" id="details-tab" data-toggle="tab" href="#details" role="tab" aria-controls="details" aria-selected="false">Details</a>
										</li>
									</ul>
									<div class="tab-content" id="myTabContent">
									  <div className="tab-pane fade show active" id="client" role="tabpanel" aria-labelledby="client-tab">
											<CheckList
												items={clients}
												onHandleItemsSelection={this.handleClientsSelection} />
										</div>
									  <div className="tab-pane fade" id="project" role="tabpanel" aria-labelledby="project-tab">
											<CheckList
												items={projects}
												onHandleItemsSelection={this.handleProjectsSelection} />
										</div>
									  <div className="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="activity-tab">
											<CheckList
												items={activities}
												onHandleItemsSelection={this.handleActivitiesSelection} />
										</div>
										<div className="tab-pane fade" id="details" role="tabpanel" aria-labelledby="details-tab">
											<CheckList
												items={details}
												onHandleItemsSelection={this.handleDetailsSelection} />
										</div>
									</div>
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
