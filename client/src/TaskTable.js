import React, { Component } from 'react';

import collectjs from '../node_modules/collect.js';

// my components
import TaskRow from './TaskRow';

class TaskTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentId: null
    }
		this.newID = null;
		this.handleIdChnage = this.handleIdChnage.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick(id) {
    this.props.onHandleDeleteClick(id);
  }

  handleTimeUpdate(obj, forced) {
    this.props.onHandleTimeUpdate(obj, forced);
  }

	handleIdChnage(newId) {
		this.newID = newId;
		this.setState({ currentId: newId });
	}

  render() {
    const filterText = this.props.filterText;
    const collection = collectjs(this.props.tasks);
    const grouped = collection.groupBy('project');
    const projects = grouped.all();

    let projectRows = [];

    for (var project in projects) {
      if (projects.hasOwnProperty(project)) {

        let taskRows = [];

        const tasks = projects[project].items;

        for (var i = 0; i < tasks.length; i++) {
          const task = tasks[i];

          if (
            task.activity.indexOf(filterText) === -1 &&
            task.project.indexOf(filterText) === -1 &&
            task.details.indexOf(filterText) === -1
          ) continue;

        	// turned off by default
        	let isToggleOn = false;

        	// if the task id is in the currentId run it
        	if(task._id === this.state.currentId)
        		isToggleOn = true;

        	// if the task id is in the currentId and in the this.newId turn it off
        	if(this.state.currentId === this.newId)
        		isToggleOn = false;

          taskRows.push(
            <TaskRow
        			_id={task._id}
        			isToggleOn={isToggleOn}
              onHandleIdChange={this.handleIdChnage}
              onHandleTimeUpdate={this.handleTimeUpdate}
              onHandleDeleteClick={this.handleDeleteClick}
              activity={task.activity}
              seconds={task.seconds}
              details={task.details}
              key={task._id} />
          );

        }

        if(taskRows.length)
          projectRows.push(
            <TaskProjectRow
              key={project}
              project={project}>
              {taskRows}
            </TaskProjectRow>
          );

      }
    }

    return (
      <div>{projectRows}</div>
    );

  }

}

class TaskProjectRow extends Component {
  render() {
    return (
      <div className="TaskProjectRow">
        <fieldset>
          <legend>{this.props.project}</legend>
          {this.props.children}
        </fieldset>
      </div>
    );
  }
}

export default TaskTable;
