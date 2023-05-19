import data from '../data/sortedIngredients.json';
import {UPDATE_ING, UPDATE_SORTED_ING} from "../actions/types";


export default (state = data, action) => {
    switch (action.type) {
        case UPDATE_SORTED_ING:
            return action.payload;
        default:
            return state;
    }
};