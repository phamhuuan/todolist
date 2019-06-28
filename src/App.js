import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import './App.css';
import TaskForm from './components/taskForm';
import TaskControl from './components/taskControl';
import TaskList from './components/taskList';

class App extends Component{
  render(){
    return (
      <div>
        <div className="container">
          <div className="text-center">
            <h1>Quản lý công việc</h1>
            <hr/>
          </div>
          <Row>
            <Col sm={4}>
              <TaskForm/>
            </Col>
            <Col sm={8}>
              <Button type="submit" variant="primary">
                <span className="fa fa-plus mr-5"></span>Thêm công việc
              </Button>
              <br/>
              <TaskControl/>
              <TaskList/>
            </Col>
          </Row>
        </div>
      </div>
    );
  };
}

export default App;
