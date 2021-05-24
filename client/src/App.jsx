import React, { useState, useEffect } from 'react';
import axios from 'axios';
import async from 'async';
import { Switch, Route, Link } from 'react-router-dom';
import waka_data from '../../config/data/wakatime_chilly3_may24.json';
import Home from './components/Home.jsx';
import User from './components/User.jsx';
import Daily from './components/Daily.jsx';


const user_data = waka_data.user;
const daily_data = waka_data.day;

const App = () => {

  return (
    <div>
      <h1 className="title">Project Tracker: Initialize Database</h1>
      <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li className="appnav">
              <Link to="/" className="app-link">Home</Link>
            </li>
            <li className="appnav">
              <Link to="/user" className="app-link">User Information</Link>
            </li>
            <li className="appnav">
              <Link to="/daily" className="app-link">Daily Breakdown</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/user"><User /></Route>
          <Route path="/daily"><Daily /></Route>
          <Route path="/:id">
            <p>This text will render for any route other than those defined above</p>
          </Route>
        </Switch>
    </div>
  )
}

export default App;