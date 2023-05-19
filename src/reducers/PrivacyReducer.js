import {UPDATE_PRIVACY} from "../actions/types";

const htmlContent = {html: ``};


export default (state = htmlContent, action) => {
    switch (action.type) {
        case UPDATE_PRIVACY:
            return action.payload;
        default:
            return state;
    }
};