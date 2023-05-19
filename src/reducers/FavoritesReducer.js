import * as FileSystem from 'expo-file-system';
import {ADD_FAVORITE, REMOVE_FAVORITE} from "../actions/types";


export default (state = {}, action) => {
    switch (action.type) {
        case REMOVE_FAVORITE:

            if(state[action.payload]) {
                delete state[action.payload];
                return {...state};
            }else{
                return state;
            }
        case ADD_FAVORITE:

            return {...state, [action.payload.id] : action.payload};
        default:
            return state;
    }
};