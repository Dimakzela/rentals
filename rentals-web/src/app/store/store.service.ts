import {computed, Signal, signal} from "@angular/core";

export class StoreService<T> {
    readonly state = signal({} as T);

    constructor(initialState: T) {
        this.state = signal(initialState);
    }

    public select<K extends keyof T>(key: K): Signal<T[K]> {
        return computed(() => this.state()[key]);
    }

    public set<K extends keyof T>(key: K, data: T[K]): void{
        this.state.update((current) => ({...current, [key]: data}));
    }

    public setState(partialState: Partial<T>): void{
        this.state.update((current) => ({...current, ...partialState}));
    }
}