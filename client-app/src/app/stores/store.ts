import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommentStore from "./CommentStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store{
    activityStore: ActivityStore;
    commonStore: CommonStore;
    modelStore: ModalStore;
    userStore: UserStore;    
    profileStore: ProfileStore;
    commentStore: CommentStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modelStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}