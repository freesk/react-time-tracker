// react
import React, { Component } from 'react';

// style
import './App.css';

// my components
import TaskTable from './TaskTable';
import TextInput from './TextInput';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.props.onFilterTextChange(filterText);
  }

  render() {

    const filterText = this.props.filterText;

    return (
      <form>
      <TextInput
        placeholder="Search..."
        value={filterText}
        onHandleChange={this.handleFilterTextChange} />
      </form>
    );
  }
}

class FilterableTaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = { filterText: '' };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleTimeUpdate(obj) {
    this.props.onHandleTimeUpdate(obj);
  }

  render() {
    return (
      <div className={'FilterableTaskTable'} >
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange} />
        <TaskTable
          onHandleTimeUpdate={this.handleTimeUpdate}
          tasks={this.props.tasks}
          filterText={this.state.filterText} />
      </div>
    );
  }
}

// temporal solution for unique id
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class App extends Component {
  constructor(props) {
    super(props);
    // keep all this data as a state
    this.state = {
      tasks: [
        {
          id: getRandomInt(1000000),
          project: "React Application",
          activity: "Setting up the environment",
          details: "Downloadibg npm packages",
          seconds: 3600
        },
        {
          id: getRandomInt(1000000),
          project: "React Application",
          activity: "Creating front end",
          details: "Writing static React representation",
          seconds: 3600
        },
        {
          id: getRandomInt(1000000),
          project: "React Tutorials",
          activity: "Studying basics of the framework",
          details: "https://reactjs.org/docs",
          seconds: 3600
        }
      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }

  handleTimeUpdate(obj) {
    let tasks = this.state.tasks.slice();

    const found = tasks.find(task => task.id === obj.id);
    const index = tasks.indexOf(found);

    tasks[index].seconds = obj.seconds;

    console.log(tasks);

    this.setState({ tasks: tasks });
  }

  handleSubmit(task) {
    let tasks = this.state.tasks.slice();
    tasks.push(task);

    console.log(tasks);

    this.setState({ tasks: tasks });
  }

  render() {
    return (
      <div>
        <h1>Time Tracker V1.0</h1>
        <FilterableTaskTable
          tasks={this.state.tasks}
          onHandleTimeUpdate={this.handleTimeUpdate} />
        <NewTaskForm
          onHandleSubmit={this.handleSubmit} />
      </div>
    );
  }
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // to stop actual submit action
    event.preventDefault();
    // wrap up a new piece of data
    const task = {
      id: getRandomInt(1000000),
      project: this.state.project,
      activity: this.state.activity,
      details: this.state.details,
      seconds: 0
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
