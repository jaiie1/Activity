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
import { ToastContainer } from 'react-toastify';
import NotFound from '../feature/errors/NotFound';
import ServerError from '../feature/errors/ServerError';
import { useStore } from '../stores/store';
import LoadingComponent from './loadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../feature/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';
import RegisterSuccess from '../feature/users/RegisterSuccess';
import ConfirmEmail from '../feature/users/ConfirmEmail';
import ForgotPasswordForm from '../feature/users/ForgotPasswordForm';
import ForgotPasswordSuccess from '../feature/users/ForgotPasswordSuccess';
import ResetPassword from '../feature/users/ChangePassword';

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
              <PrivateRoute exact path='/activities' component={ActivityDashBoard} />
                <PrivateRoute path='/activities/:id' component={ActivityDetails} />
                <PrivateRoute key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                <PrivateRoute path='/profiles/:userName' component={ProfilePage} />
                {/* <PrivateRoute path='/errors' component={TestErrors} /> */}
                <Route path='/server-error' component={ServerError} />
                <Route path='/account/registerSuccess' component={RegisterSuccess} />
                <Route path='/account/verifyEmail' component={ConfirmEmail} />
                <Route path='/account/forgotPassword' component={ForgotPasswordForm} />
                <Route path='/account/forgotPasswordConfirmation' component={ForgotPasswordSuccess}/> 
                <Route path='/account/resetPassword' component={ResetPassword} />       
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
