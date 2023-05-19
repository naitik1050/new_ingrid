import {UPDATE_STRINGS} from "../actions/types";


export default (state = {}, action) => {
    switch (action.type) {
        case UPDATE_STRINGS:
            return action.payload;
        default:
            return state;
    }
};