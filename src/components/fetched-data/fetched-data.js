import React from 'react';

const FetchedData = ({ error, isFetching, children, ...otherProps }) => {
    return (
        <div { ...otherProps }>
            {
                error ? (
                    <div>
                        <p>An error happened:</p>
                        <p>{ error.message }</p>
                    </div>
                ) : (
                    isFetching ? (
                        <div><span role="img" aria-label="UFO emoji">🛸</span> Loading...</div>
                    ) : (
                        children
                    )
                )
            }
        </div>
    );
};

export default FetchedData;
