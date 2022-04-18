import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { ConsoleLogger } from "@microsoft/signalr/dist/esm/Utils";
import { makeAutoObservable, runInAction } from "mobx";
import { ChatComment } from "../models/comment";
import { store } from "./store";

export default class CommentStore {
    comments: ChatComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
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