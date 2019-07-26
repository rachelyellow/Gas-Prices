import React, { Component } from 'react';
import Entry from './Entry.js';
import './App.css';
import axios from 'axios';


class App extends Component {

  // TO DO:
  // alert popup only when clicked
  // add functionality to sort by most recent
  // sticky table header
  // make favourites stay on refresh
  // highlight most recent
  // add charts(?)

  constructor() {
    super();
    this.state = {
      gasPrices: []
    };
    this.refreshData = this.refreshData.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.fetchFromLocalStorage = this.fetchFromLocalStorage.bind(this);
  }

  componentDidMount() {
    if (window.localStorage.getItem('gasPrices')) {
      this.fetchFromLocalStorage();
    } else {
      this.refreshData();
    }
    setInterval(() => this.refreshData(), 60000);
  }

  refreshData() {
    axios.get('https://cors-anywhere.herokuapp.com/https://api.blockcypher.com/v1/eth/main')
    .then(response => {
      if (!this.state.gasPrices[0] === null && this.state.gasPrices[this.state.gasPrices.length - 1].hash === response.data.hash) {
        alert('Prices already up to date!');
      } else if (this.state.gasPrices[0] === null) {
        this.setState({ gasPrices: [response.data] }, this.addToLocalStorage(this.state.gasPrices))
      } else {
        this.setState({ gasPrices: this.state.gasPrices.concat(response.data) }, this.addToLocalStorage(this.state.gasPrices));
      }
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  addToLocalStorage(gasPrices) {
    window.localStorage.setItem('gasPrices', JSON.stringify(gasPrices));
  }

  fetchFromLocalStorage() {
    this.setState({ gasPrices: JSON.parse(window.localStorage.getItem('gasPrices')) })
  }

  deleteEntry(entry) {
    const filtered = this.state.gasPrices.filter(price => price !== entry);
    this.setState({ gasPrices: filtered }, this.addToLocalStorage(filtered));
  }

  render() {
    return (
      <div className="App">
        <div id='banner'>
          <h1>Gas Checker</h1>
          <button onClick={this.refreshData} >Get Latest Prices</button>
        </div>
        <table>
          <tbody>
            <tr id='table-header'>
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
