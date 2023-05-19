import {UPDATE_FAQ} from "../actions/types";

const htmlContent = {html: ``};


export default (state = htmlContent, action) => {
    switch (action.type) {
        case UPDATE_FAQ:
            return action.payload;
        default:
            return state;
    }
};