import React, { Component } from 'react';
import './BoardsLayout.css';
import Board from '../../components/Board/Board';
import Adder from '../../components/Adder/Adder'
import boards from '../../data/boards'
import markdownPatterns from '../../data/markdown'
import _ from 'lodash'

class BoardsLayout extends Component {
	state = { boards }

	handleAddBoard(newBoard) {
    newBoard.tasks = []
		this.setState({boards: [...this.state.boards, newBoard]})
	}

  handleAddTask(task, boardId) {
    let boards = _.cloneDeep(this.state.boards);

    markdownPatterns.forEach(pattern => {
      task.title = task.title.replace(pattern.regexp, pattern.subString);
    });

    boards.forEach(board => {
      if (board.id === boardId) {
        board.tasks.push(task);
      }
    })
    this.setState({boards});
  }

  handleTaskDragAndDrop(obj) {
    let boards = _.cloneDeep(this.state.boards);

    boards.forEach(board => {
      if (board.id === obj.boardFromId) {
        board.tasks = board.tasks.filter(task => task.id !== obj.task.id);
      }

      if (board.id === obj.boardToId) {
        board.tasks.push(obj.task);
      }
    })

    this.setState({boards})
  }

  handleBoardDragAndDrop(obj) {
    let boards = _.cloneDeep(this.state.boards);
    let predicate = id => board => board.id === id;
    this.changeElementsPosition(boards, predicate(obj.boardFromId), predicate(obj.boardToId));

    this.setState({ boards });
  }

  changeElementsPosition(array, callbackFrom, callbackTo) {
    let indexFrom = array.findIndex(callbackFrom);
    let indexTo = array.findIndex(callbackTo);

    [array[indexFrom], array[indexTo]] = [array[indexTo], array[indexFrom]];
  }

  render() {
  	const {boards} = this.state

    return (
      <div className="boards-layout">
      	{
      		boards.map(board => {
      			return <Board 
              key={board.id} 
              board={board} 
              handleAddTask={(task, boardId) => this.handleAddTask(task, boardId)}
              handleTaskDragAndDrop={(obj) => this.handleTaskDragAndDrop(obj)}
              handleBoardDragAndDrop={(obj) => this.handleBoardDragAndDrop(obj)}
            />
      		})
      	}
      	<Adder type="board" handleAdder={(newBoard) => this.handleAddBoard(newBoard)}/>
      </div>
    );
  }
}

export default BoardsLayout;
