import data from '../data/ingridText.json';
import {UPDATE_TEXTS} from "../actions/types";


export default (state = data, action) => {
    switch (action.type) {
        case UPDATE_TEXTS:
            return action.payload;
        default:
            return state;
    }
};