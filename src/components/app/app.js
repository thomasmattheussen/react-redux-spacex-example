import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRocketsIfNeeded } from '../../actions/index';

import './app.css';
import RocketDetail from '../rocket-detail/rocket-detail';
import Rockets from '../rockets/rockets';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRocketsIfNeeded());
    }, [dispatch]);

    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route path="/detail/:id">
                        <RocketDetail />
                    </Route>
                    <Route path="/">
                        <Rockets />
                    </Route>
                </Switch>
            </div>
        </Router>

    );
};

export default App;
