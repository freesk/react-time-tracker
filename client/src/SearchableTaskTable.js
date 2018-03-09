import React, { Component } from 'react';

import SearchBar from './SearchBar';
import TaskTable from './TaskTable';

class SearchableTaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      matchCase: false
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleTimeEdit = this.handleTimeEdit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleToggleId = this.handleToggleId.bind(this);
    this.handleMatchCaseChange = this.handleMatchCaseChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({ filterText: filterText });
  }

  handleMatchCaseChange(checked) {
    this.setState({ matchCase: checked });
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
          onFilterTextChange={this.handleFilterTextChange}
          onHandleMatchCaseChange={this.handleMatchCaseChange} />
        <TaskTable
          currentId={this.props.currentId}
          onHandleTimeEdit={this.handleTimeEdit}
          tasks={this.props.tasks}
          filterText={this.state.filterText}
          matchCase={this.state.matchCase}
          onHandleDeleteClick={this.handleDeleteClick}
          onHandleToggleId={this.handleToggleId} />
      </div>
    );
  }
}

export default SearchableTaskTable;
