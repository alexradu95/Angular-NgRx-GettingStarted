import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AppState from '../../state/app.state'
import { User } from "../user";
import * as UserActions from './user.actions';

export interface UserState {
    maskUsername : boolean;
}

export interface State extends AppState.State {
    user: UserState;
}

const initialState: UserState = {
    maskUsername : false
}

export const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUsername = createSelector(getUserFeatureState, state => state.maskUsername);

export const userReducer = createReducer(
    initialState,
    on(UserActions.toggleUsernameMask, state => {
        return {
            ...state,
            maskUsername: !state.maskUsername
        };
    })
);