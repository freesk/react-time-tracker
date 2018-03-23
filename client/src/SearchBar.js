import React, { Component } from 'react';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleMatchCaseChange = this.handleMatchCaseChange.bind(this);
  }

  handleFilterTextChange(event) {
    this.props.onFilterTextChange(event.target.value);
  }

  handleMatchCaseChange(event) {
    this.props.onHandleMatchCaseChange(event.target.checked);
  }

  render() {

    const filterText = this.props.filterText;

    return (
      <form>
        <div className="form-check">
          <label className="form-check-label">
            <input
              className="form-check-input mr-2"
              checked={this.props.matchCase}
              onChange={this.handleMatchCaseChange}
              type="checkbox" />
            Match Case
          </label>
        </div>
        <input
          autoComplete="off"
          className="form-control"
          placeholder="Search..."
          value={filterText}
          onChange={this.handleFilterTextChange} />
      </form>
    );
  }
}

export default SearchBar;
