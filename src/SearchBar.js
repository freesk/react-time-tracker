import React, { Component } from 'react';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(event) {
    this.props.onFilterTextChange(event.target.value);
  }

  render() {

    const filterText = this.props.filterText;

    return (
      <form>
        <div class="form-group">
          <input
            className="form-control"
            placeholder="Search..."
            value={filterText}
            onChange={this.handleFilterTextChange} />
        </div>
      </form>
    );
  }
}

export default SearchBar;
