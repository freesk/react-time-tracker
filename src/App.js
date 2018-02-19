import React, { Component } from 'react';
import './App.css';

const TASKS = [
  {
    project: "React Application",
    activity: "Setting up the environment",
    details: "Downloadibg npm packages",
    time: "0.25"
  },
  {
    project: "React Application",
    activity: "Creating front end",
    details: "Writing static React representation",
    time: "0.75"
  },
  {
    project: "React Tutorials",
    activity: "Studying basics of the framework",
    details: "https://reactjs.org/docs",
    time: "2.0"
  }
];

class TaskProjectRow extends Component {
  render() {
    return (
      <h2 className="TaskProjectRow">{this.props.project}</h2>
    );
  }
}

class ToggleButton extends Component {
  render() {
    return (
      <button type="button">Run</button>
    );
  }
}

class TaskRow extends Component {
  render() {
    return (
      <div className={'TaskRow'}>
        <div className={'col-1'}>
          <div className={'activity'}>{this.props.activity}</div>
          <div className={'details'}>{this.props.details}</div>
        </div>
        <div className={'col-2'}>
          {this.props.time}
        </div>
        <div className={'col-3'}>
          <ToggleButton />
        </div>
      </div>
    );
  }
}

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

class TaskTable extends Component {

  render() {
    const filterText = this.props.filterText;

    const rows = [];
    let lastProject = null;

    this.props.tasks.forEach((task) => {
      if (
        task.activity.indexOf(filterText) === -1 &&
        task.project.indexOf(filterText) === -1 &&
        task.details.indexOf(filterText) === -1
      ) return;

      if (task.project !== lastProject) {
        rows.push(
          <TaskProjectRow
            project={task.project}
            key={task.project} />
        );
      }

      rows.push(
        <TaskRow
          activity={task.activity}
          time={task.time}
          details={task.details}
          key={task.activity} />
      );

      lastProject = task.project;

    });

    return (
      <div>{rows}</div>
    );

  }

}

class App extends Component {
  render() {
    return (
      <div>
        <h1>Time Tracker V1.0</h1>
        <FilterableTaskTable tasks={TASKS} />
      </div>
    );
  }
}

export default App;
