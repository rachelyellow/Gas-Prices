import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      gasPrices: [],
      currentPrices: {}
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
    }), 30000)
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
        {this.state.gasPrices.map((item, index) =>
          <p 
            key={index}
            onKeyDown={console.log(item)} >
            Time: {Date.parse(item.time)} ___ High: {item.high_gas_price} | Medium: {item.medium_gas_price} | Low: {item.low_gas_price} | Hash: <a href={item.latest_url}>{item.hash}</a>
          </p>)}
      </div>
    );
  }
}

export default App;
