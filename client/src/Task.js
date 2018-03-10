import React, { Component } from 'react';

import TimeForm from './TimeForm';

class Task extends Component {

  constructor(props) {
    super(props);

		this.handleToggleId = this.handleToggleId.bind(this);
		this.handleTimeEdit = this.handleTimeEdit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick() {
    this.props.onHandleRecordEdit(this.props._id)
  }

	handleTimeEdit(seconds) {
    this.props.onHandleTimeEdit(this.props._id, seconds);
	}

  handleToggleId() {
		this.props.onHandleToggleId(this.props._id);
  }

  handleDeleteClick() {
    this.props.onHandleDeleteClick(this.props._id);
  }

  render() {

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
              <div className="row justify-content-md-end">
                <div className="col-md-auto ml-3 ml-md-0">
                  <TimeForm
                    seconds={this.props.seconds}
                    onHandleTimeEdit={this.handleTimeEdit} />
                </div>
                <div className="col-md-auto ml-2 mr-md-3">
                  <div className="btn-group">
                    <button className="btn btn-secondary" type="button"  onClick={this.handleEditClick}>Edit</button>
                    <button className="btn btn-secondary" type="button"  onClick={this.handleDeleteClick}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-2 mt-3 mt-md-0">
              <button
                className={"btn " + (isToggleOn ? "btn-danger" : "btn-success")}
                onClick={this.handleToggleId}>
                {isToggleOn ? "Stop" : "Start"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Task;
