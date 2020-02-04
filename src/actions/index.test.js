import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DELETE_ROCKET, RECEIVE_ROCKETS, REQUEST_ROCKETS, fetchRocketsIfNeeded, deleteRocket } from './index';
import fetchMock from 'jest-fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('creates REQUEST_ROCKETS and RECEIVE_ROCKETS', () => {
        fetchMock.mockResponseOnce(JSON.stringify([{ id: 1, rocket_name: 'Falcon 9' }]));

        const expectedActions = [
            { type: REQUEST_ROCKETS },
            { type: RECEIVE_ROCKETS, rockets: [{ id: 1, rocket_name: 'Falcon 9' }] },
        ];
        const store = mockStore({
            rockets: {},
        });

        return store.dispatch(fetchRocketsIfNeeded()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('creates DELETE_ROCKETS', () => {
        const expectedActions = [
            { type: DELETE_ROCKET, rocketID: 0 },
        ];
        const store = mockStore({
            rockets: {},
        });

        store.dispatch(deleteRocket(0));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
