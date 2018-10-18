import React, { Component } from 'react';
import Map from "./Map";
import { fetchPictures } from "../api/flickrApiHelper";
import { defaultTags} from "../config/config";
import Loader from "./Loader";
import SearchForm from "./SearchForm";

class DogsMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            markersData: []
        };
    }

    componentDidMount() {
        this.loadPictures();
    }

    loadPictures(text = '') {
        fetchPictures(defaultTags, 0, 100, null, 'n', true, text)
            .then(data => {
                this.setState({
                    loading: false,
                    markersData: this.mapPhotosToMarkers(data)
                })
            }).catch(error => {
                alert(`Error occured: ${error.message}`) ;
            });
    }

    mapPhotosToMarkers(photos) {
        return photos.map((photo) => {
            return {
                text: photo.title,
                description: photo.description,
                imgUrl: photo.url,
                latitude: photo.latitude,
                longitude: photo.longitude
            }
        });
    }

    search(text) {
        this.setState({
            ...this.state,
            photos:[],
            loading: true
        });

        this.loadPictures(text);
    }

    render() {
        const loader = this.state.loading ? <Loader/> : '',
            status = !this.state.loading && !this.state.markersData.length ? <p>No photos for given criteria</p> : '';

        return (
            <div>
                <SearchForm handler={this.search.bind(this)}/>
                <Map markersData={this.state.markersData} />
                {loader}
                {status}
            </div>
        );
    }
}

export default DogsMap;
