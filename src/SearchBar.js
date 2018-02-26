import React, { Component } from 'react';

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

export default SearchBar;
