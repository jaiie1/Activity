import { observer } from 'mobx-react-lite';
import React from 'react';
import Calendar from 'react-calendar';
import { Dropdown, Header, Menu } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';
import { useStore } from '../../../stores/store';



export default observer(function ActivityFilters() {
    const { activityStore: { predicate, setPredicate } } = useStore();

    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item
                    content='All Activites'
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')}
                />
                <Menu.Item
                    content="I'm going"
                    active={predicate.has('isGoing')}
                    onClick={() => setPredicate('isGoing', 'true')}
                />
                <Menu.Item
                    content="I'm hosting"
                    active={predicate.has('isHost')}
                    on
                    Click={() => setPredicate('isHost', 'true')}
                />
                <Menu.Item>
                    <Dropdown pointing='top left' text='City'>
                        <Dropdown.Menu>
                            <Dropdown.Item content='Jönköping' active={predicate.has('City')} on
                                Click={() => setPredicate('City', 'true')} />
                            <Dropdown.Item content='Nässjö' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Menu>
            <Header />
            <Calendar
                onChange={(date: any) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()}
            />
        </>
    )
})