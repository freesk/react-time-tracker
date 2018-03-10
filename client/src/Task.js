import React, { Component } from 'react';

import TimeFormEditOn from './TimeFormEditOn';
import TimeFormEditOff from './TimeFormEditOff';

class Task extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false,
      focusId: null
    };

		this.handleToggleId = this.handleToggleId.bind(this);
		this.handleTimeEdit = this.handleTimeEdit.bind(this);
    this.handleTimeEditIsOn = this.handleTimeEditIsOn.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleTimeEditIsOff = this.handleTimeEditIsOff.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick() {
    this.props.onHandleRecordEdit(this.props._id)
  }

  handleTimeEditIsOff() {
    this.setState({ isEditMode: false });
  }

	handleTimeEdit(seconds) {
    this.setState({ isEditMode: false });
    this.props.onHandleTimeEdit(this.props._id, seconds);
	}

  handleTimeEditIsOn(id) {
    this.setState({
      isEditMode: true,
      focusId: id
    });
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
      timeField = <TimeFormEditOn
        seconds={this.props.seconds}
        focusId={this.state.focusId}
        onHandleTimeEdit={this.handleTimeEdit}
        onHandleTimeEditIsOff={this.handleTimeEditIsOff}  />
    } else {
      timeField = <TimeFormEditOff
        seconds={this.props.seconds}
        onHandleTimeEditIsOn={this.handleTimeEditIsOn} />
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
              <div className="row">
                <div className="col-6 col-xs-8">
                  {timeField}
                </div>
                <div className="col-6 col-xs-4">
                  <div className="btn-group">
                    <button className="btn btn-secondary" type="button"  onClick={this.handleEditClick}>Edit</button>
                    <button className="btn btn-secondary" type="button"  onClick={this.handleDeleteClick}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-2">
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
