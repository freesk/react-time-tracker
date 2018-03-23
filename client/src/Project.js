import React, { Component } from 'react';

class Project extends Component {
  render() {
    return (
      <div className="Project">
        <fieldset className="pl-1 pr-1 pl-sm-3 pr-sm-3">
          <legend>{this.props.project}</legend>
          {this.props.children}
        </fieldset>
      </div>
    );
  }
}

export default Project;
