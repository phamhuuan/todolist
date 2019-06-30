import React, {Component} from 'react';
import {Table, Form} from 'react-bootstrap';
import '../App.css';
import TaskItem from './taskItem';

class TaskList extends Component{
  constructor(props){
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1
    }
  }

  changeStatus = (task) => {
    this.props.changeStatus(task);
  }

  deleteTask = (task) => {
    this.props.deleteTask(task);
  }

  editTask = (task) => {
    this.props.editTask(task);
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value,
    });
  }
  render(){
    var {tasks} = this.props;//var tasks = this.props.task;
    var {filterName, filterStatus} = this.state;
    var elementTask = tasks.map((task, index) => {
      return <TaskItem  key={task.id} 
                        index={index} 
                        task={task} 
                        changeStatus={this.changeStatus} 
                        deleteTask={this.deleteTask}
                        editTask={this.editTask}/>
    });
    return (
      <Table className="mt-10" striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng thái</th>
            <th className="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <Form.Control type="text" name="filterName" value={filterName} onChange={this.onChange}></Form.Control>
            </td>
            <td>
              <Form.Control as="select" name="filterStatus" value={filterStatus} onChange={this.onChange}>
                <option value={-1}>Tất cả</option>
                <option value={0} >Kích hoạt</option>
                <option value={1} >Ẩn</option>
              </Form.Control>
            </td>
            <td></td>
          </tr>
          {elementTask}
        </tbody>
      </Table>
    );
  };
}

export default TaskList;