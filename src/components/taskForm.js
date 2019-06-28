import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import '../App.css';

class TaskForm extends Component{
  render(){
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            Thêm công việc
            <span className="fa fa-times-circle text-right"></span>
          </h3>
        </div>
        <div className="panel-body">
          <Form>
            <Form.Group controlId="jobName">
              <Form.Label>Tên</Form.Label>
              <Form.Control type="email" placeholder="Nhập tên công việc" />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Control as="select">
                <option>Kích hoạt</option>
                <option>Ẩn</option>
              </Form.Control>
              <br/>
              <div className="text-center">
                <Button type="submit" variant="warning">
                  <span className="fa fa-plus mr-5"></span>
                  Thêm
                </Button>&nbsp;
                <Button type="submit" variant="danger">
                  <span className="fa fa-close mr-5"></span>
                  Hủy bỏ
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  };
}

export default TaskForm;
