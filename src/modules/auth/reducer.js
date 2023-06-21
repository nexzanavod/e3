import { USER_LOGGED_IN, USER_LOGGED_OUT } from './config';

const auth = localStorage.getItem("auth") || null;

const reducer = (state = JSON.parse(auth), action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            localStorage.setItem("auth", JSON.stringify(action.payload));
            return action.payload;
        case USER_LOGGED_OUT:
            localStorage.removeItem("auth");
            return null;
        default:
            return state;
    }
}

export default reducer;