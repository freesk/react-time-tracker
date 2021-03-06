import React, { Component } from 'react';

import InputWithDropDown from './InputWithDropDown';

class NewRecordForm extends Component {

  constructor(props) {
    super(props);

    // initial state
    this.state = {
      project: "",
      activity: "",
      details: "",
      client: ""
    }

    // handlers
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleClientChange = this.handleClientChange.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
  }

  handleNewTask(event) {
    // to stop actual submit action
    event.preventDefault();
    // wrap up a new piece of data
    const task = {
      project: this.state.project,
      activity: this.state.activity,
      details: this.state.details,
      client: this.state.client,
      timestamp: this.props.currentDate.unix()
    }
    // clear the state
    this.setState({
      project: "",
      activity: "",
      details: "",
      client: ""
    });
    // pass it to the parent
    this.props.onHandleNewTask(task);
  }

  handleProjectChange(project) {
    this.setState({ project: project });
  }

  handleActivityChange(activity) {
    this.setState({ activity: activity });
  }

  handleClientChange(activity) {
    this.setState({ client: activity });
  }

  handleDetailsChange(details) {
    this.setState({ details: details });
  }

  render() {

    return (
      <form className="NewRecordForm" onSubmit={this.handleNewTask}>
        <div className="row no-gutters">
          <div className="col-12 col-md-2 mb-3 mb-md-0 pr-md-2">
            <InputWithDropDown
              required={true}
              items={this.props.clients}
              placeholder={"Client"}
              onHandleChange={this.handleClientChange}
              value={this.state.client} />
          </div>
          <div className="col-12 col-md-3 mb-3 mb-md-0 pr-md-2">
            <InputWithDropDown
              required={true}
              items={this.props.projects}
              placeholder={"Project"}
              onHandleChange={this.handleProjectChange}
              value={this.state.project} />
          </div>
          <div className="col-12 col-md-2 mb-3 mb-md-0 pr-md-2">
            <InputWithDropDown
              required={true}
              items={this.props.activities}
              placeholder={"Activity"}
              onHandleChange={this.handleActivityChange}
              value={this.state.activity} />
          </div>
          <div className="col-12 col-md-3 mb-3 mb-md-0 pr-md-2">
            <InputWithDropDown
              required={true}
              items={this.props.details}
              placeholder={"Details"}
              onHandleChange={this.handleDetailsChange}
              value={this.state.details} />
          </div>
          <div className="col-12 col-md-2">
            <button className="btn btn-secondary btn-block" type="submit">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default NewRecordForm;
