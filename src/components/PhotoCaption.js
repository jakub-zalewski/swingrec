import React from 'react';
import { Link } from 'react-router-dom';

const PhotoCaption = (props)  => {

    const description = props.description ? <p className="card-text">{props.description }</p> : '';

    return (
        <div className="card-body">
            {description}
            <p className="card-text">
                <small className="text-muted">Author: <Link to={`/picture-list/author/${props.owner}/${props.ownerName}`}>{props.ownerName}</Link></small><br/>
                <small className="text-muted">Date: {props.date.toLocaleDateString()}</small>
            </p>
        </div>
    );
};

export default PhotoCaption;
