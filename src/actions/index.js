import 'cross-fetch/polyfill';

export const FAILURE_ROCKETS = 'FAILURE_ROCKETS';
export const REQUEST_ROCKETS = 'REQUEST_ROCKETS';
export const RECEIVE_ROCKETS = 'RECEIVE_ROCKETS';
export const DELETE_ROCKET = 'DELETE_ROCKET';
export const INVALIDATE_ROCKET = 'INVALIDATE_ROCKET';

export function deleteRocket(rocketID) {
    return {
        type: DELETE_ROCKET,
        rocketID,
    };
}

export function invalidateRocket(rocket) {
    return {
        type: INVALIDATE_ROCKET,
        rocket,
    };
}

function requestRockets() {
    return {
        type: REQUEST_ROCKETS,
    };
}

function receiveRockets(json) {
    return {
        type: RECEIVE_ROCKETS,
        rockets: json,
    };
}

function failureRockets(error) {
    return {
        type: FAILURE_ROCKETS,
        error,
    };
}

function fetchRockets() {
    return (dispatch) => {
        dispatch(requestRockets());

        return fetch('https://api.spacexdata.com/v3/rockets')
            .then((response) => response.json())
            .then((json) => dispatch(receiveRockets(json)))
            .catch((error) => dispatch(failureRockets(error)));
    };
}

function shouldFetchRockets(state) {
    const rockets = state.rockets;

    if (!rockets.items) {
        return true;
    } else if (rockets.isFetching) {
        return false;
    }

    return rockets.didInvalidate;
}

export function fetchRocketsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchRockets(getState())) {
            return dispatch(fetchRockets());
        }
    };
}
