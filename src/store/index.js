import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from '../reducers'; // the value from combineReducers
import { AsyncStorage } from 'react-native';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'lastUpdate' ,
        'settings',
        'adfree',
        'categories',
        'ingredients',
        'favorites', 'ingridTexts',
        'strings', 'sortedIngredients', 'ownRating', 'imprint', 'faq', 'privacy']
};



const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);