import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../stores/store";

export default observer(function ActivityFilters() {
    const {activityStore: {predicate, setPredicate}} = useStore();
    return (
        <>
            <Menu vertical size="large" style={{ width: '100%', marginTop: 28 }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All Activities' activite={predicate.has('all')} onClick={() => setPredicate('all', 'true')}  />
                <Menu.Item content="I'm going" activite={predicate.has('isGoing')} onClick={() => setPredicate('isGoing', 'true')} />
                <Menu.Item content="I'm hosting" activite={predicate.has('isHost')} onClick={() => setPredicate('isHost', 'true')} />
            </Menu>
            <Header />
             <Calendar onChange={(date: Date) => setPredicate('startDate', date as Date)} value={predicate.get('starteDate') || new Date} />
        </>
    )
})