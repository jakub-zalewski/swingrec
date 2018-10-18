import { fetchPictures } from './flickrApiHelper'

const flickrCorrectResponseData = {
    "photos": {
        "page":1,
        "pages":333,
        "perpage":25,
        "total":"8310",
        "photo":[
            {
                "id":"42881112150",
                "owner":"95151252@N04",
                "secret":"7040e9ef84",
                "server":"1856",
                "farm":2,
                "title": "New Pin on Board: SEO and PPC",
                "ispublic":1,
                "isfriend":0,
                "isfamily":0,
                "description":{"_content":"content 1"},
                "dateupload":"1537002958",
                "datetaken": "2018-09-15 02:15:58",
                "datetakengranularity":0,
                "datetakenunknown":"1",
                "ownername":"Sheikhabusaleh1",
                "latitude":0,
                "longitude":0,
                "accuracy":0,
                "context":0
            },
            {
                "id": "43069134054",
                "owner": "40788338@N06",
                "secret": "3bc36a89f6",
                "server": "1777",
                "farm": 2,
                "title": "the title",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0,
                "description": {"_content": "the description"},
                "dateupload": "1533137925",
                "datetaken": "2018-08-01 08:38:45",
                "datetakengranularity": 0,
                "datetakenunknown": "1",
                "ownername": "HAR Blog System",
                "latitude": 0,
                "longitude": 0,
                "accuracy": 0,
                "context": 0
            }
        ]
    }
};

describe('response handling', () => {

    it('should reject promise on API failure with proper error message', () => {
        //given
        mockFailedFechtResponse();

        //when
        expect.assertions(1);
        return fetchPictures([], 1, 25).catch((error) => {
            //then
            expect(error.message).toBe('failed response');
        });
    });

    it('should return data on successful call', () => {
        //given
        mockSuccessFechtResponse(flickrCorrectResponseData);

        //when
        expect.assertions(1);
        return fetchPictures([], 1, 25).then((data) => {
            //then
            expect(true).toBe(true);
        });
    });

});

describe('Flickr API call', () => {

    it('should call native fetch API', () => {
        //given
        const mockedFetch = mockSuccessFechtResponse({
            stat: 'success',
            photos: {
                photo: []
            }
        });

        global.fetch = mockedFetch;

        //when
        fetchPictures(['tag1', 'tag2'], 1, 25);

        //then
        expect(mockedFetch.mock.calls.length).toBe(1);
    });

    it('should include all standard parameters', () => {
        //given
        const mockedFetch = mockSuccessFechtResponse({
            stat: 'success',
            photos: {
                photo: []
            }
        });

        global.fetch = mockedFetch;

        //when
        fetchPictures(['tag1', 'tag2'], 1, 25);

        //then
        const expectedFetchCallArg = "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
            "&api_key=50499ba540057ccc4a6a5c47bd66694f" +
            "&format=json" +
            "&nojsoncallback=1" +
            "&tag_mode=all" +
            "&tags=tag1,tag2" +
            "&extras=date_taken,owner_name,date_upload,description,geo" +
            "&sort=date-posted-desc" +
            "&per_page=25" +
            "&page=1";

        expect(mockedFetch).toHaveBeenCalledWith(expectedFetchCallArg);
    });

    it('should include author', () => {
        //given
        const mockedFetch = mockSuccessFechtResponse({
            stat: 'success',
            photos: {
                photo: []
            }
        });

        global.fetch = mockedFetch;

        //when
        fetchPictures(['tag1', 'tag2'], 1, 25, 'author');

        //then
        const expectedFetchCallArg = "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
            "&api_key=50499ba540057ccc4a6a5c47bd66694f" +
            "&format=json" +
            "&nojsoncallback=1" +
            "&tag_mode=all" +
            "&tags=tag1,tag2" +
            "&extras=date_taken,owner_name,date_upload,description,geo" +
            "&sort=date-posted-desc" +
            "&per_page=25" +
            "&page=1" +
            "&user_id=author";

        expect(mockedFetch).toHaveBeenCalledWith(expectedFetchCallArg);
    });

    it('should include geo', () => {
        //given
        const mockedFetch = mockSuccessFechtResponse({
            stat: 'success',
            photos: {
                photo: []
            }
        });

        global.fetch = mockedFetch;

        //when
        fetchPictures(['tag1', 'tag2'], 1, 25, 'author', '', true);

        //then
        const expectedFetchCallArg = "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
            "&api_key=50499ba540057ccc4a6a5c47bd66694f" +
            "&format=json" +
            "&nojsoncallback=1" +
            "&tag_mode=all" +
            "&tags=tag1,tag2" +
            "&extras=date_taken,owner_name,date_upload,description,geo" +
            "&sort=date-posted-desc" +
            "&per_page=25" +
            "&page=1" +
            "&user_id=author" +
            "&has_geo=1";

        expect(mockedFetch).toHaveBeenCalledWith(expectedFetchCallArg);
    });

    it('should include free search text', () => {
        //given
        const mockedFetch = mockSuccessFechtResponse({
            stat: 'success',
            photos: {
                photo: []
            }
        });

        global.fetch = mockedFetch;

        //when
        fetchPictures(['tag1', 'tag2'], 1, 25, 'author', '', true, 'search text');

        //then
        const expectedFetchCallArg = "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
            "&api_key=50499ba540057ccc4a6a5c47bd66694f" +
            "&format=json" +
            "&nojsoncallback=1" +
            "&tag_mode=all" +
            "&tags=tag1,tag2" +
            "&extras=date_taken,owner_name,date_upload,description,geo" +
            "&sort=date-posted-desc" +
            "&per_page=25" +
            "&page=1" +
            "&user_id=author" +
            "&has_geo=1" +
            "&text=search%20text";

        expect(mockedFetch).toHaveBeenCalledWith(expectedFetchCallArg);
    });
});

describe('Flickr response data mapping', () => {

    it('should properlyMapResponse', () => {
        //given
        const mockedFetch = mockSuccessFechtResponse(flickrCorrectResponseData);

        global.fetch = mockedFetch;

        //when
        expect.assertions(2);
        fetchPictures(['tag1', 'tag2'], 1, 25).then((data) => {
            expect(data[0]).toEqual({
                "title": "New Pin on Board: SEO and PPC",
                "description": "content 1",
                "owner": "95151252@N04",
                "ownerName": "Sheikhabusaleh1",
                "latitude": 0,
                "longitude": 0,
                "date": new Date("2018-09-15T00:15:58.000Z"),
                "url": "https://farm2.staticflickr.com/1856/42881112150_7040e9ef84_m.jpg"
            });
            expect(data[1]).toEqual({
                "title": "the title",
                "description": "the description",
                "owner": "40788338@N06",
                "ownerName": "HAR Blog System",
                "latitude": 0,
                "longitude": 0,
                "date": new Date("2018-08-01T06:38:45.000Z"),
                "url": "https://farm2.staticflickr.com/1777/43069134054_3bc36a89f6_m.jpg"
            });
        });
    });
});

const mockFailedFechtResponse = () => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            json: () => {
                return {
                    stat: 'fail',
                    message: 'failed response'
                };
            }
        })
    );
};

const mockSuccessFechtResponse = (dataToReturn) => {
    return global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            json: () => {
                return dataToReturn;
            }
        })
    );
};
