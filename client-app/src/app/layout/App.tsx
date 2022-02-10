import React, { useEffect } from 'react';
import './App';
import { Container } from 'semantic-ui-react';
import ActivityDashBoard from '../feature/activites/dashboard/ActivityDashBoard';
import Navbar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../feature/home/HomePage';
import ActivityForm from '../feature/activites/form/ActivityForm';
import ActivityDetails from '../feature/activites/details/ActivityDetails';
import TestError from '../feature/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../feature/errors/NotFound';
import ServerError from '../feature/errors/ServerError';
import LoginForm from '../feature/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './loadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(() =>  commonStore.setAppLoaded());
    }else{
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])


  if(!commonStore.appLoaded) return <LoadingComponent content='loading....' />

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar />
    <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Navbar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
              <Route exact path='/activities' component={ActivityDashBoard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} 
              component={ActivityForm} />
              <Route path='/error' component={TestError} />
              <Route path='/server-error' component={ServerError} />
              <Route path='/login' component={LoginForm} />
              <Route component={NotFound} />
              </Switch>
              
            </Container>
          </>
        )}
      />
    </>
  );
}


export default observer(App);
