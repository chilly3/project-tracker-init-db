import React, { useState, useEffect } from 'react';
import axios from 'axios';
import async from 'async';
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import waka_data from '../../../config/data/wakatime_chilly3_may24.json';

const user_data = waka_data.user;

const User = () => {
  const { id, created_at, email, last_heartbeat_at, last_plugin_name, last_project, photo } = user_data;
  let begin = DateTime.fromISO(created_at).toFormat('DD');
  let end = DateTime.fromISO(last_heartbeat_at).toFormat('DD');

  const history = useHistory();


  const sendUser_info = () => {
    
    axios.post(`/db/user/add`, {
      users: [{
        user_id: id,
        email: email,
        start_date: created_at,
        total_time: '',
        last_heartbeat_at: last_heartbeat_at,
        last_editor_used: last_plugin_name,
        last_project: last_project,
        photo: photo
      }]
    })
    .then(res => {
      console.log(`User added to database`)
      history.go(0)
    })
    .catch(err => {
      console.log(err);
    });
  }

  const user_info = (
    <div>
      <table className="table-user">
        <tbody className="tbody-user">
          <tr className="tr-user">
            <th className="th-user">Id: </th>
            <td className="td-user">{id}</td>
          </tr>
          <tr className="tr-user">
            <th className="th-user">Email: </th>
            <td className="td-user">{email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
  const isohb = user_data.last_heartbeat_at;
  const timeFormatted = DateTime.fromISO(isohb).toISODate();
  console.log(user_data.last_heartbeat_at);

  return (
    <div className="content">
      <h3 className="content-title">User Information wakatime data dump JSON:</h3>
        <p className="user-range">{begin} <i className="alert-muted em">through</i> {end}</p>
      <img className="user-photo" src={photo} alt="user-photo" />
      {user_info}
      <hr></hr>
      <button className="send-user-info" onClick={sendUser_info}>Submit User Collection</button>
    </div>
  );
}

export default User;