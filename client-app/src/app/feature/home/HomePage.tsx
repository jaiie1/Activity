import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../stores/store";
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
                        <Button onClick={() => modelStore.openModal(<LoginForm />)}  size='huge' inverted>
                            Login!
                        </Button>
                        <Button onClick={() => modelStore.openModal(<RegisterForm />)} size='huge' inverted>
                            Register
                        </Button>
                    </>

                )}
            </Container>
        </Segment>
    );
}
