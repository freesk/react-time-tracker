import React, { Component } from 'react';

class Slider extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		let collection;

		this.props.collection.forEach((task, index) => {

		});

		return (
			<div className="Slider">

			</div>
		);
	}
}

class Slide extends Component {
	render() {
		return (
			<div>{this.props.date}</div>
			<div>{this.props.body}</div>
		);
	}
}

export default Slider;
