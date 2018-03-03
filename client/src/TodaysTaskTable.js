import React, { Component } from 'react';

import SearchBar from './SearchBar';
import TaskTable from './TaskTable';

class TodaysTaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = { filterText: '' };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleTimeUpdate(obj) {
    this.props.onHandleTimeUpdate(obj);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleDeleteClick(id) {
    this.props.onHandleDeleteClick(id);
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
          filterText={this.state.filterText}
          onHandleDeleteClick={this.handleDeleteClick} />
      </div>
    );
  }
}

export default TodaysTaskTable;
