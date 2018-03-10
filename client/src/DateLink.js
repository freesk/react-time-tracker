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
				<span className="d-lg-none d-xl-none">{date.format("ddd D")}</span>
				<span className="d-none d-lg-inline d-xl-inline">{date.format("dddd D")}</span>
			</a>
		);
	}
}

export default DateLink;
