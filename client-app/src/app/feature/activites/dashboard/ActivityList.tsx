import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import ActivityListItem from "./ActivitylistItem";


export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { groupActivitiesByDate } = activityStore;

    return (
        <>
            {groupActivitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})