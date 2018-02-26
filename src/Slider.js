import React, { Component } from 'react';

import collectjs from '../node_modules/collect.js';

import TodaysTaskTable from './TodaysTaskTable';
import NewTaskForm from './NewTaskForm';

import * as moment from 'moment';

class Slider extends Component {
	constructor(props) {
		super(props);

		// get now
		const currentDate = moment();

		// set now for initialization
		this.state = {
			currentDate: dateObjectToString(currentDate.toObject())
		}

		this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
		this.handleNewTask = this.handleNewTask.bind(this);

		this.handleControlClick = this.handleControlClick.bind(this);
		this.onClickPrev = this.onClickPrev.bind(this);
		this.onClickNext = this.onClickNext.bind(this);
	}

	onClickPrev() {
		const currentDate = this.state.currentDate;
		const startOfWeek = moment(currentDate, "MM-DD-YYYY").startOf('week');
		const prevDay = startOfWeek.day(-1).toObject();
		const prevDayStr = dateObjectToString(prevDay);
		this.setState({currentDate: prevDayStr});
	}

	onClickNext() {
		const currentDate = this.state.currentDate;
		const startOfWeek = moment(currentDate, "MM-DD-YYYY").startOf('week');
		const nextDay = startOfWeek.day(7).toObject();
		const nextDayStr = dateObjectToString(nextDay);
		this.setState({currentDate: nextDayStr});
	}

	handleTimeUpdate(obj) {
    this.props.onHandleTimeUpdate(obj);
  }

  handleNewTask(task) {
    this.props.onHandleNewTask(task);
  }

	handleControlClick(date) {
		this.setState({ currentDate: date });
	}

	render() {

		const collection = collectjs(this.props.tasks);
		const grouped = collection.groupBy("date").all();
		const iterable = getIterable(grouped);

		let controls = [];
		let table = null;
		let form = null;

		const daysOfWeek = getWeekArray(this.state.currentDate);

		daysOfWeek.forEach((date, index) => {

			const isOn = this.state.currentDate === date;

			if(isOn) {

				if(grouped[date]) {
					const tasks = grouped[date].items;

					table = <TodaysTaskTable
				        tasks={tasks}
				        onHandleTimeUpdate={this.handleTimeUpdate}
				        onHandleNewTask={this.handleNewTask} />;
				}

				form =
					<NewTaskForm
						date={date}
						onHandleNewTask={this.handleNewTask} />
			}

			controls.push(
				<Control
					isOn={isOn}
					key={index}
					date={date}
					index={index}
					onHandleControlClick={this.handleControlClick} />
			);
		});

		return (
			<div className="Slider">
				<div className="control row align-items-center no-gutters">
					<div className="col-1">
						<button className="btn btn-sm btn-block btn-outline-secondary prev" onClick={this.onClickPrev}>{"<"}</button>
					</div>
					<div className="col-10">
					<div className="row no-gutters">
						{controls}
					</div>
					</div>
					<div className="col-1">
						<button className="btn btn-sm btn-block btn-outline-secondary next" onClick={this.onClickNext}>{">"}</button>
					</div>
				</div>
				<div>
					{table}
				</div>
				<div>
					{form}
				</div>
			</div>
		);
	}
}

class Control extends Component {
	constructor(props) {
		super(props);
		this.handleControlClick = this.handleControlClick.bind(this);
	}

	handleControlClick() {
		this.props.onHandleControlClick(this.props.date);
	}

	render() {
		return (
			<div className="col">
				<button className={"btn btn-sm btn-block btn-outline-secondary " + (this.props.isOn ? "active" : "")} onClick={this.handleControlClick}>{this.props.date}</button>
			</div>
		);
	}
}

function getWeekArray(date) {
	const NUMBER_OF_DAYS = 7;
	const startOfWeek = moment(date, "MM-DD-YYYY").startOf('week');

	let daysOfWeek = [];

	daysOfWeek.push(startOfWeek.toObject());

	for (var i = 1; i < NUMBER_OF_DAYS; i++)
		daysOfWeek.push(startOfWeek.day(i).toObject());

	return daysOfWeek.map(day => {
		return dateObjectToString(day);
	});
}

function dateObjectToString(obj) {
	return (obj.months + 1) + "-" + obj.date + "-" + obj.years;
}

function getIterable(object) {

	let arr = [];

	for (var key in object) {
		if (object.hasOwnProperty(key)) {
			arr.push({
				key: key,
				items: object[key].items
			});
		}
	}

	return arr;
}

export default Slider;
