import React, { Component } from 'react';

import collectjs from '../node_modules/collect.js';

import SearchableTaskTable from './SearchableTaskTable';
import NewRecordForm from './NewRecordForm';

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
		this.handleControlClick = this.handleControlClick.bind(this);
		this.onClickPrev = this.onClickPrev.bind(this);
		this.onClickNext = this.onClickNext.bind(this);
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

	// get to the prev week
	onClickPrev(e) {
		e.preventDefault();
		const currentDate = this.state.currentDate;
		const startOfWeek = moment(currentDate, "MM-DD-YYYY").startOf('week');
		const prevDay = startOfWeek.day(-1).toObject();
		const prevDayStr = dateObjectToString(prevDay);
		this.setState({currentDate: prevDayStr});
	}

	// get to the next week
	onClickNext(e) {
		e.preventDefault();
		const currentDate = this.state.currentDate;
		const startOfWeek = moment(currentDate, "MM-DD-YYYY").startOf('week');
		const nextDay = startOfWeek.day(7).toObject();
		const nextDayStr = dateObjectToString(nextDay);
		this.setState({currentDate: nextDayStr});
	}

  handleNewTask(task) {
    this.props.onHandleNewTask(task);
  }

	// when one of the days in the top nav gets clicked
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

					table = <SearchableTaskTable
								currentId={this.state.currentId}
				        tasks={tasks}
				        onHandleTimeEdit={this.handleTimeEdit}
				        onHandleNewTask={this.handleNewTask}
								onHandleToggleId={this.handleToggleId}
								onHandleDeleteClick={this.handleDeleteClick} />;
				} else {
					table = <div className="text-center no-records">
						<hr />
						<h2>No Records</h2>
						<hr />
					</div>;
				}

				form =
					<NewRecordForm
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
			<div className="DateController">

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
		const className = this.props.isOn ? "active" : "";
		const date = this.props.date;
		return (
			<a href="" onClick={this.handleControlClick} className={className}>
				{date}
			</a>
		);
	}
}

function getWeekArray(date) {
	const NUMBER_OF_DAYS = 7;
	// get the first day of the week where the give day sits
	const startOfWeek = moment(date, "MM-DD-YYYY").startOf('week');
	// define an array
	let daysOfWeek = [];
	// push the first day of the week
	daysOfWeek.push(startOfWeek.toObject());
	// push the rest of the 6 days
	for (var i = 1; i < NUMBER_OF_DAYS; i++)
		daysOfWeek.push(startOfWeek.day(i).toObject());
	// return an array of formatted dates
	return daysOfWeek.map(day => dateObjectToString(day));
}

function dateObjectToString(obj) {
	return (obj.months + 1) + "-" + obj.date + "-" + obj.years;
}

export default DateController;
