import { observer } from "mobx-react-lite";
import React from "react";
import {Grid } from "semantic-ui-react";
import { Activity } from "../models/activity";
import { useStore } from "../stores/store";
import ActivityList from "./activites/dashboard/ActivityList";
import ActivityDetails from "./activites/details/ActivityDetails";
import ActivityForm from "./activites/form/ActivityForm";

interface Props {
    activities: Activity[];  
   
   
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}


export default observer( function ActivityDashBoard({ activities, createOrEdit, 
    deleteActivity, 
    submitting }: Props) {

    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}                 
                deleteActivity={deleteActivity}
                submitting={submitting}
                />            
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails/>}
                {editMode &&
                <ActivityForm               
                createOrEdit={createOrEdit}
                submitting={submitting}
                />}                
            </Grid.Column>
        </Grid>
    )
})