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
		this.handleDownloadError = this.handleDownloadError.bind(this);

	}

	handleClose() {
		this.props.onHandleExportModalClose();
	}

	handleDownloadError() {
		this.setState({ error: "You must have at least one record to export" });
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

	// must be updated with an arayy of ids instead of from-to variables
	handleDownload() {
		// an identic filtering procedure must happen on the server, since
		// the way the data gets loaded my changed in the future
		const from = this.state.from;
		const to = this.state.to;
		// join all values that must be excluded into a single array
		const filterOf = this.state.clients.concat(this.state.projects).concat(this.state.activities).concat(this.state.details);


		if(!(from.isValid() && to.isValid())) return this.setState({
			error: "Invalid date format"
		});

		// reset
		this.setState({ error: "", from: moment(), to: moment()});

		this.props.onHandleDownloadCsv({
			from: from.unix(),
			to: to.unix(),
			filterOf: filterOf
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
		const from = this.state.from;
		const to = this.state.to;

		// join all values that must be excluded into a single array
		const filterOf = this.state.clients.concat(this.state.projects).concat(this.state.activities).concat(this.state.details);

		// get data from from the props
		const tasks = this.props.tasks;

		// filter by date range and props to exclude
		const filtered = tasks.filter(task => {
			const date = moment.unix(task.timestamp);
			// check if the record belongs to a given range of dates
			if (!(date.isBetween(from, to) || date.isSame(from, 'day'))) return false;
			// define props names
			const props = ['client', 'activity', 'details', 'project'];
			// okay bt default
			let isOkay = true;
			// check if any of props hold an excluded value and
			// if so skip this record
			for (let i = 0; i < props.length; i++)
				if(filterOf.indexOf(task[props[i]]) > -1)
					isOkay = false;

			return isOkay;
		});

		const collection = collectjs(filtered);

		// get unique values from the list after filtering
		const clients = collection.unique('client').all().map(task => task.client);
		const projects = collection.unique('project').all().map(task => task.project);
		const activities = collection.unique('activity').all().map(task => task.activity);
		const details = collection.unique('details').all().map(task => task.details);

		// add excluded props so they can be displayed as unchecked
		this.state.clients.forEach(client => clients.push(client));
		this.state.projects.forEach(project => projects.push(project));
		this.state.activities.forEach(activity => activities.push(activity));
		this.state.details.forEach(detail => details.push(detail));

		// sort by name
		clients.sort();
		projects.sort();
		activities.sort();
		details.sort();

		const clientCheckList = clients.length ?
			<CheckList
				items={clients}
				onHandleItemsSelection={this.handleClientsSelection} /> :
			null;

		const projectCheckList = projects.length ?
			<CheckList
				items={projects}
				onHandleItemsSelection={this.handleProjectsSelection} /> :
			null;

		const activityCheckList = activities.length ?
			<CheckList
				items={activities}
				onHandleItemsSelection={this.handleActivitiesSelection} /> :
			null;

		const detailsCheckList = details.length ?
			<CheckList
				items={details}
				onHandleItemsSelection={this.handleDetailsSelection} /> :
			null;

		console.log(filtered);

		return (
			<div className="ExportModal modal">
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
									<div className="tab-content" id="myTabContent">
									  <div className="tab-pane fade show active" id="client" role="tabpanel" aria-labelledby="client-tab">
											{clientCheckList}
										</div>
									  <div className="tab-pane fade" id="project" role="tabpanel" aria-labelledby="project-tab">
											{projectCheckList}
										</div>
									  <div className="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="activity-tab">
											{activityCheckList}
										</div>
										<div className="tab-pane fade" id="details" role="tabpanel" aria-labelledby="details-tab">
											{detailsCheckList}
										</div>
									</div>
									{
										filtered.length ? "" :
										<div className="mt-4 text-center no-records">
											<h4>No Records</h4>
										</div>
									}
								</div>
							</div>
			      </div>
			      <div className="modal-footer">
							<button type="button" className="btn btn-primary" onClick={filtered.length ? this.handleDownload : this.handleDownloadError}>Download</button>
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
		<div className="alert alert-danger" role="alert">
			{message}
		</div> : null
	);
}

export default ExportModal;
