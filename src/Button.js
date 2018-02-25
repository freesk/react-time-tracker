import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onHandleClick(e);
  }

  render() {
    return (
      <button className={this.props.className} type="button" onClick={this.handleClick}>
        {this.props.text}
      </button>
    );
  }
}

export default Button;
