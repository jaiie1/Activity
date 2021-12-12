import React from "react";
import {Grid } from "semantic-ui-react";
import { Activity } from "../models/activity";
import ActivityList from "./activites/dashboard/ActivityList";
import ActivityDetails from "./activites/details/ActivityDetails";
import ActivityForm from "./activites/form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}


export default function ActivityDashBoard({ activities, selectedActivity,
    selectActivity, cancelSelectActivity, editMode, openForm, 
    closeForm, createOrEdit, 
    deleteActivity, 
    submitting }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} 
                selectActivity={selectActivity}
                deleteActivity={deleteActivity}
                submitting={submitting}
                />            
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                     activity={selectedActivity}
                     cancelSelectActivity={cancelSelectActivity} 
                     openForm={openForm}
                     />}
                {editMode &&
                <ActivityForm  closedForm={closeForm} 
                activity={selectedActivity} 
                createOrEdit={createOrEdit}
                submitting={submitting}/>}                
            </Grid.Column>
        </Grid>
    )
}