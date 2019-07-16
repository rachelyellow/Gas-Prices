import React, { Component } from 'react';
import like from './img/color-heart.png';
import outline from './img/heart-outline.png';

class Entry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      starred: false
    };
    this.toggleStar = this.toggleStar.bind(this);
    this.logData = this.logData.bind(this);
  }
    
  toggleStar() {
    if (!this.state.starred) {
      this.setState({ starred: true });
    } else {
      this.setState({ starred: false });
    }
  }

  logData() {
    console.log(this.props.data)
  }

  render () {
    return (
      <tr>
        <td><img src={this.state.starred ? like : outline} alt='' onClick={this.toggleStar}></img></td>
        <td onClick={this.logData}>{new Date(this.props.data.time).toString()}</td>
        <td onClick={this.logData}>{this.props.data.high_gas_price}</td>
        <td onClick={this.logData}>{this.props.data.medium_gas_price}</td>
        <td onClick={this.logData}>{this.props.data.low_gas_price}</td>
        <td onClick={this.logData}><a href={this.props.data.latest_url}>{this.props.data.hash}</a></td>
      </tr>
    );
  }
}


export default Entry;
