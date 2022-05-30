import React from 'react';
import { render, screen } from '@testing-library/react';

import MovieItem from '.';

const props = {
    movie: {
        adult: false,
        backdrop_path: '',
        genre_ids: [0, 2],
        id: 3,
        original_language: 'English',
        original_title: 'The Real Movie', 
        overview: '',
        popularity: 8.5,
        poster_path: '',
        release_date: '1990-08-20',
        title: 'The Real Movie',
        video: false,
        vote_average: 7.5,
        vote_count: 2000
    }, 
    genres: { 3: 'Horror', 0: 'Adventure' }
}
describe('MovieItem', () => {
    it('should render', () => {
        render(<MovieItem {...props} />);
        expect(screen.getByText('The Real Movie')).toBeInTheDocument;
    });
})