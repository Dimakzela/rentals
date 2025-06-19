
export interface AppState {
    userId: string| null;
    displayName: string | undefined | null;
    isLogged: boolean;
}

export const initialState: AppState = {
    userId: null,
    displayName: null,
    isLogged: false,
}