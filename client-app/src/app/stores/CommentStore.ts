import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { ChatComment } from "../models/comment";
import { Profile } from "../models/profile";
import { store } from "./store";

export default class CommentStore {
    comments: ChatComment[] = [];
    hubConnection: HubConnection | null = null;
    profile: Profile | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isCurrentUser() {     
        console.log("isCurrentUser: " + this.profile?.username);  
        if (store.userStore.user && this.profile) {           
            return store.userStore.user.username === this.profile.username;
        }
        return false;
    }

    createHubConnection = (activityId: string) => {
        if (store.activityStore.selectedActivity) {         
            this.hubConnection = new HubConnectionBuilder()
                .withUrl('http://localhost:5000/chat?activityId=' + activityId, {                    
                    accessTokenFactory: () => store.userStore.user?.token!                   
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();            
           
            console.log("activitycommment store:  " + activityId);       
            this.hubConnection.start().catch(error => console.log('Error establishing the connection: ', error));

            this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
                runInAction(() => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + 'Z');
                    })
                    this.comments = comments
                });
            })

            this.hubConnection.on('ReceiveComment', (comment: ChatComment) => {
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt);
                    this.comments.unshift(comment)
                });
            })
            
            this.hubConnection.on('RemoveComment', (comment: ChatComment) => {
                runInAction(() => {
                    this.comments = this.comments.filter(c => c.id !== comment.id)                                    
                    this.comments.unshift(comment)

                });
            })   

            this.hubConnection.on('DeleteComment', (comment: ChatComment) => {
                runInAction(() => {
                    this.comments = this.comments.filter(c => c.id !== comment.id)                                    
                    this.comments.unshift(comment)

                });  
            }) 
       }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }

   

    addComment = async (values: any) => {
        values.activityId = store.activityStore.selectedActivity?.id;
        try {
            await this.hubConnection?.invoke('SendComment', values);
        } catch (error) {
            console.log(error);
        }
    }


    deleteComment = async (commentId: number) => {
        console.log(commentId);
        try {
            await this.hubConnection?.invoke('DeleteComment', commentId);
            
        } catch (error) {
            console.log(error);
        }
    }

    deleteCommentFromStore = (commentId: number) => {
        this.comments = this.comments.filter(c => c.id !== commentId);
    }

    deleteCommentFromServer = async (commentId: number) => {
        try {
            await this.hubConnection?.invoke('DeleteComment', commentId);
        } catch (error) {
            console.log(error);
        }
    }
}