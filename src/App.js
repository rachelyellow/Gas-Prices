import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      gasPrices: []
    };
    this.refreshData = this.refreshData.bind(this);
  }

  componentDidMount() {
    setInterval(() =>     axios.get('https://api.blockcypher.com/v1/eth/main')
    .then(response => {
      this.setState({
        gasPrices: this.sortValues(this.state.gasPrices.concat(response.data))
      })
    })
    .catch(function(error) {
      console.log(error)
    }), 45000)
  }

  sortValues(arr) {
    return arr.sort((a, b) => b.time - a.time)
  }

  refreshData() {
    axios.get('https://api.blockcypher.com/v1/eth/main')
    .then(response => {
      this.setState({
        gasPrices: this.state.gasPrices.concat(response.data)
      })
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  render () {
    return (
      <div className="App">
        <p>
          <button onClick={this.refreshData} >Get Latest Prices</button>
        </p>
        <table>
          <tbody>
            <tr>
              <th>Time</th>
              <th>High</th> 
              <th>Medium</th> 
              <th>Low</th>
              <th>Hash</th>
            </tr>
          {this.state.gasPrices.map((item, index) =>
            <tr 
              key={index}
              onClick={console.log(item.time.toUTCString())} >
                <td>{item.time}</td>
                <td>{item.high_gas_price}</td>
                <td>{item.medium_gas_price}</td>
                <td>{item.low_gas_price}</td>
                <td><a href={item.latest_url}>{item.hash}</a></td>
            </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}


export default App;
