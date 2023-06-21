import { SAMPLE_DATA_LOADED } from './config';

const reducer = (state = null, action) => {
    switch (action.type) {
        case SAMPLE_DATA_LOADED:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;