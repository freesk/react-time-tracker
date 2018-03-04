import React, { Component } from 'react';

class TimeFormEditOff extends Component {
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
				<div className="row">
					<div className="col-6 col-xs-8">
						<div className="input-group">
							<input
								disabled
								className="form-control"
								value={hh} />
							<input
								disabled
								className="form-control"
								value={mm} />
							<input
								disabled
								className="form-control"
								value={ss} />
						</div>
					</div>
					<div className="col-6 col-xs-4">
						<div className="btn-group">
							<button className="btn btn-secondary" type="button"  onClick={this.handleClick}>Edit</button>
							<button className="btn btn-secondary" type="button"  onClick={this.handleDeleteClick}>Delete</button>
						</div>
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

export default TimeFormEditOff;
