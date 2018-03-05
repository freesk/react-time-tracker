import React, { Component } from 'react';

class DateLink extends Component {
	constructor(props) {
		super(props);
		this.handleDateLinkClick = this.handleDateLinkClick.bind(this);
	}

	handleDateLinkClick(e) {
		e.preventDefault();
		this.props.onHandleDateLinkClick(this.props.date);
	}

	render() {
		const className = this.props.isOn ? "active" : "";
		const date = this.props.date;
		return (
			<a href="" onClick={this.handleDateLinkClick} className={className}>
				{date}
			</a>
		);
	}
}

export default DateLink;
