import React, {Component} from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';

class TaskItem extends Component{
  showStatus(){
    // this.props.task.status = !this.props.task.status;
    return (
      <span className={this.props.task.status === true ? "label label-danger" : "label label-info"}
            onClick={this.changeStatus}>
        {this.props.task.status === true ? 'Kích hoạt' : 'Ẩn'}
      </span>
    );
  }

  changeStatus = () => {
    this.props.task.status = !this.props.task.status;
    this.props.changeStatus(this.props.task);
    // console.log(this.props.task);
  }

  render(){
    var {task, index} = this.props;
    return (
      <tr>
        <td>{index+1}</td>
        <td>{task.name}</td>
        <td className="text-center"> 
          {this.showStatus()}
        </td>
        <td className="text-center">
          <Button variant="warning">
            <span className="fa fa-pencil mr-5"/>Sửa
          </Button>&nbsp;
          <Button variant="danger">
            <span className="fa fa-trash mr-5"/>Xóa
          </Button>
        </td>
      </tr>
    );
  };
}

export default TaskItem;