import React, { Component } from 'react';
import Entry from './Entry.js';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      gasPrices: []
    };
    this.refreshData = this.refreshData.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  componentDidMount() {
    this.refreshData();
    setInterval(() => this.refreshData(), 60000)
  }

  refreshData() {
    axios.get('https://api.blockcypher.com/v1/eth/main')
    .then(response => {
        this.setState({ gasPrices: this.state.gasPrices.concat(response.data) }, () => console.log(this.state))
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  deleteEntry(entry) {
    const filtered = this.state.gasPrices.filter(price => price !== entry);
    this.setState({ gasPrices: filtered });
  }

  render () {
    return (
      <div className="App">
        <h6>
          <button onClick={this.refreshData} >Get Latest Prices</button>
        </h6>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Time</th>
              <th>High</th> 
              <th>Medium</th> 
              <th>Low</th>
              <th>Hash</th>
              <th></th>
            </tr>
          {this.state.gasPrices.map((item, index) =>
            <Entry 
              key={index}
              data={item}
              deleteEntry={this.deleteEntry}
              />)}
          </tbody>
        </table>
      </div>
    );
  }
}


export default App;
