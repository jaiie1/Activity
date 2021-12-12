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
  const [submitting, setSubmitting] = useState(false);


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
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedtActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedtActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } 
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);      
      setSubmitting(false);
    })
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
        submitting={submitting}
        />
      </Container>             
    </>
  );
 }


export default App;
