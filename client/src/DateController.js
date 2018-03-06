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
		// a reference
		const currentDate = this.state.currentDate;
		// collect
		const collection = collectjs(this.props.tasks);
		// get current tasks
		const tasks = getCurentTasks(collection, currentDate);
		// get 10 newest
		const projects = getItemsSortedByDate(collection, "project", 10);
		const activities = getItemsSortedByDate(collection, "activity", 10);
		const details = getItemsSortedByDate(collection, "details", 10);

		// get the week of the current day
		const daysOfWeek = getWeekArray(currentDate);

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
					projects={projects}
					activities={activities}
					details={details}
					onHandleNewTask={this.handleNewTask} />
				{this.props.children}
			</div>
		);
	}
}

function getItemsSortedByDate(collection, key, max) {
	// group by key
	const grouped = collection.groupBy(key);
	const items = [];

	// each group
	grouped.each(group => {
		// sort children by date
		const sorted = group.sortByDesc(product => product.date);
		// convert to array
		const arr = sorted.toArray();
		// assing project of the first element
		const item = arr[0][key];
		// assing date of the first element
		const date = arr[0].date;
		// push into an array
		items.push({ item: item, date: date });
	});

	// sort the result one more time by date
	const sorted = collectjs(items).sortByDesc(product => product.date);

	// convert the result into an array
	const sortedItems = sorted.toArray();

	const sortedSlicedItems = sortedItems.slice(0, max);

	// console.log(sortedSlicedItems);

	// map back as an array of items
	return sortedSlicedItems.map(obj => obj.item);
}

function getCurentTasks(collection, currentDate) {
	// sorty by date
	const grouped = collection.groupBy("date");
	// define an array
	const tasks = [];
	// if the collecton has a valid key
	if(grouped.has(currentDate)) {
		const items = grouped.all()[currentDate].items;
		items.forEach(task => tasks.push(task));
	}
	return tasks;
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
