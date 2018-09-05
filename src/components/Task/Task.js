import React, { Component } from 'react';
import './Task.css';

import {DataTransferField, DragType} from '../../data/const';

class Task extends Component {

	handleTaskDragStart(e, task, boardId) {
		e.dataTransfer.setData(DataTransferField.TYPE, DragType.TASK);
		e.dataTransfer.setData(DataTransferField.TASK, JSON.stringify(task));
		e.dataTransfer.setData(DataTransferField.BOARD_ID, boardId);
	}

  render() {
  	const {task, boardId} = this.props;

    return (
      <div
      	className="task"
      	draggable
      	onDragStart={(e) => this.handleTaskDragStart(e, task, boardId)}
      	dangerouslySetInnerHTML={{__html: task.title}}
      />
    );
  }
}

export default Task;
