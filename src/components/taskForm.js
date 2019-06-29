import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import '../App.css';

class TaskForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      status: true,
    };
  }

  isDisplayForm = () => {
    this.props.onReceiveDisplayForm();
  }

  onHandleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  }

  onClear = () => {
    this.setState({
      name: '',
      status: true,
    });
  }

  generateId(){
    var randomString = require('random-string');
    return randomString({length: 20})+'-'+randomString({length: 20})+'-'+randomString({length: 20})+'-'+randomString({length: 20});
  }
  render(){
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            Thêm công việc
            <span className="fa fa-times-circle text-right" onClick={this.isDisplayForm}></span>
          </h3>
        </div>
        <div className="panel-body">
          <Form onSubmit={this.onHandleSubmit}>
            <Form.Group controlId="jobName">
              <Form.Label>Tên</Form.Label>
              <Form.Control type="text" 
                            placeholder="Nhập tên công việc"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}/>
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Control as="select"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}>
                <option value={true}>Kích hoạt</option>
                <option value={false}>Ẩn</option>
              </Form.Control>
              <br/>
              <div className="text-center">
                <Button type="submit" variant="warning">
                  <span className="fa fa-plus mr-5"></span>
                  Thêm
                </Button>&nbsp;
                <Button type="button" variant="danger" onClick={this.onClear}>
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
