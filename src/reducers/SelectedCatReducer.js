import * as FileSystem from 'expo-file-system';
import data from '../data/categories.json';
export default (state = null, action) => {
    switch(action.type){
        case 'select_cat':
            return action.payload;
        default:
            return state;
    }
};