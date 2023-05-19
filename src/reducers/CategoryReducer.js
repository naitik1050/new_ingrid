import * as FileSystem from 'expo-file-system';
import data from '../data/categories.json';
import {UPDATE_CATS} from "../actions/types";


export default (state = data, action) => {
    switch (action.type) {
        case UPDATE_CATS:
            return action.payload;
        default:
            return state;
    }
};