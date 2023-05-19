import {ADD_OWNRATING, REMOVE_OWNRATING} from "../actions/types";


export default (state = {}, action) => {
    switch (action.type) {
        case REMOVE_OWNRATING:

            if(state[action.payload]) {
                delete state[action.payload];
                return {...state};
            }else{
                return state;
            }
        case ADD_OWNRATING:

            if(state[action.payload.id] ){
                state[action.payload.id] = action.payload.rating;
                return {...state};
            }else {
                return {...state, [action.payload.id]: action.payload.rating};
            }
        default:
            return state;
    }
};