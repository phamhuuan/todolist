import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import './App.css';
import TaskForm from './components/taskForm';
import TaskControl from './components/taskControl';
import TaskList from './components/taskList';
// import _ from 'lodash';//lam nhu the nay se import ca thu vien rat nang
import {filter, findIndex} from 'lodash';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditting: null,
      filter: {
        name: '',
        status: -1,
        nameSearch: '',
      },
      sort: {
        by: 'name',
        value: 1,
      }
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

  onDisplayForm = () => {
    this.setState({
      isDisplayForm: this.state.taskEditting !== null ? true : !this.state.isDisplayForm,
      taskEditting: null,
    });
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  }

  onSubmit = (data) => {
    var {tasks} = this.state;
    data.status = data.status === 'true' || data.status === true ? true : false;
    if(data.id === ''){
      data.id = this.generateId();
      tasks.push(data);
    }
    else{
      // for(var index = 0; index < tasks.length; index++){//co the dung foreach
      //   if(tasks[index].id === data.id){
      //     tasks[index].status = data.status;
      //     tasks[index].name = data.name;
      //   }
      // }//co the dung cach tren hoac dung lodash
      var index = findIndex(tasks, (task) => {
        return task.id === data.id;
      });
      tasks[index].status = data.status;
      tasks[index].name = data.name;
    }
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.onCloseForm();
  }

  changeStatus = (data) => {
    var {tasks} = this.state;
    var index = findIndex(tasks, (task) => {//k import _ nua nen k dung _.findIndex
      return task.id === data.id;
    });
    tasks[index].status = data.status;
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  deleteTask = (data) => {
    var {tasks} = this.state;
    // var i = 0, newTasks = [];//cach1
    // for(var index = 0; index < tasks.length; index++){//co the dung foreach
    //   if(tasks[index].id === task.id){//cach1 === -> !==
    //     // newTasks[i++] = tasks[index];//cach1
    //     tasks.splice(index, 1);//cach2
    //   }
    // }
    // this.setState({
    //   // tasks: newTasks//cach1
    // });
    var index = findIndex(tasks, (task) => {
      return task.id === data.id;
    });
    tasks.splice(index, 1);
    this.onCloseForm();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  editTask = (task) => {
    this.onShowForm();
    this.setState({
      taskEditting: task
    });
  }

  onSearch = (nameSearch) => {
    this.setState({
      filter: {
        name: this.state.filter.name,
        status: this.state.filter.status,
        nameSearch: nameSearch.toLowerCase(),
      },
    },()=>{console.log(this.state.filter);});
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);//goi +filterStatus se tu doi string -> number
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
        nameSearch: this.state.filter.nameSearch,
      }
    },()=>{console.log(this.state.filter);});
  }

  onSort = (sortBy, sortValue) => {
    var tasks = this.state.tasks;
    console.log(sortBy, sortValue);
    if(sortBy === 'name'){
      tasks.sort((a, b) => {
        if(a.name > b.name) return sortValue;
        else if(a.name < b.name) return -sortValue;
        return 0;
      });
    }
    else if(sortBy === 'status'){
      tasks.sort((a, b) => {
        if(a.status > b.status) return -sortValue;
        else if(a.status < b.status) return sortValue;
        return 0;
      })
    }
    this.setState({
      tasks: tasks
    });
  }

  render(){
    var {tasks, isDisplayForm, taskEditting} = this.state;//var tasks = this.state.tasks;
    // console.log(filter);
    if(filter){
      if(filter.name){
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      // if(filter.nameSearch){
      //   tasks = tasks.filter((task) => {
      //     return task.name.toLowerCase().indexOf(filter.nameSearch) !== -1;
      //   });
      // }
      tasks = filter(tasks, (task) => {
        return task.name.toLowerCase().indexOf(filter.nameSearch) !== -1;
      });
      if(filter.status !== null || filter.status !== undefined){//neu if(filter.status) la dang kiem tra !== null !== undefined !== 0
        //o day luc nao filter.status cung co gia tri r nen khong can if o day nua
        tasks = tasks.filter((task) => {
          // return task.status === -1 ? task : task.status === filter.status;
          if(filter.status === -1) return task;
          else return task.status === (filter.status === 1 ? false : true);
        })
      }
    }
    var elementForm = isDisplayForm ? <TaskForm onSubmit={this.onSubmit} 
                                                onReceiveDisplayForm={this.onDisplayForm} 
                                                task={taskEditting}/> : '';
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
              <TaskControl onSearch={this.onSearch} onSort={this.onSort}/>
              <TaskList tasks={tasks} 
                        changeStatus={this.changeStatus} 
                        deleteTask={this.deleteTask} 
                        editTask={this.editTask} 
                        onFilter={this.onFilter}/>
            </Col>
          </Row>
        </div>
      </div>
    );
  };
}

export default App;