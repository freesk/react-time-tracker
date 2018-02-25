import React, { Component } from 'react';

import Button from './Button';
import TextInput from './TextInput';

class TimeField extends Component {
	constructor(props) {
    super(props);

		const formatedTime = this.formatTime(this.props.seconds);

		this.state = {
			hh: formatedTime.hh,
			mm: formatedTime.mm,
			ss: formatedTime.ss
		}

		this.handleHoursChange = this.handleHoursChange.bind(this);
		this.handleMinutesChange = this.handleMinutesChange.bind(this);
		this.handleSecondsChange = this.handleSecondsChange.bind(this);
		this.handleTimeEdit = this.handleTimeEdit.bind(this);
  }

	handleTimeEdit(e) {
		e.preventDefault();
		console.log("submit");
		let seconds;
		try {
			seconds = parseInt(this.state.hh, 10) * 3600 +
								parseInt(this.state.mm, 10) * 60 +
								parseInt(this.state.ss, 10);
		} catch (e) {
			console.log(e.message);
			// set back to the input
			seconds = this.props.seconds;
		}
		this.props.onHandleTimeEdit(seconds);
	}

	handleHoursChange(hh) {
		console.log("handleHoursChange");
		this.setState({ hh: hh });
	}

	handleMinutesChange(mm) {
		this.setState({ mm: mm });
	}

	handleSecondsChange(ss) {
		this.setState({ ss: ss });
	}

	formatTime(seconds) {
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

	render() {
		return (
			<form className="TimeField" onSubmit={this.handleTimeEdit}>
				<TextInput
					onHandleChange={this.handleHoursChange}
					value={this.state.hh} />
				<span>:</span>
				<TextInput
					onHandleChange={this.handleMinutesChange}
					value={this.state.mm} />
				<span>:</span>
				<TextInput
					onHandleChange={this.handleSecondsChange}
					value={this.state.ss} />
				<button>SUBMIT</button>
			</form>
		);
	}
}

class TaskRow extends Component {

  constructor(props) {
    super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleTimeEdit = this.handleTimeEdit.bind(this);
  }

	handleTimeEdit(seconds) {
		this.props.onHandleTimeUpdate({
			id: this.props.id,
			seconds: seconds
		});
	}

  handleClick() {
    if(this.props.isToggleOn) {
			this.props.onHandleIdChange(null);
    } else {
			this.props.onHandleIdChange(this.props.id);
			this.startTimer();
    }
  }

  tick() {
    this.props.onHandleTimeUpdate({
      id: this.props.id,
      seconds: this.props.seconds + 1
    });
  }

  startTimer() {
    this.timerID = setInterval(() => this.tick(),
      1000
    );
  }

  stopTimer() {
    clearInterval(this.timerID);
  }

  render() {
		// make sure it is not running on each render
		if(!this.props.isToggleOn)
			this.stopTimer();

    return (
      <div className={'TaskRow'}>
        <div className={'col-1'}>
          <div className={'activity'}>{this.props.activity}</div>
          <div className={'details'}>{this.props.details}</div>
        </div>
        <div className={'col-2'}>
					<TimeField
						seconds={this.props.seconds}
						onHandleTimeEdit={this.handleTimeEdit} />
        </div>
        <div className={'col-3'}>
          <Button
            text={this.props.isToggleOn ? "STOP" : "RUN"}
            onHandleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default TaskRow;
