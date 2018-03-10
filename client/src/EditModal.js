import React, { Component } from 'react';

class EditModal extends Component {

	constructor(props) {
		super(props);

		const editId = this.props.editId;
		const tasks = this.props.tasks.slice();
		const found = tasks.find(task => task._id === editId);

		const properties = [
			"_id",
			"activity",
			"client",
			"details",
			"project",
			"seconds",
		];

		const obj = {};

		properties.forEach(prop => obj[prop] = found[prop]);

		obj.error = "";

		this.state = obj;

		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const obj = {};
		const id = e.target.id;
		const value = e.target.value;

		if(id === "seconds") {
			const seconds = parseInt(value, 10);
			if (isNaN(seconds))
				return this.setState({ error: "enter a number for seconds" });
			obj[id] = seconds;
		} else {
			obj[id] = value;
		}

		this.setState(obj, () => {
			console.log(this.state);
		});
	}

	handleSubmit() {
		const properties = [
			"_id",
			"activity",
			"client",
			"details",
			"project",
			"seconds",
		];

		const obj = {};

		properties.forEach(prop => obj[prop] = this.state[prop]);

		this.props.onHandleRecordUpdate(obj);
	}

	handleClose() {
		this.props.onHandleClose();
	}

	render() {

		const props = [
			"activity",
			"client",
			"details",
			"project",
			"seconds"
		];

		const inputs = props.map(prop => {
			return (
				<div className="row mt-2" key={prop}>
					<label className="col-2 col-form-label">{prop}</label>
					<div className="col-10">
						<input
							type="text"
		          required
							id={prop}
		          className="form-control"
		          onChange={this.handleChange}
		          value={this.state[prop]} />
					</div>
				</div>
			);
		});

		const error = this.state.error;

		return (
			<div className="modal">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLongTitle">Edit {this.state._id}</h5>
			        <button type="button" className="close" onClick={this.handleClose}>
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
							<div className="mt-4 ml-4 mr-4">
								{error ? getErrorMessage(error) : null}
								{inputs}
							</div>
			      <div className="modal-body">
			      </div>
			      <div className="modal-footer">
							<button type="button" className="btn btn-secondary" onClick={this.handleSubmit}>Submit</button>
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

export default EditModal;
