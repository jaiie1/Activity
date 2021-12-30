import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image, Statistic } from "semantic-ui-react";
import LoadingComponent from "../../../layout/loadingComponent";
import { useStore } from "../../../stores/store";



export default observer(function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) loadActivity(id);
    }, [id, loadActivity]);


    if(loadingInitial || !activity) return <LoadingComponent/>;

    return (
        <Card.Group>
            <Card color='blue' fluid>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
                <Card.Content>
                    <Card.Header>{activity.title}</Card.Header>
                    <Card.Meta>
                        <span>{activity.date}</span>
                    </Card.Meta>
                    <Card.Description>
                        {activity.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button as={Link} to={`/manage/${activity.id}`}  basic color='blue' content='Edit' />
                        <Button.Or />
                        <Button as={Link} to='/activities' basic color='grey' content='Cancel' />
                    </Button.Group>
                    <Statistic horizontal label='Views' value='2,224' widths='4' size='tiny' />
                </Card.Content>
            </Card>
        </Card.Group>
    )
})