import { observer } from "mobx-react-lite";
import React from "react";
import {Grid } from "semantic-ui-react";
import { useStore } from "../stores/store";
import ActivityList from "./activites/dashboard/ActivityList";
import ActivityDetails from "./activites/details/ActivityDetails";
import ActivityForm from "./activites/form/ActivityForm";



export default observer( function ActivityDashBoard() {

    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />            
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails/>}
                {editMode &&
                <ActivityForm
                />}                
            </Grid.Column>
        </Grid>
    )
})