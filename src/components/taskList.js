import React, {Component} from 'react';
import {Table, Form} from 'react-bootstrap';
import '../App.css';
import TaskItem from './taskItem';

class TaskList extends Component{
  render(){
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
              <Form.Control type="text"></Form.Control>
            </td>
            <td>
              <Form.Control as="select">
                <option>Tất cả</option>
                <option>Kích hoạt</option>
                <option>Ẩn</option>
              </Form.Control>
            </td>
            <td></td>
          </tr>
          <TaskItem/>
        </tbody>
      </Table>
    );
  };
}

export default TaskList;