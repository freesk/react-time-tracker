import React, { Component } from 'react';

class DropDownItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onHandleDropDownClick(this.props.item);
  }

  render() {
    return(
      <a className="dropdown-item" onClick={this.handleClick}>
        {this.props.item}
      </a>
    );
  }
}

class InputWithDropDown extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDropDownClick = this.handleDropDownClick.bind(this);
  }

  handleChange(event) {
    this.props.onHandleChange(event.target.value);
  }

  handleDropDownClick(item) {
    this.props.onHandleChange(item);
  }

  render() {

    const dropDownItems = this.props.items.map(item =>
      <DropDownItem key={item} item={item} onHandleDropDownClick={this.handleDropDownClick} />
    );

    return(
      <div className="input-group">
        <div className="input-group-btn">
          <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu">
            {dropDownItems}
          </div>
        </div>
        <input
          required={true}
          className="form-control"
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          value={this.props.value} />
      </div>
    );
  }
}

class NewRecordForm extends Component {

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
      project: this.state.project,
      activity: this.state.activity,
      details: this.state.details,
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
      <form className="NewRecordForm" onSubmit={this.handleNewTask}>

        <div className="row no-gutters">
          <div className="col-12 col-md-3 mb-3 mb-md-0 pr-md-2">
            <InputWithDropDown
              items={this.props.projects}
              placeholder={"Project"}
              onHandleChange={this.handleProjectChange}
              value={this.state.project} />
          </div>
          <div className="col-12 col-md-3 mb-3 mb-md-0 pr-md-2">
            <InputWithDropDown
              items={this.props.activities}
              placeholder={"Activity"}
              onHandleChange={this.handleActivityChange}
              value={this.state.activity} />
          </div>
          <div className="col-12 col-md-3 mb-3 mb-md-0 pr-md-2">
            <InputWithDropDown
              items={this.props.details}
              placeholder={"Details"}
              onHandleChange={this.handleDetailsChange}
              value={this.state.details} />
          </div>
          <div className="col-12 col-md-3">
            <button className="btn btn-secondary btn-block" type="submit">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default NewRecordForm;
