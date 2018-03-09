import React, { Component } from 'react';

import clone from '../node_modules/clone';

function createToken() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 32; i++)
    	text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

class CheckListItem extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.id = createToken();
	}

	handleChange(e) {
		this.props.onHandleChange(this.props.name);
	}

	render() {
		return (
			<div>
				<input
					type="checkbox"
					id={this.id}
					onChange={this.handleChange}
					checked={this.props.checked} />
				<label className="form-check-label" htmlFor={this.id}>
					{this.props.name}
				</label>
			</div>
		);
	}
}

class CheckList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			checked: true
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleChildrenChange = this.handleChildrenChange.bind(this);
	}

	handleChange() {
		this.setState({
			items: this.state.checked ? this.props.items : [],
			checked: !this.state.checked
		}, () => {
			this.updateParent();
		});
	}

	updateParent() {
		this.props.onHandleItemsSelection(this.state.items);
	}

	handleChildrenChange(item) {
		// create a copy of the array
		const items = this.state.items.slice();
		// get its index
		const index = items.indexOf(item);
		if (index < 0)
			items.push(item);
		else
			items.splice(index, 1);
		// apply to the state
		this.setState({ items: items }, () => {
			// send back the difference
			this.updateParent();
		});
	}

	render() {

		const items = this.props.items;

		const body = items.map(name => {

			const index = this.state.items.indexOf(name);
			const checked = index < 0 ? true : false;

			return (
				<CheckListItem
					checked={checked}
					key={name}
					name={name}
					onHandleChange={this.handleChildrenChange}
				/>
			);
		});

		return (
			<div className="mt-3">
				<CheckListItem
					checked={this.state.checked}
					key={"Select all"}
					name={"Select all"}
					onHandleChange={this.handleChange} />
				<div className="mt-2">
					{body}
				</div>
			</div>
		);
	}
}

export default CheckList;
