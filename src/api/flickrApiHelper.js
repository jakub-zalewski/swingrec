const flickrConfig = {
    apiUrl: 'https://api.flickr.com/services/rest/?method=flickr.photos.search',
    apiKey: '50499ba540057ccc4a6a5c47bd66694f'
};

function buildUrl(tags, page, perPage, author, hasGeo, text) {

    const params = [
        flickrConfig.apiUrl,
        'api_key=' + flickrConfig.apiKey,
        'format=json',
        'nojsoncallback=1',
        'tag_mode=all',
        'tags=' + tags.join(','),
        'extras=date_taken,owner_name,date_upload,description,geo',
        'sort=date-posted-desc',
        'per_page=' + perPage,
        'page=' + page
    ];

    if (author) {
        params.push('user_id=' + author);
    }

    if (hasGeo) {
        params.push('has_geo=1')
    }

    if (text) {
        params.push('text=' + text)
    }


    return encodeURI(params.join('&'));
}

function buildPhotoUrl(photo, size) {
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + size + '.jpg';
}

function mapData(data, size) {
    return data.photos.photo.map(photo => {
        return {
            title: photo.title,
            description: photo.description._content,
            owner: photo.owner,
            ownerName: photo.ownername,
            latitude: photo.latitude,
            longitude: photo.longitude,
            date: new Date(photo.datetaken),
            url: buildPhotoUrl(photo, size),
        }
    });
}

const failStatus = 'fail';
const fetchPictures = (tags, page, perPage, author, size = 'm', hasGeo, text) => {
    return fetch(buildUrl(tags, page, perPage, author, hasGeo, text)
        ).then(response => {
            return response.json();
        }).then(data => {

            if (data.stat === failStatus) {
                throw new Error(data.message);
            }

            return mapData(data, size);
        });
};

export { fetchPictures };
