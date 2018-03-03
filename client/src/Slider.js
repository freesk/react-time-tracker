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
		this.handleDeleteClick = this.handleDeleteClick.bind(this);

		this.handleControlClick = this.handleControlClick.bind(this);
		this.onClickPrev = this.onClickPrev.bind(this);
		this.onClickNext = this.onClickNext.bind(this);
	}

	onClickPrev(e) {
		e.preventDefault();
		const currentDate = this.state.currentDate;
		const startOfWeek = moment(currentDate, "MM-DD-YYYY").startOf('week');
		const prevDay = startOfWeek.day(-1).toObject();
		const prevDayStr = dateObjectToString(prevDay);
		this.setState({currentDate: prevDayStr});
	}

	onClickNext(e) {
		e.preventDefault();
		const currentDate = this.state.currentDate;
		const startOfWeek = moment(currentDate, "MM-DD-YYYY").startOf('week');
		const nextDay = startOfWeek.day(7).toObject();
		const nextDayStr = dateObjectToString(nextDay);
		this.setState({currentDate: nextDayStr});
	}

	handleDeleteClick(id) {
		this.props.onHandleDeleteClick(id);
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
				        onHandleNewTask={this.handleNewTask}
								onHandleDeleteClick={this.handleDeleteClick} />;
				}

				form =
					<NewTaskForm
						date={date}
						projects={this.props.projects}
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

				<table className="top-control">
					<tbody>
					<tr>
						<td className="prev-td">
							<a href="" onClick={this.onClickPrev}>Prev</a>
						</td>
						<td>
							<div className="flex-container">
								<div className="flex-item">{controls[0]}</div>
								<div className="flex-item">{controls[2]}</div>
								<div className="flex-item">{controls[4]}</div>
								<div className="flex-item">{controls[6]}</div>
								<div className="flex-item">{controls[1]}</div>
								<div className="flex-item">{controls[3]}</div>
								<div className="flex-item">{controls[5]}</div>
							</div>
						</td>
						<td className="next-td">
							<a href="" onClick={this.onClickNext}>Next</a>
						</td>
					</tr>
					</tbody>
				</table>
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

	handleControlClick(e) {
		e.preventDefault();
		this.props.onHandleControlClick(this.props.date);
	}

	render() {

		return (
			<a
				href=""
				onClick={this.handleControlClick}
				className={this.props.isOn ? "active" : ""}>
					{this.props.date}
			</a>
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

	return daysOfWeek.map(day => dateObjectToString(day));
}

function dateObjectToString(obj) {
	return (obj.months + 1) + "-" + obj.date + "-" + obj.years;
}

export default Slider;
