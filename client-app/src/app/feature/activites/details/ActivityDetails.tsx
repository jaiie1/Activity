import React from "react";
import { Button, Card, Image, Statistic } from "semantic-ui-react";
import LoadingComponent from "../../../layout/loadingComponent";
import { useStore } from "../../../stores/store";



export default function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, openForm, cancelSelectedActivity} = activityStore;

    if(!activity) return <LoadingComponent/>;

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
                        <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit' />
                        <Button.Or />
                        <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel' />
                    </Button.Group>
                    <Statistic horizontal label='Views' value='2,224' widths='4' size='tiny' />
                </Card.Content>
            </Card>
        </Card.Group>
    )
}