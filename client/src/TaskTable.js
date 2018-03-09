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
    const projectRows = [];
    const matchCase = this.props.matchCase;

    for (var project in projects) {
      if (projects.hasOwnProperty(project)) {

        const taskRows = [];
        const tasks = projects[project].items;

        for (let i = 0; i < tasks.length; i++) {
          const task = tasks[i];

          // form a search string
          const searchString = [task.project, task.activity, task.details].join(" ");

          console.log(matchCase);
          console.log(searchString);
          console.log(filterText);

          if (matchCase) {
            if (searchString.indexOf(filterText) === -1) continue;
          } else {
            if (searchString.toLowerCase().indexOf(filterText.toLowerCase()) === -1) continue;
          }

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
