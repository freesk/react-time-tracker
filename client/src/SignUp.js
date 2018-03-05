import React, { Component } from 'react';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			email: ""
		};

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleEmailChange(event) {
		this.setState({ email: event.target.value });
	}

	handleUsernameChange(event) {
		this.setState({ username: event.target.value });
	}

	handlePasswordChange(event) {
		this.setState({ password: event.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("submit");
		this.props.onHandleSignUpSubmit({
			username: this.state.username,
			password: this.state.password,
			email: this.state.email
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
			  <div className="form-group row">
			    <label className="col-sm-2 col-form-label">Email</label>
			    <div className="col-sm-10">
			      <input
							required
							type="email"
							className="form-control"
							placeholder="Email"
							value={this.state.email}
							onChange={this.handleEmailChange} />
			    </div>
			  </div>
				<div className="form-group row">
			    <label className="col-sm-2 col-form-label">Username</label>
			    <div className="col-sm-10">
			      <input
							required
							type="text"
							className="form-control"
							placeholder="Username"
							value={this.state.username}
							onChange={this.handleUsernameChange} />
			    </div>
			  </div>
			  <div className="form-group row">
			    <label className="col-sm-2 col-form-label">Password</label>
			    <div className="col-sm-10">
			      <input
							required
							type="password"
							className="form-control"
							placeholder="Password"
							value={this.state.password}
							onChange={this.handlePasswordChange} />
			    </div>
			  </div>
				<div className="form-group row">
				 	<div className="col-12">
						<button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
					</div>
			 	</div>
			</form>
		);
	}
}

export default SignUp;
