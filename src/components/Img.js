import React, { Component } from 'react';
import './Img.css';

class Img extends Component {

    constructor(props) {
        super(props);

        this.state = {
            src: props.src,
            alt: props.alt,
            loading: true,
            imageLoadError: false
        }
    }

    handleImageLoaded() {
        this.setState({
            ...this.state,
            loading: false
        })
    }

    handleImageLoadError() {
        this.setState({
            ...this.state,
            imageLoadError: true
        })
    }

    render() {
        const style = {
                visibility: this.state.loading ? 'hidden' : 'visible'
            },
            imageStatusText = this.state.imageLoadError
                ? 'image load failed'
                : this.state.loading ? 'loading...' : '';

        return (
            <div className="img-container">
                <img
                    style={style}
                    className="card-img-top"
                    src={this.state.src}
                    alt={this.state.alt}
                    onLoad={this.handleImageLoaded.bind(this)}
                    onError={this.handleImageLoadError.bind(this)}
                />
                <span className="status">{imageStatusText}</span>
            </div>

        )
    }

}

export default Img;
