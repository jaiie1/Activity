import React from 'react';
import  './App';
import { Container} from 'semantic-ui-react';
import ActivityDashBoard from '../feature/ActivityDashBoard';
import Navbar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../feature/home/HomePage';
import ActivityForm from '../feature/activites/form/ActivityForm';
import ActivityDetails from '../feature/activites/details/ActivityDetails';

function App () {
  return (
    <>     
      <Navbar/>
      <Container style={{marginTop: '7em'}}>        
      <Route exact path='/' component={HomePage} />
      <Route exact path='/activities' component={ActivityDashBoard} />
      <Route path='/activities/:id' component={ActivityDetails} />
      <Route path={['/createActivity' , 'manage/:id']} component={ActivityForm} />
      </Container>             
    </>
  );
 }


export default observer(App);
