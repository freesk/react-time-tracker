import React, { Component } from 'react';

import TextInput from './TextInput';

class TimeFieldNormal extends Component {
	constructor(props) {
    super(props);

		this.handleClick = this.handleClick.bind(this);
  }

	handleClick(e) {
		e.preventDefault();
		this.props.onHandleClick();
	}

	render() {

		const formatedTime = formatTime(this.props.seconds);

		const hh = formatedTime.hh;
		const mm = formatedTime.mm;
		const ss = formatedTime.ss;

		return (
			<form className="TimeField normal">
				<TextInput
					onHandleChange={function(){}}
					value={hh} />
				<span>:</span>
				<TextInput
					onHandleChange={function(){}}
					value={mm} />
				<span>:</span>
				<TextInput
					onHandleChange={function(){}}
					value={ss} />
				<button onClick={this.handleClick}>EDIT</button>
			</form>
		);
	}
}

function formatTime(seconds) {
	let time = new Date(null);
	time.setSeconds(seconds);
	const formated = time.toISOString().substr(11, 8);
	const formatedSplit = formated.split(":");

	const hh = formatedSplit[0];
	const mm = formatedSplit[1];
	const ss = formatedSplit[2];

	return {
		hh: hh,
		mm: mm,
		ss: ss
	};
}

export default TimeFieldNormal;
