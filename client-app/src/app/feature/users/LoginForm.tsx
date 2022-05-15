import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import { Button, Header, Label} from 'semantic-ui-react';
import MyTextInput from '../../common/form/MyTextInput';
import { useStore } from '../../stores/store';
import RegisterForm from "../users/RegisterForm";
import ForgotPasswordForm from './ForgotPasswordForm';

export default function LoginForm() {
    const { modelStore, userStore } = useStore();
    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.login(values).catch(error =>
                setErrors({ error: error.response.data}))}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Aktiviteter' color='teal' textAlign='center' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='Password' />
                    <ErrorMessage name='error' render={() =>
                        <Label style={{ marginBotton: 10 }} basic color='red' content={errors.error} />}
                    />
                    <Button loading={isSubmitting} positive content='Login' type='login' fluid />
                    <Header as='h3' content='Saknar du konto?' color='teal' textAlign='center' />
                    <Button.Group>
                        <Button onClick={() => modelStore.openModal(<RegisterForm />)}
                            content='Register' type='register' fluid positive />
                        <Button.Or />
                        <Button onClick={() => modelStore.closeModel()} content='Bakåt'  color='blue' fluid />
                       
                    </Button.Group>                                    
                    <Button onClick={() => modelStore.openModal(<ForgotPasswordForm />)} content='Återställ lösenord' type='forgotpassword' fluid />
                </Form>
                
            )}

        </Formik>
    )

}
