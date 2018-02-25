// react
import React, { Component } from 'react';

// style
import './App.css';

// my components
import TaskTable from './TaskTable';

// function getRandomInt(a, b) {
//   Math.floor(Math.random() * b) + a;
// }

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {

    const filterText = this.props.filterText;

    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={this.handleFilterTextChange} />
      </form>
    );
  }
}

class FilterableTaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = { filterText: '' };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    return (
      <div className={'FilterableTaskTable'} >
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange} />
        <TaskTable
          tasks={this.props.tasks}
          filterText={this.state.filterText} />
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          project: "React Application",
          activity: "Setting up the environment",
          details: "Downloadibg npm packages",
          seconds: 3600
        },
        {
          project: "React Application",
          activity: "Creating front end",
          details: "Writing static React representation",
          seconds: 3600
        },
        {
          project: "React Tutorials",
          activity: "Studying basics of the framework",
          details: "https://reactjs.org/docs",
          seconds: 3600
        }
      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(task) {
    var tasks = this.state.tasks.slice();
    tasks.push(task);
    this.setState({ tasks: tasks });
  }

  render() {
    return (
      <div>
        <h1>Time Tracker V1.0</h1>
        <FilterableTaskTable tasks={this.state.tasks} />
        <NewTaskForm
          onHandleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onHandleChange(event.target.value);
  }

  render() {
    const value = this.props.value;
    return (
      <label>
        {this.props.label}
        <input
          value={value}
          onChange={this.handleChange} />
      </label>
    );
  }
}

class NewTaskForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      project: "",
      activity: "",
      details: ""
    }

    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // alert("submit")
    const task = {
      project: this.state.project,
      activity: this.state.activity,
      details: this.state.details,
      seconds: 0
    }

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
      <form>
        <TextInput
          label={"Project: "}
          onHandleChange={this.handleProjectChange}
          value={this.state.project} />
        <TextInput
          label={"Activity: "}
          onHandleChange={this.handleActivityChange}
          value={this.state.activity} />
        <TextInput
          label={"Details: "}
          onHandleChange={this.handleDetailsChange}
          value={this.state.details} />
        <button onClick={this.handleSubmit}>SUBMIT</button>
      </form>
    );
  }
}

export default App;
