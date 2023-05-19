import * as FileSystem from 'expo-file-system';
import data from '../data/categories.json';

import {NAME_CHANGED, INTOL_CHANGED, FIRSTLAUNCH_CHANGED, COPY_SETTINGS, LANG_CHANGED} from '../actions/types'

const INITIAL_STATE = {
    isFirstLaunch: true,
    userName: '',
    lang: '',
    fodmap: false,
    lactose: false,
    histaminDE: false,
    histaminKP: false,
    sorbit: false,
    gluten: false,
    fructoseDE: false,
    fructoseKP: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INTOL_CHANGED:
            return {...state, [action.payload.key] : action.payload.value};
        case NAME_CHANGED:
            return {...state, userName : action.payload};
        case FIRSTLAUNCH_CHANGED:
            return {...state, isFirstLaunch : action.payload};
        case LANG_CHANGED:
            return {...state, lang : action.payload};
        case COPY_SETTINGS:
            return action.payload;
        default:
            return state;
    }
};