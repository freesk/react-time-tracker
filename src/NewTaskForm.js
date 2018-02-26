import React, { Component } from 'react';

import TextInput from './TextInput';

// temporal solution for unique id
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class NewTaskForm extends Component {

  constructor(props) {
    super(props);

    // initial state
    this.state = {
      project: "",
      activity: "",
      details: ""
    }

    // handlers
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
  }

  handleNewTask(event) {
    // to stop actual submit action
    event.preventDefault();
    // wrap up a new piece of data
    const task = {
      id: getRandomInt(1000000),
      project: this.state.project,
      activity: this.state.activity,
      details: this.state.details,
      seconds: 0,
      date: this.props.date
    }
    // pass it to the parent
    this.props.onHandleNewTask(task);
  }

  handleProjectChange(project) {
    this.setState({ project: project });
  }

  handleActivityChange(activity) {
    this.setState({ activity: activity });
  }

  handleDetailsChange(details) {
    this.setState({ details: details });
  }

  render() {
    return (
      <form className="NewTaskForm">
        <div className="input-group">
          <TextInput
            className="form-control"
            placeholder={"Project"}
            onHandleChange={this.handleProjectChange}
            value={this.state.project} />
          <TextInput
            className="form-control"
            placeholder={"Activity"}
            onHandleChange={this.handleActivityChange}
            value={this.state.activity} />
          <TextInput
            className="form-control"
            placeholder={"Details"}
            onHandleChange={this.handleDetailsChange}
            value={this.state.details} />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={this.handleNewTask}>Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default NewTaskForm;
