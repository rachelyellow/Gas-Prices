import React, { Component } from 'react';
import Entry from './Entry.js';
import like from './img/color-heart.png';
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

  deleteEntry() {
    console.log('delete entry');
  }

  render () {
    return (
      <div className="App">
        <h1>
          <button onClick={this.refreshData} >Get Latest Prices</button>
        </h1>
        <table>
          <tbody>
            <tr>
              <th><img src={like} alt=''></img></th>
              <th>Time</th>
              <th>High</th> 
              <th>Medium</th> 
              <th>Low</th>
              <th>Hash</th>
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
