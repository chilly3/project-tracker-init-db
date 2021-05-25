import React, { useState, useEffect } from 'react';
import axios from 'axios';
import async from 'async';
import { Switch, Route, Link } from 'react-router-dom';
import waka_data from '../../../config/data/wakatime_chilly3_may24.json';

const user_data = waka_data.user;

const Home = () => {
  return (
    <div className="content">
      <h3 className="content-title">Home</h3>
    </div>
  );
}

export default Home;