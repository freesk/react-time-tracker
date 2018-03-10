import React, { Component } from 'react';

import DatePicker from 'react-datepicker';

import DateLink from './DateLink';

class DateNavigation extends Component {
	constructor(props) {
		super(props);

		this.onClickPrev = this.onClickPrev.bind(this);
		this.onClickNext = this.onClickNext.bind(this);
		this.handleDateLinkClick = this.handleDateLinkClick.bind(this);
		this.handleDatePicker = this.handleDatePicker.bind(this);
	}

	// get to the prev week
	onClickPrev(e) {
		e.preventDefault();
		const currentDate = this.props.currentDate;
		const startOfWeek = currentDate.startOf('week');
		const prevDay = startOfWeek.day(-1);
		this.props.onHandleCurrentDateChnage(prevDay);
	}

	// get to the next week
	onClickNext(e) {
		e.preventDefault();
		const currentDate = this.props.currentDate;
		const startOfWeek = currentDate.startOf('week');
		const nextDay = startOfWeek.day(7);
		this.props.onHandleCurrentDateChnage(nextDay);
	}

	handleDatePicker(date) {
		this.props.onHandleCurrentDateChnage(date);
	}

	handleDateLinkClick(date) {
		this.props.onHandleCurrentDateChnage(date);
	}

	render() {

		// console.log("");
		const currentDate = this.props.currentDate;

		// console.log(currentDate);

		const daysOfWeek = this.props.daysOfWeek;
		const controls = daysOfWeek.map((date) => {

			const isOn = date.isSame(currentDate, 'day');

			return (
				<DateLink
					isOn={isOn}
					date={date}
					onHandleDateLinkClick={this.handleDateLinkClick} />
			);
		});

		return(
			<div className="ml-1 mr-1">
				<div className="row justify-content-md-end justify-content-center mt-3 mt-md-2 mb-4">
					<label className="col-auto col-form-label text-right mr-2">Select Date</label>
					<div className="col-auto mr-md-3">
						<DatePicker
							className={"form-control"}
							selected={currentDate}
							onChange={this.handleDatePicker} />
					</div>
				</div>

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
			</div>
		);
	}
}

export default DateNavigation;
