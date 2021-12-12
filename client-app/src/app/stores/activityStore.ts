import { makeObservable, observable } from "mobx";

export default class ActivityStore {
    title = 'hello from mobx!!!';

    constructor() {
        makeObservable(this, {
            title: observable
        })
    }
}