import {SAVE_SETTINGS} from '../actions/types'

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
        case SAVE_SETTINGS:
            return action.payload;
        default:
            return state;
    }
};