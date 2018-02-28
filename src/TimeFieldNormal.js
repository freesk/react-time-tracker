import React, { Component } from 'react';

import TextInput from './TextInput';

class TimeFieldNormal extends Component {
	constructor(props) {
    super(props);

		this.handleClick = this.handleClick.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

	handleDeleteClick() {
		this.props.onHandleDeleteClick();
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
			<form>
				<div className="input-group">
						<TextInput
							className="form-control"
							onHandleChange={function(){}}
							value={hh} />
						<TextInput
							className="form-control"
							onHandleChange={function(){}}
							value={mm} />
						<TextInput
							className="form-control"
							onHandleChange={function(){}}
							value={ss} />
						<div className="input-group-append">
							<button className="btn btn-outline-secondary" type="button"  onClick={this.handleClick}>Edit</button>
							<button className="btn btn-outline-secondary" type="button"  onClick={this.handleDeleteClick}>Delete</button>
						</div>
				</div>
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
