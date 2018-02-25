import React, { Component } from 'react';

// general purpose text input component
class TextInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onHandleChange(event.target.value);
  }

  render() {
    const value = this.props.value;
    return (
      <label>
        {this.props.label}
        <input
          value={value}
          placeholder={this.props.placeholder}
          onChange={this.handleChange} />
      </label>
    );
  }
}

export default TextInput;
