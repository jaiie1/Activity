import React from 'react';
import './App';
import { Container } from 'semantic-ui-react';
import ActivityDashBoard from '../feature/activites/dashboard/ActivityDashBoard';
import Navbar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../feature/home/HomePage';
import ActivityForm from '../feature/activites/form/ActivityForm';
import ActivityDetails from '../feature/activites/details/ActivityDetails';

function App() {
  const location = useLocation();
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Navbar />
            <Container style={{ marginTop: '7em' }}>

              <Route exact path='/activities' component={ActivityDashBoard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}


export default observer(App);
