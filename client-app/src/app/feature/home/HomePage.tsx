import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage() {
    return (
           
       <Segment inverted textAlign='center' vertical className='masthead'>
        <Container text>
            <Header as='h1' inverted>
                <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                Aktiviteter
            </Header>
                <Header as='h2' inverted content='Välkommen till Aktivitier' />
                <Button as={Link} to='/activities' size='huge' inverted>
                    Ta mig till Aktiviteter
                </Button>

        </Container>
       </Segment>
    );
}
