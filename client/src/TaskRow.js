import React, { Component } from 'react';

import TimeFieldEdit from './TimeFieldEdit';
import TimeFieldNormal from './TimeFieldNormal';

class TaskRow extends Component {

  constructor(props) {
    super(props);

    this.state = { isEditMode: false };

		this.handleClick = this.handleClick.bind(this);
		this.handleTimeEdit = this.handleTimeEdit.bind(this);
    this.handleEditOn = this.handleEditOn.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClose = this.handleEditClose.bind(this);
  }

  handleEditClose() {
    this.setState({ isEditMode: false });
  }

	handleTimeEdit(seconds) {
    this.setState({ isEditMode: false });
		this.props.onHandleTimeUpdate({
			_id: this.props._id,
			seconds: seconds
		}, true);
	}

  handleEditOn() {
    this.setState({ isEditMode: true });
  }

  handleClick() {
    if(this.props.isToggleOn) {
			this.props.onHandleIdChange(null);
    } else {
			this.props.onHandleIdChange(this.props._id);
			this.startTimer();
    }
  }

  tick() {
    this.props.onHandleTimeUpdate({
      _id: this.props._id,
      seconds: this.props.seconds + 1
    }, false);
  }

  startTimer() {
    this.timerID = setInterval(() => this.tick(),
      1000
    );
  }

  stopTimer() {
    clearInterval(this.timerID);
  }

  handleDeleteClick() {
    this.stopTimer();
    this.props.onHandleDeleteClick(this.props._id);
  }

  render() {
		// make sure it is not running on each render
		if(!this.props.isToggleOn)
			this.stopTimer();

    let timeField;

    if(this.state.isEditMode) {
      timeField = <TimeFieldEdit
        seconds={this.props.seconds}
        onHandleTimeEdit={this.handleTimeEdit}
        onHandleEditClose={this.handleEditClose}  />
    } else {
      timeField = <TimeFieldNormal
        seconds={this.props.seconds}
        onHandleClick={this.handleEditOn}
        onHandleDeleteClick={this.handleDeleteClick} />
    }

    return (
      <div className="card">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-4">
              <h5>{this.props.activity}</h5>
              <small>{this.props.details}</small>
            </div>
            <div className="col-sm-12 col-md-6">
              {timeField}
            </div>
            <div className="col-sm-12 col-md-2">
              <button
                className={"btn " + (this.props.isToggleOn ? "btn-danger" : "btn-success")}
                onClick={this.handleClick}>
                {this.props.isToggleOn ? "Stop" : "Start"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskRow;
