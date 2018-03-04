import React, { Component } from 'react';

import collectjs from '../node_modules/collect.js';

// my components
import Project from './Project';
import Task from './Task';

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

          const id = task._id;
          const currentId = this.props.currentId;
        	const isToggleOn = id === currentId;

          taskRows.push(
            <Task
        			_id={id}
              isToggleOn={isToggleOn}
              onHandleToggleId={this.handleToggleId}
              onHandleTimeEdit={this.handleTimeEdit}
              onHandleDeleteClick={this.handleDeleteClick}
              activity={task.activity}
              seconds={task.seconds}
              details={task.details}
              key={id} />
          );

        }

        if(taskRows.length)
          projectRows.push(
            <Project
              key={project}
              project={project}>
              {taskRows}
            </Project>
          );

      }
    }

    return (
      <div>{projectRows}</div>
    );

  }

}

export default TaskTable;
