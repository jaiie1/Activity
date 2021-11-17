import React, { useState } from 'react';
import  './App';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';

function App () {
  const [activities, setActivities] = useState([]);

  useState(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(res => {
        console.log(res);
        setActivities(res.data);
      })
  }, );
  return (
    <div>     
      <Header as='h2' icon='users' content='Activity' />

       <List>
          {activities.map((activity: any) => (
            <List.Item key={activity.id}>{activity.title}{activity.description}
            

            </List.Item>
          ))}
        </List>        
    </div>
  );
 }


export default App;
