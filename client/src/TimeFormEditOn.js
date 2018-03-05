import React, { Component } from 'react';

class TimeFormEditOnor extends Component {
	constructor(props) {
    super(props);

		const formatedTime = formatTime(this.props.seconds);

		this.state = {
			hh: formatedTime.hh,
			mm: formatedTime.mm,
			ss: formatedTime.ss
		};

		this.handleHoursChange = this.handleHoursChange.bind(this);
		this.handleMinutesChange = this.handleMinutesChange.bind(this);
		this.handleSecondsChange = this.handleSecondsChange.bind(this);
		this.handleTimeEdit = this.handleTimeEdit.bind(this);
		this.handleEditCancel = this.handleEditCancel.bind(this);
  }

	handleEditCancel() {
		this.props.onHandleEditClose();
	}

	handleTimeEdit(e) {
		e.preventDefault();

		let seconds = parseInt(this.state.hh, 10) * 3600 +
									parseInt(this.state.mm, 10) * 60 +
									parseInt(this.state.ss, 10);

		if (isNaN(seconds)) {
			console.log("NaN");
			seconds = this.props.seconds;
		}

		this.props.onHandleTimeEdit(seconds);
	}

	handleHoursChange(event) {
		this.setState({ hh: event.target.value });
	}

	handleMinutesChange(event) {
		this.setState({ mm: event.target.value });
	}

	handleSecondsChange(event) {
		this.setState({ ss: event.target.value });
	}

	render() {

		const hh = this.state.hh;
		const mm = this.state.mm;
		const ss = this.state.ss;

		return (
			<form onSubmit={this.handleTimeEdit}>
				<div className="row">
					<div className="col-6 col-xs-8">
						<div className="input-group">
							<input
								className="form-control"
								onChange={this.handleHoursChange}
								value={hh} />
							<input
								className="form-control"
								onChange={this.handleMinutesChange}
								value={mm} />
							<input
								className="form-control"
								onChange={this.handleSecondsChange}
								value={ss} />
						</div>
					</div>
					<div className="col-6 col-xs-4">
						<div className="btn-group">
							<button className="btn btn-secondary" type="submit">Save</button>
							<button className="btn btn-secondary" type="button" onClick={this.handleEditCancel}>Cancel</button>
						</div>
					</div>
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

export default TimeFormEditOnor;