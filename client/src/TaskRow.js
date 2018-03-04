import React, { Component } from 'react';

import TimeFieldEdit from './TimeFieldEdit';
import TimeFieldNormal from './TimeFieldNormal';

class TaskRow extends Component {

  constructor(props) {
    super(props);

    this.state = { isEditMode: false };

		this.handleToggleId = this.handleToggleId.bind(this);
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
    this.props.onHandleTimeEdit(this.props._id, seconds);
	}

  handleEditOn() {
    this.setState({ isEditMode: true });
  }

  handleToggleId() {
		this.props.onHandleToggleId(this.props._id);
  }

  handleDeleteClick() {
    this.props.onHandleDeleteClick(this.props._id);
  }

  render() {

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

    const isToggleOn = this.props.isToggleOn;

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
                className={"btn " + (isToggleOn ? "btn-danger" : "btn-success")}
                onClick={this.handleToggleId}>
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
