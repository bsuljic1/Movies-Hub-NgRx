import { createReducer, Action, on } from '@ngrx/store';
import { ICoreState, initialCoreState } from './core.state';
import { createRequestTokenSuccess, loginFailure, loginRequest, loginSuccess, setIsLoading } from './core.actions';

const reducer = createReducer(
    initialCoreState,
    on(createRequestTokenSuccess,
        (state, { token }) => ({
            ...state,
            token
        })
    ),
    on(loginSuccess,
        (state, { user }) => ({
            ...state,
            user,
            isLoggedIn: true
        })
    ),
    on(loginRequest,
        state => ({
            ...state,
            isLoggedIn: false
        })
    ),
    on(loginFailure,
        state => ({
            ...state,
            isLoggedIn: false
        })
    ),
    on(setIsLoading,
        (state, { isLoading }) => ({
            ...state,
            isLoading
        })
    )
);

export function coreReducer(state: ICoreState, action: Action): ICoreState {
    return reducer(state, action);
}
