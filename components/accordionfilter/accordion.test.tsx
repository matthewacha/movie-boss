import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


import AccordionFilter from  '.';

const props = {
    title: 'Select min. vote',
    category: 'rating',
    data: [
        { id: 7.5, name: 7.5 },
        { id: 8, name: 8 },
        { id: 8.5, name: 8.5 },
        { id: 9, name: 9 },
        { id: 9.5, name: 9.5 },
        { id: 10, name: 10 },
    ],
};

describe('AccordionFilter', () => {
    it('should render accordion', () => {
        render(<AccordionFilter {...props} />);
        expect(screen.getByTestId('filter-title')).toBeInTheDocument;
    })

    it('should expand accordion', async () => {
        render(<AccordionFilter {...props} />);
        const expandDiv = screen.getByTestId('filter-title');
        await userEvent.click(expandDiv)
        expect(screen.getByText('9.5')).toBeInTheDocument;
    })
})