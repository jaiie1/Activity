import React, { Fragment, useState } from 'react';
import  './App';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBoard from '../feature/ActivityDashBoard';

function App () {
  const [activities, setActivities] = useState<Activity[]>([]);

  useState(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(res => {
        console.log(res);
        setActivities(res.data);
      })
  }, );
  return (
    <>     
      <NavBar />
      <Container style={{marginTop: '7em'}}>
      <ActivityDashBoard activities={activities} />
      </Container>             
    </>
  );
 }


export default App;
