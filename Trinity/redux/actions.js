import { DATA_FETCHING, DATA_FETCHING_SUCCESS, DATA_FETCHING_FAILURE} from './constants';

export function fetchDataFromAPI() {
    return (dispatch) => {
        dispatch(getData())
         fetch('')
            .then(res => res.json())
            .then(json => dispatch(getDataSuccess(json.results)))
            .catch(err => dispatch(getDataFailure(err)))
    }
};

function getData() {
    return {
        type: DATA_FETCHING
    }
}

function getDataSuccess(data) {
    return {
        type: DATA_FETCHING_SUCCESS,
        data
    }
}

function getDataFailure(data) {
    return {
        type: DATA_FETCHING_FAILURE
    }
}