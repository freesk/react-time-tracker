import React, { Component } from 'react';

import SearchBar from './SearchBar';
import TaskTable from './TaskTable';

class TodaysTaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = { filterText: '' };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleTimeEdit = this.handleTimeEdit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleToggleId = this.handleToggleId.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleTimeEdit(id, seconds) {
    this.props.onHandleTimeEdit(id, seconds);
  }

  handleToggleId(id) {
    this.props.onHandleToggleId(id);
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
          currentId={this.props.currentId}
          onHandleTimeEdit={this.handleTimeEdit}
          tasks={this.props.tasks}
          filterText={this.state.filterText}
          onHandleDeleteClick={this.handleDeleteClick}
          onHandleToggleId={this.handleToggleId} />
      </div>
    );
  }
}

export default TodaysTaskTable;
