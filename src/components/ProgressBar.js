import React from 'react';

const ProgressBar = ({ completionPercentage }) => {
    const containerStyle = {
        height: '10px',
        width: '100%',
        backgroundColor: '#e0e0de',
        borderRadius: '5px',
        margin: '10px 0'
    };

    const fillerStyle = {
        height: '100%',
        width: `${completionPercentage}%`,
        backgroundColor: completionPercentage === 100 ? '#4caf50' : '#3b5998',
        borderRadius: 'inherit',
        textAlign: 'right'
    };

    return (
        <div style={containerStyle}>
            <div style={fillerStyle}></div>
        </div>
    );
};

export default ProgressBar;
