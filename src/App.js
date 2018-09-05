import React, { Component } from 'react';
import './App.css';
import BoardsLayout from './containers/BoardsLayout/BoardsLayout'
import {PageHeader} from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <div className="app">
        <PageHeader>Trello</PageHeader>
        <BoardsLayout />
      </div>
    );
  }
}

export default App;
