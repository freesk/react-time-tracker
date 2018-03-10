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
			this.props.onHandleTimeEdit(seconds);
		});
	}

	render() {
		if(this.state.isEditModeOn)
      return <TimeFormEditOn
        seconds={this.props.seconds}
        focusId={this.state.focusId}
        onHandleTimeEdit={this.handleTimeEdit}
        onHandleTimeEditIsOff={this.handleTimeEditIsOff} />;
    else
      return <TimeFormEditOff
        seconds={this.props.seconds}
        onHandleTimeEditIsOn={this.handleTimeEditIsOn} />;
	}

}

export default TimeForm;
