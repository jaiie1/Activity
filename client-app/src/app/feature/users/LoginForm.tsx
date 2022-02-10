import { ErrorMessage, Form, Formik } from 'formik';
import react from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../common/form/MyTextInput';
import { useStore } from '../../stores/store';



export default function LoginForm() {
    const {userStore} = useStore();
    return (
        <Formik
        initialValues={{ email: '', password: '', error: null}}
        onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
            setErrors({error: 'Invalid email or password'}))}       
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Aktiviteter' color='teal' textAlign='center' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password'  type='Password'/>
                    <ErrorMessage name='error' render={() => 
                    <Label style={{marginBotton: 10}} basic color='red' content={errors.error}/>}
                    />
                    <Button loding={isSubmitting} positive content='Login' type='login' fluid />
                </Form>
            )}

        </Formik>
    )
            
}