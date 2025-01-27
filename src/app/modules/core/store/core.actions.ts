import { createAction, props } from '@ngrx/store';
import { User } from '../../../models/user.model';
import { Token } from '../../../models/token.model';


export const createRequestToken = createAction(
    '[Core] Create Request Token'
);

export const createRequestTokenSuccess = createAction(
    '[Core] Create Request Token Success',
    props<{ token: Token }>()
);

export const createRequestTokenFailure = createAction(
    '[Core] Create Request Token Failure'
);

/// LOGIN
export const loginRequest = createAction(
    '[Core] Login Request'
);

export const loginSuccess = createAction(
    '[Core] Login Success',
    props<{ user: User }>()
);

export const loginFailure = createAction(
    '[Core] Login Failure'
);