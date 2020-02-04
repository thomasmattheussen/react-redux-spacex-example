import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import configureStore from '../../configure-store';
import App from './App';

describe('app component', () => {
    beforeEach(() => {
        fetch.disableMocks();
    });

    it('renders the app component', () => {
        const store = configureStore();
        const { getByText } = render(<Provider store={store}><App /></Provider>);
        const headerElement = getByText(/SpaceX rockets/i);
        expect(headerElement).toBeInTheDocument();
    });
});
