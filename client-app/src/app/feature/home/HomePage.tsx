import { ErrorMessage, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, Header, Image, Label, Menu, MenuItem, Message, Rail, Segment } from "semantic-ui-react";
import MyTextInput from "../../common/form/MyTextInput";
import { useStore } from "../../stores/store";
import ForgotPasswordForm from "../users/ForgotPasswordForm";
import LoginForm from "../users/LoginForm";
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
                        <Header as='h2' inverted content='Välkommen till Aktivitier i ditt område ' />
                        <Button onClick={() => modelStore.openModal(<LoginForm />)} size='huge' inverted>Logga in</Button>
                        <Button onClick={() => modelStore.openModal(<RegisterForm />)} size='huge' inverted>Registrera dig</Button>
                        <Message>
                            <Message.Header>Har du glömt lösenord?</Message.Header>
                            <p>
                                <Button onClick={() => modelStore.openModal(<ForgotPasswordForm />)} size='tiny' inverted>
                                    Återställ lösenord
                                </Button>
                            </p>
                        </Message>
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