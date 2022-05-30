import React from 'react';
import { render, screen } from '@testing-library/react';

import SearchFilters from '.';

const props = {
    genres: [],
    ratings: [],
    languages: [],
    keyword: '',
    handleInputChange: jest.fn()
}

describe('SearchFilters', () => {
    it('it shoulc render Searchfilters', () => {
        render(<SearchFilters {...props} />);
        expect(screen.getByText('Select genre(s)')).toBeInTheDocument;
    })
})