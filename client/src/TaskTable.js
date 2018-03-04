import React, { Component } from 'react';

import collectjs from '../node_modules/collect.js';

// my components
import TaskRow from './TaskRow';

class TaskTable extends Component {

  constructor(props) {
    super(props);
		this.handleToggleId = this.handleToggleId.bind(this);
    this.handleTimeEdit = this.handleTimeEdit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleTimeEdit(id, seconds) {
    this.props.onHandleTimeEdit(id, seconds);
  }

  handleToggleId(id) {
    this.props.onHandleToggleId(id);
  }

  handleDeleteClick(id) {
    this.props.onHandleDeleteClick(id);
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

          task._id === this.props.currentId

          const id = task._id;
          const currentId = this.props.currentId;
        	const isToggleOn = id === currentId;

          taskRows.push(
            <TaskRow
        			_id={task._id}
              isToggleOn={isToggleOn}
              onHandleToggleId={this.handleToggleId}
              onHandleTimeEdit={this.handleTimeEdit}
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
