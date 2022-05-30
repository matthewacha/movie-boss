import { useState } from 'react';
import styled from 'styled-components';

import { FilterOptions } from 'types';

import Checkbox from '../checkbox';

interface Props {
    title: string;
    category?: string;
    data?: FilterOptions[];
}

export default function AccordionFilter({ title, category, data }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <FilterButton data-testid="filter-title" onClick={() => setIsOpen(!isOpen)}>
                <PlusMinusIcon className={isOpen ? 'open' : ''} />
                <Title>{title}</Title>
            </FilterButton>
            {isOpen &&
                data?.length &&
                data.map((item) => (
                    <Checkbox
                        key={item.id}
                        id={`${item.name}-${category && `${category}-`}checkbox`}
                        name={`${item.name}`}
                        label={`${item.name}`}
                    />
                ))}
        </div>
    );
}

const FilterButton = styled.div`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
`;

const Title = styled.h3`
    font-weight: 400;
    margin: 10px 0;
`;

const PlusMinusIcon = styled.span`
    position: relative;
    width: 15px;
    height: 15px;
    margin-right: 15px;
    &:before,
    &:after {
        content: '';
        position: absolute;
        background-color: #000;
        transition: transform 0.25s ease-out;
    }
    &:before {
        top: 0;
        left: 50%;
        width: 2px;
        height: 100%;
        margin-left: -1px;
    }
    &:after {
        top: 50%;
        left: 0;
        width: 100%;
        height: 2px;
        margin-top: -1px;
    }
    &.open {
        &:before {
            transform: rotate(-90deg);
        }
        &:after {
            transform: rotate(180deg);
        }
    }
`;
