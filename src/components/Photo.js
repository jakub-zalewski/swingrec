import React from 'react';
import './Photo.css';
import './Img';
import Img from "./Img";
import PhotoCaption from "./PhotoCaption";

const Photo = (props) => {

    return (
        <div className="col-md-3">
            <div className="card">
                <Img
                    src={props.photo.url}
                    alt={props.photo.title}
                />
                <PhotoCaption
                    description={props.photo.description}
                    owner={props.photo.owner}
                    ownerName={props.photo.ownerName}
                    date={props.photo.date}
                />
            </div>
        </div>
    );
};

export default Photo;
