import React, { Component } from 'react';

import collectjs from '../node_modules/collect.js';

import TodaysTaskTable from './TodaysTaskTable';

class Slider extends Component {
	constructor(props) {
		super(props);

		// to initialize it with today's date
		const collection = collectjs(this.props.tasks);
		const grouped = collection.groupBy("date").all();
		const iterable = getIterable(grouped);
		const todaysDate = getMmDdYyyy(Date.now());
		const found = iterable.find(obj => {
			return obj.key === todaysDate;
		});
		const index = iterable.indexOf(found);

		this.state = {
			currentIndex: index
		}

		this.handleControlClick = this.handleControlClick.bind(this);
		this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
		this.handleNewTask = this.handleNewTask.bind(this);
	}

	handleTimeUpdate(obj) {
    this.props.onHandleTimeUpdate(obj);
  }

  handleNewTask(task) {
    this.props.onHandleNewTask(task);
  }

	handleControlClick(index) {
		this.setState({ currentIndex: index });
	}

	render() {

		const collection = collectjs(this.props.tasks);
		const grouped = collection.groupBy("date").all();
		const iterable = getIterable(grouped);

		let controls = [];
		let table;

		iterable.forEach((object, index) => {
			const date = object.key;
			const isOn = this.state.currentIndex === index;
			if(isOn) {
				table = <TodaysTaskTable
	        tasks={object.items}
	        date={date}
	        onHandleTimeUpdate={this.handleTimeUpdate}
	        onHandleNewTask={this.handleNewTask} />
			}
			controls.push(
				<Control
					key={index}
					isOn={isOn}
					date={date}
					index={index}
					onHandleControlClick={this.handleControlClick} />
			);
		});

		return (
			<div className="Slider">
				<div className="control btn-toolbar justify-content-center">
					<div className="btn-group mr-2">
						<button className="btn btn-sm btn-outline-secondary">{"<"}</button>
					</div>
					<div className="btn-group mr-2">
						{controls}
					</div>
					<div className="btn-group">
						<button className="btn btn-sm btn-outline-secondary">{">"}</button>
					</div>
				</div>
				<div>
					{table}
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
		this.props.onHandleControlClick(this.props.index);
	}

	render() {
		return (
			<button className={"btn btn-sm btn-outline-secondary" + (this.props.isOn ? "active" : "")} onClick={this.handleControlClick}>{this.props.date}</button>
		);
	}
}

function getMmDdYyyy(timestamp) {
  const t = new Date(timestamp);
  return (t.getMonth() + 1) + "-" + t.getDate() + "-" + t.getFullYear();
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
