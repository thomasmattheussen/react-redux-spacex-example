import React from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { deleteRocket } from '../../actions';
import FetchedData from '../fetched-data/fetched-data';

import './rocket-detail.css';

const RocketDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const { error, items, isFetching } = useSelector((state) => state.rockets);
    const rocketData = items && items.find((rocket) => {
        return rocket.id === parseInt(id, 10);
    });

    const handleDelete = () => {
        dispatch(deleteRocket(rocketData.id));
        history.push('/');
    };

    return (
        <div>
            <Link to="/"><span role="img" aria-label="Back emoji">🔙</span> Back to all rockets</Link>

            <FetchedData error={ error } isFetching={ isFetching }>
                {
                    rocketData ? (
                        <div className="rocket-detail">
                            <div className="rocket-detail__header">
                                <img src={ rocketData.flickr_images[1] } alt={ rocketData.rocket_name } className="rocket-detail__visual" />
                            </div>
                            <div className="rocket-detail__body">
                                <h2>{ rocketData.rocket_name }</h2>
                                <p>{ rocketData.description }</p>
                            </div>
                            <div className="rocket-detail__footer">
                                <button className="btn" onClick={ () => handleDelete() }><span role="img" aria-label="Trashcan emoji">🗑</span> Delete</button>
                            </div>
                        </div>
                    ) : (
                        <li>No rockets here!</li>
                    )
                }
            </FetchedData>
        </div>
    );
};

export default RocketDetail;
