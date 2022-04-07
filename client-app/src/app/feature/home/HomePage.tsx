import { ErrorMessage, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, Header, Image, Label, Message, Segment } from "semantic-ui-react";
import MyTextInput from "../../common/form/MyTextInput";
import { useStore } from "../../stores/store";
import RegisterForm from "../users/RegisterForm";

export default function HomePage() {
    const { userStore, modelStore } = useStore();

    return (

        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Aktiviteter
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Välkommen till Aktivitier' />
                        <Button as={Link} to='/activities' size='huge' inverted>Gå vidare</Button>
                    </>
                ) : (
                    <>
                        <Formik
                            initialValues={{ email: '', password: '', error: null }}
                            onSubmit={(values, { setErrors }) => userStore.login(values).catch(error =>
                                setErrors({ error: error.response.data }))}                        >
                            {({ handleSubmit, isSubmitting, errors }) => (
                                <Form size="large" onSubmit={handleSubmit} autoComplete='off'>
                                    <Header as='h2' content='Logga in till Aktiviteter' color='teal' textAlign='center' />
                                    <MyTextInput name='email' placeholder='Email' />
                                    <MyTextInput name='password' placeholder='Password' type='Password' />
                                    <ErrorMessage name='error' render={() =>
                                        <Label style={{ marginBotton: 10 }} basic color='red' content={errors.error} />}
                                    />
                                    <Button loding={isSubmitting} positive content='Login' type='login' fluid />

                                    <Message>
                                        Ny hos oss? <a onClick={() => modelStore.openModal(<RegisterForm />)}>Registrera dig</a>
                                    </Message>

                                </Form>
                            )}
                        </Formik>
                    </>
                )}
            </Container>
        </Segment>
    );
}


{/* <Button onClick={() => modelStore.openModal(<LoginForm />)}  size='huge' inverted>
                            Logga in
                        </Button>
                        <Button onClick={() => modelStore.openModal(<RegisterForm />)} size='huge' inverted>
                            Skapa konto
                        </Button> */}