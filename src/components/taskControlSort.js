import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import '../App.css';

class TaskControlSort extends Component{
  render(){
    return (
      <Col sm={6}>
        <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle" 
                  type="button" 
                  id="triggerId" 
                  data-toggle="dropdown" 
                  aria-haspopup="true"
                  aria-expanded="true">
            Sắp xếp
            <span className="fa fa-caret-square-o-down ml-5"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="triggerId">
            <li>
              {/* eslint-disable-next-line */}
              <a role="button" className="sort-selected">
                <span className="fa fa-sort-alpha-asc pr-5">
                  Tên A-Z
                </span>
              </a>
            </li>
            <li>
              {/* eslint-disable-next-line */}
              <a role="button" className="sort-selected">
                <span className="fa fa-sort-alpha-asc pr-5">
                  Tên Z-A
                </span>
              </a>
            </li>
            <li role="separator" className="divider"></li>
            <li>
              {/* eslint-disable-next-line */}
              <a role="button">
                Trạng thái kích hoạt
              </a>
            </li>
            <li>
              {/* eslint-disable-next-line */}
              <a role="button">
                Trạng thái ẩn
              </a>
            </li>
          </ul>
        </div>
      </Col>
    );
  };
}

export default TaskControlSort;