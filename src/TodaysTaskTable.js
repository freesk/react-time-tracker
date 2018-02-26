import React, { Component } from 'react';

import SearchBar from './SearchBar';
import TaskTable from './TaskTable';

class TodaysTaskTable extends Component {
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
      <div>
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

export default TodaysTaskTable;
