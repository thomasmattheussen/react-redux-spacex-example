import { INVALIDATE_ROCKET, RECEIVE_ROCKETS, REQUEST_ROCKETS, FAILURE_ROCKETS, DELETE_ROCKET } from '../actions/index';

function rockets(state = {}, action) {
    switch (action.type) {
        case DELETE_ROCKET:
            return Object.assign({}, state, {
                items: state.items.filter((rocket) => rocket.id !== action.rocketID),
            });
        case INVALIDATE_ROCKET:
            return Object.assign({}, state, {
                didInvalidate: true,
            });
        case REQUEST_ROCKETS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });
        case RECEIVE_ROCKETS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.rockets,
            });
        case FAILURE_ROCKETS:
            return Object.assign({}, state, {
                error: action.error,
                isFetching: false,
                didInvalidate: false,
            });
        default:
            return state;
    }
}

export default rockets;

