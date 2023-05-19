import data from '../data/ingredients.json';
import {UPDATE_ING} from "../actions/types";


export default (state = data, action) => {
    switch (action.type) {
        case UPDATE_ING:
            return action.payload;
        default:
            return state;
    }
};