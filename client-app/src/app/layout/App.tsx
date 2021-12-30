import React, {useEffect, useState } from 'react';
import  './App';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import ActivityDashBoard from '../feature/ActivityDashBoard';
import Navbar from './NavBar';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './loadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App () {
  const {activityStore} = useStore();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedtActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

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

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading activities...'/>

  return (
    <>     
      <Navbar/>
      <Container style={{marginTop: '7em'}}>        
      <ActivityDashBoard 
        activities={activityStore.activities}  
        createOrEdit={handelCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        submitting={submitting}
        />
      </Container>             
    </>
  );
 }


export default observer(App);
