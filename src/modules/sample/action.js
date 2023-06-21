import { SAMPLE_DATA_LOADED } from './config';

export const get = () => {
    return (dispatch) => {
        dispatch({ type: SAMPLE_DATA_LOADED, payload: "Hello World" });
    }
}
