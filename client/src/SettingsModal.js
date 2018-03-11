import React, { Component } from 'react';

class PasswordComfirmation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			password: "",
			confirmation: "",
			error: ""
		};

		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfirmationChange = this.handleConfirmationChange.bind(this);
	}

	handleResponse() {
		if (!this.state.password)
			return this.setState({ error: "The password is missing" });
		else if (this.state.password.length < 6)
			return this.setState({ error: "The password must contain at least 6 characters" });
		else if (this.state.password !== this.state.confirmation)
			return this.setState({ error: "The passwords must be the same" });

		this.setState({ error: "" }, () => {
			this.props.onPasswordChange(this.state.password);
		});
	}

	handlePasswordChange(e) {
		this.setState({ password: e.target.value }, () => {
			this.handleResponse();
		})
	}

	handleConfirmationChange(e) {
		this.setState({ confirmation: e.target.value }, () => {
			this.handleResponse();
		})
	}

	render() {

		const error = this.state.error;

		return (
			<div>
				<div className="row">
					<div className="col-12">
						{error ? getErrorMessage(error) : null}
					</div>
				</div>
				<div className="row mt-2">
					<label className="col-3 col-form-label">Password</label>
					<div className="col-9">
						<input
							autoComplete="off"
							type="password"
							required
							className="form-control"
							onChange={this.handlePasswordChange}
							value={this.state.password} />
					</div>
				</div>
				<div className="row mt-3">
					<label className="col-3 col-form-label">Confirmation</label>
					<div className="col-9">
						<input
							autoComplete="off"
							type="password"
							required
							className="form-control"
							onChange={this.handleConfirmationChange}
							value={this.state.confirmation} />
					</div>
				</div>
			</div>
		);
	}

}

class SettingsModal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			password: "",
			email: "",
			rate: 0
		};

		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleRateChange = this.handleRateChange.bind(this);
	}

	handlePasswordChange(password) {
		this.setState({ password: password });
	}

	handleEmailChange(e) {
		this.setState({ email: e.target.value });
	}

	handleRateChange(e) {
		const value = e.target.value;
		const num = parseFloat(value, 10);

		if (num < 0)
			return this.setState({ error: "The rate must be greater or equal to zero"});

		this.setState({ rate: num });
	}

	handleSubmit() {
		console.log(this.state);
	}

	handleClose() {
		this.props.onHandleSettingsClose();
	}

	render() {

		const error = this.state.error;

		return (
			<div className="SettingsModal modal">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLongTitle">Settings</h5>
			        <button type="button" className="close" onClick={this.handleClose}>
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
							<PasswordComfirmation
								onPasswordChange={this.handlePasswordChange} />
							<hr />
							<div className="row mt-3">
								<label className="col-3 col-form-label">Email</label>
								<div className="col-9">
									<input
										autoComplete="off"
										type="email"
										required
										className="form-control"
										onChange={this.handleEmailChange}
										value={this.state.email} />
								</div>
							</div>
							<hr />
							<div className="row">
								<div className="col-12">
									{error ? getErrorMessage(error) : null}
								</div>
							</div>
							<div className="row mt-3">
								<label className="col-3 col-form-label">Rate</label>
								<div className="col-9">
									<input
										autoComplete="off"
										type="number"
										required
										className="form-control"
										onChange={this.handleRateChange}
										value={this.state.rate} />
								</div>
							</div>
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
