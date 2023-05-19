import * as FileSystem from 'expo-file-system';
import data from '../data/categories.json';
import {SET_SCREEN} from "../actions/types";
export default (state = false, action) => {
    switch(action.type){
        case SET_SCREEN:
            return action.payload;
        default:
            return state;
    }
};