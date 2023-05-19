import {
    NAME_CHANGED, INTOL_CHANGED, SAVE_SETTINGS, COPY_SETTINGS, UPDATE_LASTUPDATE, UPDATE_CATS,
    UPDATE_ING, UPDATE_TEXTS, SET_SCREEN, ADD_FAVORITE, REMOVE_FAVORITE, UPDATE_SORTED_ING, UPDATE_STRINGS,
    ADD_OWNRATING, REMOVE_OWNRATING, UPDATE_IMPRINT, UPDATE_FAQ, UPDATE_ADSTATE, UPDATE_PRIVACY
} from './types'

export const selectCat = (catId) => {
  return {
      type: 'select_cat',
      payload: catId
  };
};

export const updateCats = (catId) => {
    return {
        type: UPDATE_CATS,
        payload: catId
    };
};

export const updateIng = (catId) => {
    return {
        type: UPDATE_ING,
        payload: catId
    };
};

export const updateSortedIng = (catId) => {
    return {
        type: UPDATE_SORTED_ING,
        payload: catId
    };
};

export const nameChanged = (name) => {
    return {
        type: NAME_CHANGED,
        payload: name
    };
};

export const intolChanged = (obj) => {
    return {
        type: INTOL_CHANGED,
        payload: obj
    };
};

export const langChanged = (obj) => {
    return {
        type: LANG_CHANGED,
        payload: obj
    };
};
export const copySettings = (settings) => {
    return {
        type: COPY_SETTINGS,
        payload: settings
    };
};

export const saveSettings = (settings) => {
    return {
        type: SAVE_SETTINGS,
        payload: settings
    };
};

export const updateLastUpdate = (timestamp) => {
    return {
        type: UPDATE_LASTUPDATE,
        payload: timestamp
    };
};


export const updateTexts = (obj) => {
    return {
        type: UPDATE_TEXTS,
        payload: obj
    };
};


export const updateStrings = (obj) => {
    return {
        type: UPDATE_STRINGS,
        payload: obj
    };
};

export const updateImprint = (obj) => {
    return {
        type: UPDATE_IMPRINT,
        payload: obj
    };
};

export const updateFAQ = (obj) => {
    return {
        type: UPDATE_FAQ,
        payload: obj
    };
};

export const updatePrivacy = (obj) => {
    return {
        type: UPDATE_PRIVACY,
        payload: obj
    };
};

export const setScreen = (timestamp) => {
    return {
        type: SET_SCREEN,
        payload: timestamp
    };
};

export const addFavorite = (item) => {
    return {
        type: ADD_FAVORITE,
        payload: item
    };
};

export const removeFavorite = (id) => {
    return {
        type: REMOVE_FAVORITE,
        payload: id
    };
};

export const addOwnRating = (item) => {
    return {
        type: ADD_OWNRATING,
        payload: item
    };
};

export const removeOwnRating = (id) => {
    return {
        type: REMOVE_OWNRATING,
        payload: id
    };
};


export const updateAdState = (val) => {
    return {
        type: UPDATE_ADSTATE,
        payload: val
    };
};
