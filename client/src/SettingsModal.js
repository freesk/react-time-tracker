import React, { Component } from 'react';

class SettingsModal extends Component {

	constructor(props) {
		super(props);

		const properties = [
			"password",
			"password2",
			"email",
			"rate"
		];

		const obj = {};

		properties.forEach(prop => obj[prop] = "");

		obj.error = "";

		this.state = obj;

		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		// const obj = {};
		// const id = e.target.id;
		// const value = e.target.value;
		//
		// obj[id] = value;

		// this.setState(obj, () => {
		// 	// console.log(this.state);
		// });
	}

	handleSubmit() {
		this.props.onHandleSettingsUpdate();
	}

	handleClose() {
		this.props.onHandleSettingsClose();
	}

	render() {

		// const props = [
		// 	"client",
		// 	"project",
		// 	"activity",
		// 	"details"
		// ];

		// const inputs = props.map(prop => {
		// 	return (
		// 		<div className="row mt-3" key={prop}>
		// 			<label className="col-2 col-form-label">{prop}</label>
		// 			<div className="col-10">
		// 				<input
		// 					autoComplete="off"
		// 					type="text"
		//           required
		// 					id={prop}
		//           className="form-control"
		//           onChange={this.handleChange}
		//           value={this.state[prop]} />
		// 			</div>
		// 		</div>
		// 	);
		// });

		const error = this.state.error;

		// console.log(inputs);

		return (
			<div className="EditModal modal">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLongTitle">Settings</h5>
			        <button type="button" className="close" onClick={this.handleClose}>
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
							<div className="mt-4 ml-4 mr-4">
								{error ? getErrorMessage(error) : null}

							</div>
			      <div className="modal-body">
			      </div>
			      <div className="modal-footer">
							<button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
			        <button type="button" className="btn btn-secondary" onClick={this.handleClose}>Close</button>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}

function getErrorMessage(message) {
	return (
		<div className="alert alert-danger" role="alert">
			{message}
		</div>
	);
}

export default SettingsModal;
