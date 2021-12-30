import React, {useEffect} from 'react';
import  './App';
import { Container} from 'semantic-ui-react';
import ActivityDashBoard from '../feature/ActivityDashBoard';
import Navbar from './NavBar';
import LoadingComponent from './loadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App () {
  const {activityStore} = useStore(); 


  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); 
   
  if(activityStore.loadingInitial) return <LoadingComponent content='Loading activities...'/>

  return (
    <>     
      <Navbar/>
      <Container style={{marginTop: '7em'}}>        
      <ActivityDashBoard/>
      </Container>             
    </>
  );
 }


export default observer(App);
