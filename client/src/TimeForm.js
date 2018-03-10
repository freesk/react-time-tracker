import React, { Component } from 'react';

import TimeFormEditOn from './TimeFormEditOn';
import TimeFormEditOff from './TimeFormEditOff';

class TimeForm extends Component {

  constructor(props) {
    super(props);

		this.state = {
			isEditModeOn: false,
			focusId: null
		};

		this.handleTimeEditIsOff = this.handleTimeEditIsOff.bind(this);
		this.handleTimeEditIsOn = this.handleTimeEditIsOn.bind(this);
		this.handleTimeEdit = this.handleTimeEdit.bind(this);

	}

	handleTimeEditIsOff() {
		this.setState({ isEditModeOn: false });
	}

	handleTimeEditIsOn(id) {
    this.setState({
      isEditModeOn: true,
      focusId: id
    });
  }

	handleTimeEdit(seconds) {
		this.setState({ isEditModeOn: false }, () => {
      if (seconds !== this.props.seconds)
			   this.props.onHandleTimeEdit(seconds);
		});
	}

	render() {
    return (
      <div className="TimeField">
        {
          this.state.isEditModeOn ?
            <TimeFormEditOn
              seconds={this.props.seconds}
              focusId={this.state.focusId}
              onHandleTimeEdit={this.handleTimeEdit}
              onHandleTimeEditIsOff={this.handleTimeEditIsOff} /> :
            <TimeFormEditOff
              seconds={this.props.seconds}
              onHandleTimeEditIsOn={this.handleTimeEditIsOn} />
        }
      </div>
    );
  }


}

export default TimeForm;
