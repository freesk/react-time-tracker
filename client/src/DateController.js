import React, { Component } from 'react';

import collectjs from '../node_modules/collect.js';

import SearchableTaskTable from './SearchableTaskTable';
import NewRecordForm from './NewRecordForm';
import DateNavigation from './DateNavigation';

import * as moment from 'moment';

// needs some refactoring
class DateController extends Component {
	constructor(props) {
		super(props);

		// get now
		const currentDate = moment();

		// set now for initialization
		this.state = {
			currentDate: dateObjectToString(currentDate.toObject()),
			currentId: null
		}

		// globals
		this.timerID = null;

		this.handleTimeEdit = this.handleTimeEdit.bind(this);
		this.handleNewTask = this.handleNewTask.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleCurrentDateChnage = this.handleCurrentDateChnage.bind(this);
		this.tick = this.tick.bind(this);
		this.handleToggleId = this.handleToggleId.bind(this);
	}

	handleTimeEdit(id, seconds) {
		this.props.onHandleTimeUpdate(id, seconds);
  }

	handleToggleId(id) {
		// if the current id is null, start the timer
		if (!this.state.currentId) {
			this.startTimer();
			this.setState({ currentId: id });
		// if the current id is the same as a new one, stop the timer
		} else if (this.state.currentId === id) {
			this.stopTimer();
			this.setState({ currentId: null });
		// if the current id is different than a new one, redefine the timer
		} else if (this.state.currentId !== id) {
			this.stopTimer();
			this.startTimer();
			this.setState({ currentId: id });
		}
	}

	tick() {
		this.props.onHandleTimeUpdate(this.state.currentId);
	}

	startTimer() {
		this.timerID = setInterval(() => this.tick(),
			1000
		);
	}

	handleDeleteClick(id) {
		this.props.onHandleDeleteClick(id);
	}

	stopTimer() {
		clearInterval(this.timerID);
	}

	handleCurrentDateChnage(date) {
		this.setState({currentDate: date});
	}

  handleNewTask(task) {
    this.props.onHandleNewTask(task);
  }

	render() {

		// do not render if there are no records
		if (!this.props.tasks.length) return null;
		// a reference
		const currentDate = this.state.currentDate;
		// collect
		const collection = collectjs(this.props.tasks);
		// sorty by date
		const grouped = collection.groupBy("date");
		// define an array
		const tasks = [];
		// get the week of the current day
		const daysOfWeek = getWeekArray(currentDate);
		// if the collecton has a valid key
		if(grouped.has(currentDate)) {
			const items = grouped.all()[currentDate].items;
			items.forEach(task => tasks.push(task));
		}

		let body;

		if(tasks.length)
			body = <SearchableTaskTable
								currentId={this.state.currentId}
								tasks={tasks}
								onHandleTimeEdit={this.handleTimeEdit}
								onHandleNewTask={this.handleNewTask}
								onHandleToggleId={this.handleToggleId}
								onHandleDeleteClick={this.handleDeleteClick} />;
		else
			body = getNoRecords();

		return (
			<div className="DateController">
				<DateNavigation
					currentDate={this.state.currentDate}
				 	daysOfWeek={daysOfWeek}
					onHandleCurrentDateChnage={this.handleCurrentDateChnage} />
				<div>
				{body}
				</div>
				<NewRecordForm
					date={this.state.currentDate}
					projects={this.props.projects}
					onHandleNewTask={this.handleNewTask} />
			</div>
		);
	}
}

function getWeekArray(date) {
	const NUMBER_OF_DAYS = 7;
	// get the first day of the week where the give day sits
	const startOfWeek = moment(date, "MM-DD-YYYY").startOf('week');
	// define an array
	const daysOfWeek = [];
	// push the first day of the week
	daysOfWeek.push(startOfWeek.toObject());
	// push the rest of the 6 days
	for (var i = 1; i < NUMBER_OF_DAYS; i++)
		daysOfWeek.push(startOfWeek.day(i).toObject());
	// return an array of formatted dates
	return daysOfWeek.map(day => dateObjectToString(day));
}

function getNoRecords() {
	return (
		<div className="text-center no-records">
			<hr />
			<h2>No Records</h2>
			<hr />
		</div>
	);
}

function dateObjectToString(obj) {
	return (obj.months + 1) + "-" + obj.date + "-" + obj.years;
}

export default DateController;
