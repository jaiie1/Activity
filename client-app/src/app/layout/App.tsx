import React, {useState } from 'react';
import  './App';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import ActivityDashBoard from '../feature/ActivityDashBoard';
import Navbar from './NavBar';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './loadingComponent';

function App () {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedtActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);


  useState(() => {
    agent.Activities.list().then(res => {      
      let activities: Activity[] = [];
      res.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
        });
        
        setActivities(res);
        setLoading(false);
      })
  },)

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

  if(loading) return <LoadingComponent content='Loading activities...'/>

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
