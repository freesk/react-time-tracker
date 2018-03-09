import React, { Component } from 'react';

import collectjs from '../node_modules/collect.js';
import clone from '../node_modules/clone';

import SearchableTaskTable from './SearchableTaskTable';
import NewRecordForm from './NewRecordForm';
import DateNavigation from './DateNavigation';

import * as moment from 'moment';

// needs some refactoring
class DateController extends Component {
	constructor(props) {
		super(props);

		// set now for initialization
		this.state = {
			currentDate: moment(),
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

		console.log(date);

		this.setState({currentDate: date}, () => {
			console.log(this.state.currentDate);
		});
	}

  handleNewTask(task) {
    this.props.onHandleNewTask(task);
  }

	render() {
		// a reference
		const currentDate = this.state.currentDate;
		// collect
		// const collection = collectjs(this.props.tasks);
		const tasks = this.props.tasks;
		// get current tasks
		const currentTasks = getCurentTasks(tasks, currentDate);
		// get 10 newest

		const projects = getItemsSortedByDate(tasks, "project", 10);
		console.log("");
		const activities = getItemsSortedByDate(tasks, "activity", 10);
		console.log("");
		const details = getItemsSortedByDate(tasks, "details", 10);
		console.log("");

		// get the week of the current day
		const daysOfWeek = getWeekArray(currentDate);

		// console.log(currentDate);
		// console.log(daysOfWeek);

		let body;

		if(tasks.length)
			body = <SearchableTaskTable
								currentId={this.state.currentId}
								tasks={currentTasks}
								onHandleTimeEdit={this.handleTimeEdit}
								onHandleNewTask={this.handleNewTask}
								onHandleToggleId={this.handleToggleId}
								onHandleDeleteClick={this.handleDeleteClick} />;
		else
			body = getNoRecords();

		return (

			<div className="DateController">
				<DateNavigation
					currentDate={currentDate}
				 	daysOfWeek={daysOfWeek}
					onHandleCurrentDateChnage={this.handleCurrentDateChnage} />
				<div>
				{body}
				</div>
				<NewRecordForm
					currentDate={currentDate}
					projects={projects}
					activities={activities}
					details={details}
					onHandleNewTask={this.handleNewTask} />
				{this.props.children}
			</div>
		);
	}
}

function getItemsSortedByDate(tasks, key, max) {
	// collect
	const collection = collectjs(tasks);
	// group by key
	const grouped = collection.groupBy(key);
	const items = [];
	// each group
	grouped.each(group => {
		// sort children by date
		const sorted = group.sortBy(product => product.timestamp);
		// convert to array
		const arr = sorted.toArray();
		// assing project of the first element
		const item = arr[0][key];
		// assing date of the first/newest element
		const timestamp = arr[0].timestamp;
		// push into an array
		items.push({ item: item, timestamp: timestamp });
	});
	// sort the result one more time by date
	const sorted = collectjs(items).sortBy(product => product.timestamp);
	// convert the result into an array
	const sortedItems = sorted.toArray();
	// slice
	const sortedSlicedItems = sortedItems.slice(0, max);
	// map back as an array of items
	return sortedSlicedItems.map(obj => obj.item);
}

function getCurentTasks(currentTasks, currentDate) {
	const tasks = currentTasks.filter(task => {
		const timestamp = task.timestamp;
		// parse as moment object
		const date = moment.unix(timestamp);
		// is the same day
		return date.isSame(currentDate, 'day');
	});
	return tasks;
}

function getWeekArray(date) {
	// days in a week
	const NUMBER_OF_DAYS = 7;
	// create a copy
	const currentDate = clone(date);
	// get the first day of the week where the give day sits
	const startOfWeek = currentDate.startOf('week');
	// define an array
	const daysOfWeek = [];
	// push the days of the week into an array
	for (let i = 0; i < NUMBER_OF_DAYS; i++) {
		const nextDay = clone(startOfWeek.day(i));
		daysOfWeek.push(nextDay);
	}
	return daysOfWeek;
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

export default DateController;
