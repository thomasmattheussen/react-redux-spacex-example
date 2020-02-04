import reducer from './rockets';
import { REQUEST_ROCKETS, RECEIVE_ROCKETS } from '../actions/index';

describe('rockets reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({});
    });

    it('should handle REQUEST_ROCKETS', () => {
        expect(
            reducer({}, {
                type: REQUEST_ROCKETS,
            })
        ).toEqual({
            isFetching: true,
            didInvalidate: false,
        });
    });

    it('should handle RECEIVE_ROCKETS', () => {
        expect(
            reducer({}, {
                type: RECEIVE_ROCKETS,
                rockets: [{ id: 1, rocket_name: 'Falcon 9' }],
            })
        ).toEqual({
            isFetching: false,
            didInvalidate: false,
            items: [{ id: 1, rocket_name: 'Falcon 9' }],
        });
    });
});
