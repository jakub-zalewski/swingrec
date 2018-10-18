import React, { Component } from 'react';
import { fetchPictures } from  '../api/flickrApiHelper';
import Photo from "./Photo";
import InfiniteScroll from 'react-infinite-scroller';
import Loader from "./Loader";
import { defaultTags, perPage } from "../config/config";
import SearchForm from "./SearchForm";

class PhotosList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            author: props.match.params.author,
            authorName: props.match.params.authorName,
            photos: [],
            hasMore: true,
            searching: false,
            text: '',
            page: 1
        };
    }

    loadPictures() {
        const size = 'm';
        fetchPictures(defaultTags, this.state.page, perPage, this.state.author, size, 0, this.state.text)
            .then(data => {
                let newPage = this.state.page + 1;
                this.setState({
                    ...this.state,
                    photos: [...this.state.photos, ...data],
                    page: newPage,
                    hasMore: newPage < 5 && !!data.length,
                    searching: false
                });
            }).catch(error => {
                alert(`Error occured: ${error.message}`) ;
            });
    }

    loadFromSroller() {
        if (this.state.searching) {
            return;
        }

        this.loadPictures();
    }

    search(text) {
        this.setState({
            ...this.state,
            photos:[],
            searching: true,
            page: 1,
            text: text
        });
        this.loadPictures();
    }

    render() {
        const photos = this.state.photos.map((photo) => {
            return <Photo key={photo.url} photo={photo}/>;
        });
        const loader = this.state.searching ? <Loader/> : '';
        const author = this.state.author ? <p>Displaying picutres of author: <b>{this.state.authorName}</b></p> : '';

        return (
            <div>
                <SearchForm handler={this.search.bind(this)}/>
                {author}
                {loader}
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadFromSroller.bind(this)}
                    hasMore={this.state.hasMore}
                    loader={<Loader key={0}/>}
                    getScrollParent={() => this.scrollParentRef}
                >
                    <div className="row text-lg-left text-center">
                        {photos}
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}

export default PhotosList;
