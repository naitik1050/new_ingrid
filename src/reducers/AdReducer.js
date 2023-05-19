import {UPDATE_ADSTATE} from '../actions/types'

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_ADSTATE:
            return action.payload;
        default:
            return state;
    }
};