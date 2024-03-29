import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import MyTextInput from '../../common/form/MyTextInput';
import { useStore } from '../../stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';


export default function RegisterForm() {
    const { modelStore, userStore } = useStore();
    return (
        <Formik
            initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch(error =>
                setErrors({ error }))}

            validationSchema={Yup.object({
                displayName: Yup.string()
                    .required('Required'),
                username: Yup.string()
                    .required('Required'),
                email: Yup.string()
                    .email('Invalid email')
                    .required('Required'),
                password: Yup.string()
                    .required('No password provided.')

            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='SignUp to Aktiviteter' color='teal' textAlign='center' />
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextInput name='username' placeholder='Username' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage
                        name='error' render={() => 
                            <ValidationErrors errors={errors.error} />}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting}
                        loding={isSubmitting}
                        positive content='Register' type='submit' fluid />
                    <Button onClick={() => modelStore.closeModel()} content='Bakåt' color='blue' fluid />

                </Form>
            )}

        </Formik>
    )

}
