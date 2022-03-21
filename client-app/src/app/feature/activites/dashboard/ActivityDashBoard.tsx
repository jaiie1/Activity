import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import LoadingComponent from "../../../layout/loadingComponent";
import { useStore } from "../../../stores/store";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";
import { PagingParams } from "../../../models/pagination";
import InfiniteScroll from 'react-infinite-scroller';


export default observer(function ActivityDashBoard() {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore;
    const [LoadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => setLoadingNext(false));        
    }

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [loadActivities, activityRegistry]);      
   

    if (activityStore.loadingInitial && !LoadingNext ) return <LoadingComponent content='Loading activities...' />


    return (
        <Grid>
            <Grid.Column width='10'>
                <InfiniteScroll
                pageStart={0}
                loadMore={handleGetNext}
                hasMore={!LoadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                initialLoad={false}
                >
                      <ActivityList />
                </InfiniteScroll>
                            
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />              
            </Grid.Column>
            <Grid.Column width='10'>
                <Loader activity={LoadingNext} />
            </Grid.Column>

        </Grid>
    )
})
