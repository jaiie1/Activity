import React, {useState } from 'react';
import  './App';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';

import ActivityDashBoard from '../feature/ActivityDashBoard';
import Navbar from './NavBar';
import {v4 as uuid} from 'uuid';

function App () {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedtActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);


  useState(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(res => {      
        setActivities(res.data);
      })
  }, )

  function handelSelectActivity(id: string) {
    setSelectedtActivity(activities.find(x => x.id === id));
  }
  
  function handelCancelActivity() {
    setSelectedtActivity(undefined);
  }

  function handelFormOpen(id?: string){
    id? handelSelectActivity(id): handelCancelActivity();
    setEditMode(true);    
  }

  function handelFormClose() {
    setEditMode(false);
  }

  function handelCreateOrEditActivity(activity: Activity){
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) 
    : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedtActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities(activities.filter(x => x.id !== id));
  }

  return (
    <>     
      <Navbar openForm={handelFormOpen} />
      <Container style={{marginTop: '7em'}}>
      <ActivityDashBoard 
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={handelSelectActivity}
        cancelSelectActivity={handelCancelActivity}
        editMode={editMode}
        openForm={handelFormOpen}
        closeForm={handelFormClose}
        createOrEdit={handelCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        />
      </Container>             
    </>
  );
 }


export default App;
