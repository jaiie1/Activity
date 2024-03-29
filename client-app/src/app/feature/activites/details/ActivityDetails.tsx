import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Grid} from "semantic-ui-react";
import LoadingComponent from "../../../layout/loadingComponent";
import { useStore } from "../../../stores/store";
import ActivityDetaieldSidebar from "./ActivityDetailedSidebar";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";




export default observer(function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity} = activityStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadActivity(id);
        console.log("id: " + id);
        if(id === ""){
            console.log("activityId is null");
        }
        return () => clearSelectedActivity();
    }, [id, loadActivity, clearSelectedActivity]);    

    if (loadingInitial || !activity) return <LoadingComponent />;   

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat activityId={activity.id} />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetaieldSidebar activity={activity} />
            </Grid.Column>
        </Grid>
    )
})