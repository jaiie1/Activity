import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../layout/loadingComponent";
import { useStore } from "../stores/store";
import ActivityList from "./activites/dashboard/ActivityList";
import ActivityForm from "./activites/form/ActivityForm";



export default observer(function ActivityDashBoard() {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore;

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [activityStore]);

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />


    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Filter</h2>
                <ActivityForm
                />
            </Grid.Column>
        </Grid>
    )
})