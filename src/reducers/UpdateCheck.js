import {UPDATE_LASTUPDATE} from '../actions/types'
export default (state = 0, action) => {
    switch(action.type){
        case UPDATE_LASTUPDATE:
            return action.payload;
        default:
            return state;
    }
};