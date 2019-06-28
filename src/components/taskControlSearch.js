import React, {Component} from 'react';
import {Col, Form, Button} from 'react-bootstrap';
import '../App.css';

class TaskControlSearch extends Component{
  render(){
    return (
      <Col sm={6}>
        <div className="input-group">
          <Form.Control type="text" id="exampleInputAmount" placeholder="Search"/>
          <span className="input-group-btn">
            <Button type="button" variant="primary">Tìm</Button>
          </span>
        </div>
      </Col>
    );
  };
}

export default TaskControlSearch;