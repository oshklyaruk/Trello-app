import React, { Component } from 'react';
import './Board.css';
import Adder from '../Adder/Adder'
import Task from '../../components/Task/Task'

import {Panel} from 'react-bootstrap';
import {DataTransferField, DragType} from '../../data/const';

class Board extends Component {

	handleBoardDragStart(e, boardId) {
		e.dataTransfer.setData(DataTransferField.TYPE, DragType.BOARD);
		e.dataTransfer.setData(DataTransferField.BOARD_ID, boardId);
	}

	handleDragOver(e) {
		e.preventDefault();
	}

	handleDrop(e, boardToId) {
		const type = e.dataTransfer.getData(DataTransferField.TYPE);
		const boardFromId = +e.dataTransfer.getData(DataTransferField.BOARD_ID);

		if (!type || boardFromId === boardToId) return

		const obj = {
			boardFromId,
			boardToId
		}

		if (type === DragType.TASK) {
			obj.task = JSON.parse(e.dataTransfer.getData(DataTransferField.TASK));
			this.props.handleTaskDragAndDrop(obj)
		} else if (type === DragType.BOARD) {
			this.props.handleBoardDragAndDrop(obj)
		}
	}

  render() {
  	const {board, board: {tasks}} = this.props;

    return (
      <div
      	className="board"
      	onDragOver={(e) => this.handleDragOver(e)}
			  onDrop={(e) => this.handleDrop(e, board.id)}
			>
        <Panel bsStyle="info">
			    <Panel.Heading>
			      <Panel.Title
			      	draggable 
			      	onDragStart={(e) => this.handleBoardDragStart(e, board.id)}
			      	componentClass="h3"
			      >
			      	{board.title}
			      </Panel.Title>
			    </Panel.Heading>
			    <Panel.Body>
			    	{
			    		tasks.map(task => <Task key={task.id} task={task} boardId={board.id}/>)
			    	}
			    	<Adder handleAdder={(task) => this.props.handleAddTask(task, this.props.board.id)} type="task"/>
			    </Panel.Body>
			  </Panel>
      </div>
    );
  }
}

export default Board;
