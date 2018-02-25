import React, { Component } from 'react';

// my components
import Button from './Button';

class TaskTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentId: null
    }
		this.newID = null;
		this.handleIdChnage = this.handleIdChnage.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }

  handleTimeUpdate(obj) {
    this.props.onHandleTimeUpdate(obj);
  }

	handleIdChnage(newId) {
		this.newID = newId;
		this.setState({ currentId: newId });
	}

  render() {
    const filterText = this.props.filterText;

    const rows = [];
    let lastProject = null;

    this.props.tasks.forEach((task) => {
      if (
        task.activity.indexOf(filterText) === -1 &&
        task.project.indexOf(filterText) === -1 &&
        task.details.indexOf(filterText) === -1
      ) return;

      if (task.project !== lastProject) {
        rows.push(
          <TaskProjectRow
            project={task.project}
            key={task.project} />
        );
      }

			// turned off by default
			let isToggleOn = false;

			// if the task id is in the currentId run it
			if(task.id === this.state.currentId)
				isToggleOn = true;

			// if the task id is in the currentId and in the this.newId turn it off
			if(this.state.currentId === this.newId)
				isToggleOn = false;

      rows.push(
        <TaskRow
					id={task.id}
					isToggleOn={isToggleOn}
          onHandleIdChange={this.handleIdChnage}
          onHandleTimeUpdate={this.handleTimeUpdate}
          activity={task.activity}
          seconds={task.seconds}
          details={task.details}
          key={task.id} />
      );

      lastProject = task.project;

    });

    return (
      <div>{rows}</div>
    );

  }

}

class TaskRow extends Component {

  constructor(props) {
    super(props);
		this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if(this.props.isToggleOn) {
			this.props.onHandleIdChange(null);
    } else {
			this.props.onHandleIdChange(this.props.id);
			this.startTimer();
    }
  }

  tick() {
    this.props.onHandleTimeUpdate({
      id: this.props.id,
      seconds: this.props.seconds + 1
    });
  }

  startTimer() {
    this.timerID = setInterval(() => this.tick(),
      1000
    );
  }

  stopTimer() {
    clearInterval(this.timerID);
  }

	formatTime(seconds) {
		var time = new Date(null);
		time.setSeconds(seconds);
		return time.toISOString().substr(11, 8);
	}

  render() {
		// make sure it is not running on each render
		if(!this.props.isToggleOn)
			this.stopTimer();

    return (
      <div className={'TaskRow'}>
        <div className={'col-1'}>
          <div className={'activity'}>{this.props.activity}</div>
          <div className={'details'}>{this.props.details}</div>
        </div>
        <div className={'col-2'}>
          {this.formatTime(this.props.seconds)}
        </div>
        <div className={'col-3'}>
          <Button
            text={this.props.isToggleOn ? "STOP" : "RUN"}
            onHandleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

class TaskProjectRow extends Component {
  render() {
    return (
      <h2 className="TaskProjectRow">{this.props.project}</h2>
    );
  }
}

export default TaskTable;
