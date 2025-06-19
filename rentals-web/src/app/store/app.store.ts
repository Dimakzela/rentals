import {Injectable} from "@angular/core";
import {StoreService} from "./store.service";
import {AppState, initialState} from "./app.state";

@Injectable({providedIn: "root"})
export class  AppStore extends StoreService<AppState>{
    constructor() {
        super(initialState);
    }
}