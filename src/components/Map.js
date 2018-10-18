import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Map extends Component {

    currentMarkers = [];

    static defaultProps = {
        center: {
            lat: 1,
            lng: 1
        },
        zoom: 0,
        apiKey: 'AIzaSyAYH_Tl6BPsDZZROTNpaYhQh5wHVOjVOUc'
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.markersData !== prevState.markersData) {
            return { markersData: nextProps.markersData };
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            markersData: [],
            currentMarkers: [],
            map: null,
            maps: null,
            infoWindow: null,
            bounds: null,
            mapLoaded: false
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.markersData !== this.state.markersData;
    }

    onGoogleApiLoaded({map, maps}) {
        let infowindow = new maps.InfoWindow();

        this.setState({
            ...this.props.state,
            map: map,
            maps: maps,
            infoWindow: infowindow,
            mapLoaded: true
        });

        this.redrawMarkers();
    }

    redrawMarkers() {

        this.currentMarkers.forEach((marker) => {
           marker.setMap(null);
        });
        this.currentMarkers = [];

        let bounds  = new this.state.maps.LatLngBounds();

        this.state.markersData.forEach((markerData) => {
            let marker = this.createMarker(this.state.maps, markerData, this.state.map);
            this.addMarkerClickEvent(marker, this.state.infoWindow, markerData, this.state.map);

            this.currentMarkers.push(marker);

            let loc = new this.state.maps.LatLng(marker.position.lat(), marker.position.lng());
            bounds.extend(loc);
        });

        this.fitMapView(bounds);
    }

    fitMapView(bounds) {
        if (this.currentMarkers.length) {
            this.state.map.fitBounds(bounds);
            this.state.map.panToBounds(bounds);
        } else {
            this.state.map.setZoom(this.props.zoom);
            this.state.map.setCenter(this.props.center);
        }
    }

    addMarkerClickEvent(marker, infoWindow, markerData, map) {
        marker.addListener('click', () => {
            infoWindow.setContent(`<img src="${markerData.imgUrl}"/><p>${markerData.description}</p>`);
            infoWindow.open(map, marker);
        });
    }

    createMarker(maps, markerData, map) {
        return new maps.Marker({
            position: {lat: parseFloat(markerData.latitude), lng: parseFloat(markerData.longitude)},
            map: map,
            title: markerData.text
        });
    }

    render() {
        if (this.state.mapLoaded) {
            this.redrawMarkers();
        }

        return (
            <div style={{ height: '70vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: this.props.apiKey }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    onGoogleApiLoaded={this.onGoogleApiLoaded.bind(this)}
                    yesIWantToUseGoogleMapApiInternals={true}
                >
            </GoogleMapReact>
            </div>
        );
    }
}

export default Map;
