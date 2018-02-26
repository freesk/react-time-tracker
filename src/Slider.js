import React, { Component } from 'react';

class Slider extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(id) {
		this.props.onHandleDateChnage(this.props.slides[id].date);
	}

	render() {

		let slide;
		let controls = [];

		this.props.slides.forEach((obj, index) => {

			const date = obj.date;
			const table = obj.table;

			let isHidden;

			if(this.props.todaysDate !== date)
				isHidden = true;
			else
				isHidden = false;

			if(!isHidden) {
				slide = <div
					className={isHidden ? "hidden" : ""}
					key={date}>
					{table}
				</div>
			}

			controls.push(
				<Control
					onHandleClick={this.handleClick}
					isActive={!isHidden}
					date={date}
					key={index}
					id={index} />
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
					{slide}
				</div>
			</div>
		);
	}
}

class Slide extends Component {
	render() {
		return (
			<div>{this.props.body}</div>
		);
	}
}

class Control extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onHandleClick(this.props.id);
	}

	render() {
		return (
			<button className={"btn btn-sm btn-outline-secondary" + (this.props.isActive ? "active" : "")} onClick={this.handleClick}>{this.props.date}</button>
		);
	}
}

export default Slider;
