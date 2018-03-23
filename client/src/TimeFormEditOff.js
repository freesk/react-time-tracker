import React, { Component } from 'react';

class TimeFormEditOff extends Component {
	constructor(props) {
    super(props);

		this.handleFocus = this.handleFocus.bind(this);
  }

	handleFocus(e) {
		this.props.onHandleTimeEditIsOn(e.target.id);
	}

	render() {

		const formatedTime = formatTime(this.props.seconds);

		const hh = formatedTime.hh;
		const mm = formatedTime.mm;
		const ss = formatedTime.ss;

		return (
			<form onFocus={this.handleFocus} className="TimeFormEditOff">
				<div className="input-group">
					<input
						readOnly
						id="hh"
						className="form-control"
						value={hh} />
					<input
						readOnly
						id="mm"
						className="form-control"
						value={mm} />
					<input
						readOnly
						id="ss"
						className="form-control"
						value={ss} />
				</div>
			</form>
		);
	}
}

function formatTime(seconds) {
	let time = new Date(null);
	time.setSeconds(seconds);
	const formated = time.toISOString().substr(11, 8);
	const formatedSplit = formated.split(":");

	const hh = formatedSplit[0];
	const mm = formatedSplit[1];
	const ss = formatedSplit[2];

	return {
		hh: hh,
		mm: mm,
		ss: ss
	};
}

export default TimeFormEditOff;
