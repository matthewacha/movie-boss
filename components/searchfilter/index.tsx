import { useState, ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';

import { primaryColor } from '../../styles/colors';
import { Genre, FilterOptions } from '../../types';
import ExpandableFilter from '../accordionfilter';
import SearchBar from '../searchbar';

import SearchIcon from '../../assets/images/search-icon-yellow.png';
import YearIcon from '../../assets/images/year-icon.png';
import FilterIcon from '../../assets/images/filter-icon.png';

interface Props {
    genres: Genre[] | undefined;
    ratings: FilterOptions[];
    languages: FilterOptions[];
    keyword: string;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchFilters({ genres, ratings, languages, keyword, handleInputChange }: Props) {
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

    const filterCategories = [
        {
            title: 'Select genre(s)',
            category: 'genre',
            data: genres,
        },
        {
            title: 'Select min. vote',
            category: 'rating',
            data: ratings,
        },
        {
            title: 'Select language',
            category: 'language',
            data: languages,
        },
    ];

    return (
        <FiltersWrapper>
            <SearchFiltersCont className={`search_inputs_cont ${isFilterMenuOpen ? 'open' : ''}`} marginBottom>
                <SearchBarWrapper>
                    <SearchBar
                        id="keyword_search_input"
                        type="text"
                        name="keyword"
                        icon={{ src: SearchIcon, alt: 'Magnifying glass' }}
                        placeholder="Search for movies"
                        onChange={handleInputChange}
                    />
                    <FilterIconButton onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
                        <Image src={FilterIcon} placeholder="blur" alt="Filter icon" />
                    </FilterIconButton>
                </SearchBarWrapper>
                {/* 
                    The year search field is rendered only if keyword search field is filled, 
                    in order to avoid a search call without a query (keyword), which will result in an error from the api 
                */}
                {keyword && (
                    <SearchBar
                        id="year_search_input"
                        type="number"
                        name="year"
                        icon={{ src: YearIcon, alt: 'Calendar icon' }}
                        placeholder="Year of release"
                        onChange={handleInputChange}
                    />
                )}
            </SearchFiltersCont>

            <SearchFiltersCont className={`filters_cont ${isFilterMenuOpen ? '' : 'close'}`}>
                <CategoryTitle>Movie</CategoryTitle>
                {filterCategories.map((cat, i) => (
                    <ExpandableFilter key={i} title={cat.title} category={cat.category} data={cat.data} />
                ))}
            </SearchFiltersCont>
        </FiltersWrapper>
    );
}

const FiltersWrapper = styled.div`
    position: relative;
`;

const SearchFiltersCont = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;

    .search_bar_wrapper:first-child {
        margin-bottom: 15px;
    }

    .search_bar_wrapper {
        @media (max-width: 768px) {
            &.close {
                display: none;
            }
        }
    }

    @media (min-width: 1201px) {
        ${(props: { marginBottom?: boolean }) =>
            props.marginBottom &&
            css`
                margin-bottom: 15px;
            `}
    }

    &.search_inputs_cont {
        @media (max-width: 768px) {
            background-color: transparent;
            &.open {
                background-color: white;
            }
        }
    }

    &.filters_cont {
        @media (max-width: 1200px) {
            display: flex;
            justify-content: space-evenly;
            padding: 0 20px 10px 20px;
        }
        @media (max-width: 1025px) {
            justify-content: space-between;
        }
        @media (max-width: 768px) {
            &.close {
                display: none;
            }
        }
        @media (max-width: 576px) {
            flex-direction: column;
        }
    }
`;

const CategoryTitle = styled.h4`
    margin: 0 0 8px 0;
    @media (max-width: 1200px) {
        display: none;
    }
`;

const SearchBarWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const FilterIconButton = styled.button`
    display: none;
    align-items: center;
    padding: 5.5px 0;
    margin: 0 0 15px 16px;
    border: 0;
    border-bottom: 2px solid;
    color: ${primaryColor};
    background-color: transparent;
    cursor: pointer;

    @media (max-width: 768px) {
        display: flex;
    }
`;
