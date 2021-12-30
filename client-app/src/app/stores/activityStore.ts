import { makeAutoObservable} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;


    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.setLoadingInital(true)
        try {
            const activities = await agent.Activities.list();

            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);
            })
            this.setLoadingInital(false)


        } catch (error) {
            console.log(error);
            this.setLoadingInital(false)
        }

    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);        
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    setEditMode = (editMode: boolean) => {
        this.editMode = editMode;
    }

    setLoadingInital = (state: boolean) => {
        this.loadingInitial = state;
    }

    openForm = (id? : string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.setEditMode(true);
    }

    closeForm = () => {
        this.setEditMode(false);
    }



    
}


