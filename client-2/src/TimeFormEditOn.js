import React, { Component } from 'react';

class TimeFormEditOnor extends Component {
	constructor(props) {
    super(props);

		const formatedTime = formatTime(this.props.seconds);

		this.state = {
			hh: formatedTime.hh,
			mm: formatedTime.mm,
			ss: formatedTime.ss,
			changed: false
		};

		this.handleHoursChange = this.handleHoursChange.bind(this);
		this.handleMinutesChange = this.handleMinutesChange.bind(this);
		this.handleSecondsChange = this.handleSecondsChange.bind(this);
		this.focusTextInput = this.focusTextInput.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
  }

	handleBlur() {
		let seconds = parseInt(this.state.hh, 10) * 3600 +
									parseInt(this.state.mm, 10) * 60 +
									parseInt(this.state.ss, 10);

		// if error, exit without changes
		if (isNaN(seconds))
			return this.setState({ changed: false }, () => {
				this.props.onHandleTimeEditIsOff();
			})
		// if the state has been changed, update the time
		if (this.state.changed)
			this.setState({ changed: false }, () => {
				this.props.onHandleTimeEdit(seconds);
			});
		// if it hasn't been changed, exit
		else
			this.props.onHandleTimeEditIsOff();

	}

	handleHoursChange(event) {
		this.setState({ hh: event.target.value, changed: true });
	}

	handleMinutesChange(event) {
		this.setState({ mm: event.target.value, changed: true });
	}

	handleSecondsChange(event) {
		this.setState({ ss: event.target.value, changed: true });
	}

	focusTextInput(id) {
		if (id === "hh") {
			this.hhInput.focus();
		} else if (id === "mm") {
			this.mmInput.focus();
		} else if (id === "ss") {
			this.ssInput.focus();
		}
  }

	componentDidMount() {
		this.focusTextInput(this.props.focusId);
	}

	render() {

		const hh = this.state.hh;
		const mm = this.state.mm;
		const ss = this.state.ss;

		return (
			<form onBlur={this.handleBlur}>
				<div className="input-group">
					<input
						type="text"
						ref={(input) => { this.hhInput = input }}
						className="form-control"
						onChange={this.handleHoursChange}
						value={hh} />
					<input
						type="text"
						ref={(input) => { this.mmInput = input }}
						className="form-control"
						onChange={this.handleMinutesChange}
						value={mm} />
					<input
						type="text"
						ref={(input) => { this.ssInput = input }}
						className="form-control"
						onChange={this.handleSecondsChange}
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

export default TimeFormEditOnor;
