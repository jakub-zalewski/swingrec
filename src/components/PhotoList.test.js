import React from 'react';
import TestRenderer from 'react-test-renderer';
import PhotosList from './PhotosList';
import Photo from './Photo';
import { fetchPictures }  from '../api/flickrApiHelper';
import { MemoryRouter }  from 'react-router-dom';

jest.mock('../api/flickrApiHelper');

describe('Photo list', () => {

    it('should call fetchPictures', () => {
        //given
        fetchPictures.mockImplementation(() =>
            Promise.resolve([])
        );

        const match = {
            params: {
                author: 'asf',
                authorName: 'name'
            }
        };

        const testRenderer = TestRenderer.create(
            <PhotosList match={match}/>,
        );

        const component = testRenderer.getInstance();

        //when
        component.loadPictures();

        //then
        expect(fetchPictures).toHaveBeenCalledTimes(1);
    });
});
