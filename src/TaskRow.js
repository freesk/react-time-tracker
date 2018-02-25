import React, { Component } from 'react';

import TimeFieldEdit from './TimeFieldEdit';
import TimeFieldNormal from './TimeFieldNormal';
import Button from './Button';

class TaskRow extends Component {

  constructor(props) {
    super(props);

    this.state = { isEditMode: false };

		this.handleClick = this.handleClick.bind(this);
		this.handleTimeEdit = this.handleTimeEdit.bind(this);
    this.handleEditOn = this.handleEditOn.bind(this);
  }

	handleTimeEdit(seconds) {
    this.setState({ isEditMode: false });
		this.props.onHandleTimeUpdate({
			id: this.props.id,
			seconds: seconds
		});
	}

  handleEditOn() {
    this.setState({ isEditMode: true });
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

    let timeField;

    if(this.state.isEditMode) {
      timeField = <TimeFieldEdit
        seconds={this.props.seconds}
        onHandleTimeEdit={this.handleTimeEdit} />
    } else {
      timeField = <TimeFieldNormal
        seconds={this.props.seconds}
        onHandleClick={this.handleEditOn} />
    }

    return (
      <div className="row">
        <div className="col">
          <div>{this.props.activity}</div>
          <div>{this.props.details}</div>
        </div>
        <div className="col">
          {timeField}
        </div>
        <div className="col">
          <Button
            className="btn btn-secondary"
            text={this.props.isToggleOn ? "STOP" : "RUN"}
            onHandleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default TaskRow;
