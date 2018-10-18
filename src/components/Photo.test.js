import React from 'react';
import TestRenderer from 'react-test-renderer';
import Photo from './Photo';
import PhotoCaption from './PhotoCaption'
import { MemoryRouter }  from 'react-router-dom';

describe('Photo', () => {

    const photo = {
        "title": "New Pin on Board: SEO and PPC",
        "description": "content 1",
        "owner": "95151252@N04",
        "ownerName": "Sheikhabusaleh1",
        "latitude": 0,
        "longitude": 0,
        "date": new Date("2018-09-15T00:15:58.000Z"),
        "url": "https://farm2.staticflickr.com/1856/42881112150_7040e9ef84_m.jpg"
    };

    it('should contain proper img', () => {

        //when
        const testRenderer = TestRenderer.create(
            <MemoryRouter>
                <Photo photo={photo}/>
            </MemoryRouter>
        );

        //then
        const testInstance = testRenderer.root;
        const images = testInstance.findAll((el) => el.type === 'img');

        const image = images[0];

        expect(images.length).toBe(1);

        expect(image.props.alt).toBe('New Pin on Board: SEO and PPC');
        expect(image.props.src).toBe('https://farm2.staticflickr.com/1856/42881112150_7040e9ef84_m.jpg');
    });

    it('should contain proper caption', () => {

        //when
        const testRenderer = TestRenderer.create(
            <MemoryRouter>
                <Photo photo={photo}/>
            </MemoryRouter>
        );

        //then
        const testInstance = testRenderer.root;
        const caption = testInstance.findByType(PhotoCaption);

        expect(caption.props.description).toBe('content 1');
        expect(caption.props.owner).toBe('95151252@N04');
        expect(caption.props.ownerName).toBe('Sheikhabusaleh1');
    });

});
