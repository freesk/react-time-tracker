import React, { Component } from 'react';

import SearchBar from './SearchBar';
import TaskTable from './TaskTable';
import NewTaskForm from './NewTaskForm';

class TodaysTaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = { filterText: '' };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleTimeUpdate(obj) {
    this.props.onHandleTimeUpdate(obj);
  }

  handleNewTask(task) {
    this.props.onHandleNewTask(task);
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange} />
        <TaskTable
          onHandleTimeUpdate={this.handleTimeUpdate}
          tasks={this.props.tasks}
          filterText={this.state.filterText} />
        <NewTaskForm
          date={this.props.date}
          onHandleNewTask={this.handleNewTask} />
      </div>
    );
  }
}

export default TodaysTaskTable;
