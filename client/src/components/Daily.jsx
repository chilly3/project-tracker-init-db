import React, { useState, useEffect } from 'react';
import axios from 'axios';
import async from 'async';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import DailyDetail from './views/DailyDetail.jsx';
import waka_data from '../../../config/data/wakatime_chilly3_may24.json';

const daily_data = waka_data.days;
const user_data = waka_data.user;

const Daily = ({ data }) => {

  const { url, path } = useRouteMatch();
  const [user, setUser] = useState('');
  const userid = data.users._id;

  useEffect(() => {
    axios.get(`/db/user/${userid}`)
    .then(({ data } = res) => {
      setUser(data)
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  const daily_breakdown = daily_data.map((day) => {
    const { date, grand_total, editors, languages, machines, operating_systems, projects } = day;
    
    const editor = editors.map((editor) => {
      const { name, digital, percent, text } = editor;
      
      return { 
        name: name,
        digital: digital,
        percent: percent,
        text: text
      }
    });
    const language = languages.map((language) => {
      const { name, digital, percent, text } = language;
      
      return { 
        name: name,
        digital: digital,
        percent: percent,
        text: text
      }
    });
    const machine = machines.map((machine) => {
      const { name, digital, percent, text } = machine;
      
      return { 
        name: name,
        digital: digital,
        percent: percent,
        text: text
      }
    });
    const operating_system = operating_systems.map((operating_system) => {
      const { name, digital, percent, text } = operating_system;
      
      return { 
        name: name,
        digital: digital,
        percent: percent,
        text: text
      }
    });
    const project = projects.map((project) => {
      const { name, grand_total } = project;

      const project_entities = project.entities;
      const project_languages = project.languages;
      
      const entity = project_entities.map((entity) => {
        const { name, digital, percent, text } = entity;
        
        return { 
          name: name,
          digital: digital,
          text: text,
          percent: percent
        }
      })
      const language = project_languages.map((language) => {
        const { name, digital, percent, text } = language;

        return { 
          name: name,
          digital: digital,
          text: text,
          percent: percent
        }
      })

      return { 
        name: name,
        digital: grand_total.digital,
        percent: grand_total.percent,
        text: grand_total.text,
        entities: entity,
        languages: language
      }
    });
    return {
      user: data,
      daily_id: date + data.user_id,
      date: date,
      grand_total: grand_total.digital,
      editors: editor,
      languages: language,
      machines: machine,
      operating_systems: operating_system,
      projects: project
    }
  });

  const sendDaily_info = () => {
    
    axios.post(`/db/daily/add`, {
      days: daily_breakdown
    })
    .then(res => {
      console.log(`${daily_breakdown.length} daily records added to database`)
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div className="content">
      <div>
        <div>
          <h3 className="content-title">Daily Breakdown</h3>
          <Route path={`${url}/:dailyId`}>
            <DailyDetail data={daily_breakdown} />
          </Route>
          <Route exact path={url}>
            <p>Select Day</p>
          </Route>
        </div>
        <p>{daily_breakdown.length} entries for {data.email}</p>
        <button className="send-daily-info" onClick={sendDaily_info}>Submit Daily Records</button>

      </div>
    </div>
  );
}

export default Daily;