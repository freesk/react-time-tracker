import React, { Component } from 'react';

class Project extends Component {
  render() {
    return (
      <div className="Project">
        <fieldset>
          <legend>{this.props.project}</legend>
          {this.props.children}
        </fieldset>
      </div>
    );
  }
}

export default Project;
