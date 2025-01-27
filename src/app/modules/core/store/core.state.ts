import { Token } from "../../../models/token.model";
import { User } from "../../../models/user.model";

export interface ICoreState {
    isLoggedIn: boolean;
    currentUser: User;
    token: Token;
}

export const initialCoreState: ICoreState = {
    isLoggedIn: false,
    currentUser: null,
    token: null
};
