import React, { Component } from 'react';
import axios from 'axios';
import Navbar from "./components/Navbar";
import Map from "./components/map";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';


class App extends Component {
  state = {
    collision: [],
  }

  async componentDidMount() {
    const res = await axios.get('https://data.lacity.org/resource/d5tf-ez2w.json', {
      type: "GET",
      data: {
        "$limit": 5000,
        "$$app_token": "MVTjXyNouVR9NyyidfBCmvFqh"
      }
    })
    const collision = res.data;
    this.setState({collision: collision });
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <Map collision={this.state.collision}/>
      </Router>
      </div>
    );
  }
 }
 export default App;
