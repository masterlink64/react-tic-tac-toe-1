import React, { Component } from 'react';
import './style.css';

class Square extends Component {
  render() {
    return (
      <div className="square" onClick={this.props.handleClick}>
        {this.props.val}
      </div>
    );
  }
}

export default Square;
