import React, { Component } from 'react';

import TextInput from './TextInput';

// temporal solution for unique id
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class NewTaskForm extends Component {

  constructor(props) {
    super(props);

    const todaysDate = this.props.todaysDate;
    const todaysDateSplit = todaysDate.split("-");

    let t = new Date();
    t.setMonth(parseInt(todaysDateSplit[0]) - 1);
    t.setDate(parseInt(todaysDateSplit[1]));
    t.setFullYear(parseInt(todaysDateSplit[2]));

    // initial state
    this.state = {
      project: "",
      activity: "",
      details: "",
      timestamp: t
    }

    // handlers
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

    const todaysDate = this.props.todaysDate;
    const todaysDateSplit = todaysDate.split("-");

    let t = new Date();
    t.setMonth(parseInt(todaysDateSplit[0]) - 1);
    t.setDate(parseInt(todaysDateSplit[1]));
    t.setFullYear(parseInt(todaysDateSplit[2]));

    // to stop actual submit action
    event.preventDefault();
    // wrap up a new piece of data
    const task = {
      id: getRandomInt(1000000),
      project: this.state.project,
      activity: this.state.activity,
      details: this.state.details,
      seconds: 0,
      timestamp: t
    }
    // pass it to the parent
    this.props.onHandleSubmit(task);
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
            <button className="btn btn-outline-secondary" type="button"  onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>

      </form>
    );
  }
}

export default NewTaskForm;
