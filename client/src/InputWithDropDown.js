import React, { Component } from 'react';

class DropDownItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onHandleDropDownClick(this.props.item);
  }

  render() {
    return(
      <a className="dropdown-item" onClick={this.handleClick}>
        {this.props.item}
      </a>
    );
  }
}

class InputWithDropDown extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDropDownClick = this.handleDropDownClick.bind(this);
  }

  handleChange(event) {
    this.props.onHandleChange(event.target.value);
  }

  handleDropDownClick(item) {
    this.props.onHandleChange(item);
  }

  render() {

    const dropDownItems = this.props.items.map(item => {
      if(!item) return null;
      return <DropDownItem key={item} item={item} onHandleDropDownClick={this.handleDropDownClick} />
    });

    const isDisabled = dropDownItems.length ? false : true;

    return(
      <div className="input-group">
        <div className="input-group-btn">
          <button type="button" className={"btn btn-secondary dropdown-toggle" + (isDisabled ? " disabled" : "")} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu">
            {dropDownItems}
          </div>
        </div>
        <input
          autoComplete="off"
          required={this.props.required}
          className="form-control"
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          value={this.props.value} />
      </div>
    );
  }
}

export default InputWithDropDown;
