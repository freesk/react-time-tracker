import React, { Component } from 'react';

import * as moment from 'moment';

import DateLink from './DateLink';

class DateNavigation extends Component {
	constructor(props) {
		super(props);

		this.onClickPrev = this.onClickPrev.bind(this);
		this.onClickNext = this.onClickNext.bind(this);
		this.handleDateLinkClick = this.handleDateLinkClick.bind(this);
	}

	// get to the prev week
	onClickPrev(e) {
		e.preventDefault();
		const currentDate = this.props.currentDate;
		const startOfWeek = moment(currentDate, "MM-DD-YYYY").startOf('week');
		const prevDay = startOfWeek.day(-1).toObject();
		const prevDayStr = dateObjectToString(prevDay);

		this.props.onHandleCurrentDateChnage(prevDayStr);
	}

	// get to the next week
	onClickNext(e) {
		e.preventDefault();
		const currentDate = this.props.currentDate;
		const startOfWeek = moment(currentDate, "MM-DD-YYYY").startOf('week');
		const nextDay = startOfWeek.day(7).toObject();
		const nextDayStr = dateObjectToString(nextDay);

		this.props.onHandleCurrentDateChnage(nextDayStr);
	}

	handleDateLinkClick(date) {
		this.props.onHandleCurrentDateChnage(date);
	}

	render() {

		const daysOfWeek = this.props.daysOfWeek;
		const controls = daysOfWeek.map((date) => {
			return (
				<DateLink
					isOn={date === this.props.currentDate}
					date={date}
					onHandleDateLinkClick={this.handleDateLinkClick} />
			);
		});

		return(
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
		);
	}
}

function dateObjectToString(obj) {
	return (obj.months + 1) + "-" + obj.date + "-" + obj.years;
}

export default DateNavigation;
