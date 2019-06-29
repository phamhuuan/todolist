import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import './App.css';
import TaskForm from './components/taskForm';
import TaskControl from './components/taskControl';
import TaskList from './components/taskList';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
    };
  }

  componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks,
      });
    }
  }

  generateId(){
    var randomString = require('random-string');
    return randomString({length: 20})+'-'+randomString({length: 20})+'-'+randomString({length: 20})+'-'+randomString({length: 20});
  }

  onDisplayForm = (event) => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
    });
  }

  onSubmit = (data) => {
    var {tasks} = this.state;
    data.id = this.generateId();
    data.status = data.status === 'true' || data.status === true ? true : false;
    tasks.push(data);
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.onDisplayForm();
  }

  changeStatus = (task) => {
    var {tasks} = this.state;
    for(var index = 0; index < tasks.length; index++){
      if(tasks[index].id === task.id){
        tasks[index].status = task.status;
      }
    }
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(task);
  }

  render(){
    var {tasks, isDisplayForm} = this.state;//var tasks = this.state.tasks;
    var elementForm = isDisplayForm ? <TaskForm onSubmit={this.onSubmit} onReceiveDisplayForm={this.onDisplayForm}/> : '';
    return (
      <div>
        <div className="container">
          <div className="text-center">
            <h1>Quản lý công việc</h1>
            <hr/>
          </div>
          <Row>
            <Col sm={isDisplayForm === true ? 4 : 0}>
              {elementForm}
            </Col>
            <Col sm={isDisplayForm === true ? 8 : 12}>
              <Button type="submit" variant="primary" onClick={this.onDisplayForm}>
                <span className="fa fa-plus mr-5"></span>Thêm công việc
              </Button>
              <br/>
              <TaskControl/>
              <TaskList tasks={tasks} changeStatus={this.changeStatus}/>
            </Col>
          </Row>
        </div>
      </div>
    );
  };
}

export default App;
