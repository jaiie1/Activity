import { ErrorMessage, Formik } from 'formik';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Header, Icon, Label, Segment, Button } from 'semantic-ui-react';
import MyTextInput from '../../common/form/MyTextInput';
import useQuery from '../../common/util/hooks';
import { useStore } from '../../stores/store';



export default function ChangePassword() { 
    const { userStore } = useStore();
    const { changePasswordasync, changePassword } = userStore;
    const email = useQuery().get('email') as string;
    const token = useQuery().get('token') as string;
    

    
    return (
        <Segment>
        <Header as="h2" icon textAlign="center">
            <Icon name="key" circular />
            <Header.Content>Byta lösenord</Header.Content>
        </Header>
        <Formik initialValues={{ password: '', token: '', email: '', error: null }}
            onSubmit={(values, { setErrors }) => changePassword(token, values.password, email).catch(error =>
                setErrors({ error: error.response.data }))}>
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form onSubmit={handleSubmit}>      
                    <MyTextInput name='password' placeholder='Password' type='Password'  />
                    <ErrorMessage name='error' render={() =>
                        <Label style={{ marginBotton: 10 }} basic color='red' content={errors.error} />}
                    />
                    <Button.Group>
                        <Button disabled={!isValid || !dirty || isSubmitting}
                            loading={isSubmitting}
                            positive content='Submit' type='submit' fluid />
                        <Button.Or />
                        <Button as={NavLink} to='/' content='Back to login' color='blue' fluid />              
                    </Button.Group>
                </Form>
            )}
        </Formik>

    </Segment>
            
)}


