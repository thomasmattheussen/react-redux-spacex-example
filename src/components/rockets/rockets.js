import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import shuffle from 'lodash/shuffle';

import FetchedData from '../fetched-data/fetched-data';

import './rockets.css';

const Rockets = () => {
    const { items, isFetching, error } = useSelector((state) => state.rockets);
    const [rockets, setRockets] = useState(items);

    useEffect(() => {
        setRockets(items);
    }, [items]);

    return (
        <div className="rockets">
            <h1>SpaceX rockets</h1>

            <FetchedData error={ error } isFetching={ isFetching }>
                <>
                    <ul className="rockets__list">
                        {
                            rockets && rockets.length ? (
                                rockets.map((rocket) => (
                                    <li key={ rocket.id }>
                                        <Link to={ `detail/${rocket.id}` } >
                                            { rocket.rocket_name }
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li>No rockets here!</li>
                            )
                        }
                    </ul>
                    <button className="btn" onClick={ () => setRockets(shuffle(items)) }>
                        <span role="img" aria-label="Dizzy star emoji">💫</span> Shuffle!
                    </button>
                </>
            </FetchedData>
        </div>
    );
};

export default Rockets;
