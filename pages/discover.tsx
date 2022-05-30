import { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import { fontColor, primaryColor } from '../styles/colors';
import ArrowImage from '../assets/images/arrow-icon.png';
import { useGetMovies, useGetGenres } from '../fetcher';
import { parseArrayToDictionary } from '../utils';
import { Movie, Genre, FilterOptions, SearchOptions } from '../types';

import SearchFilters from '@/components/searchfilter';
import MovieList from '@/components/movielist';
import Loader from '@/components/loader';
import Alert from '@/components/alert';
import InfiniteScroll from '@/components/infinite-scroll';

const ratingOptions: FilterOptions[] = [
    { id: 7.5, name: 7.5 },
    { id: 8, name: 8 },
    { id: 8.5, name: 8.5 },
    { id: 9, name: 9 },
    { id: 9.5, name: 9.5 },
    { id: 10, name: 10 },
];

const languageOptions: FilterOptions[] = [
    { id: 'GR', name: 'Greek' },
    { id: 'EN', name: 'English' },
    { id: 'RU', name: 'Russian' },
    { id: 'PO', name: 'Polish' },
];

const searchOptions: SearchOptions = {
    keyword: '',
    year: 0,
};

export default function Discover() {
    const mounted = useRef<boolean>(false);
    const [search, setSearch] = useState<SearchOptions>({
        keyword: '',
        year: 0,
    });
    const [page, setPage] = useState(1);
    const [moviesList, setMoviesList] = useState<Movie[]>([]);
    const {
        movies,
        totalCount = 0,
        pagesCount,
        moviesError,
        moviesLoading,
    } = useGetMovies(page, searchOptions.keyword, searchOptions.year);
    const { genres } = useGetGenres();

    //Updates state on input change and resets the year to 0 if keyword as no value, inorder to avoid sending a search call without keyword
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === 'keyword' && value === '') {
            setSearch({
                keyword: '',
                year: 0,
            });
        } else {
            setSearch({ ...search, [name]: value });
        }
    };

    const handlePageChange = useCallback(() => {
        setPage((prev) => prev + 1);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    /**
     * Detects either a keyword or year change and assigns the value to the searchOption object in order to trigger the search async call.
     * The timeout is needed to avoid a call every keystroke. Is also checking if it's the first render via the mounted ref, in order to avoid
     * a double call fetching the movies on first render
     */
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (mounted.current) {
            timeout = setTimeout(() => {
                setMoviesList([]);
                setPage(1);
                searchOptions.keyword = search.keyword;
                searchOptions.year = search.year;
            }, 600);
        }

        return () => clearTimeout(timeout);
    }, [search]);

    /**
     * It detects changes in the movies parameter and, in case movies is defined merges the movies with the moviesList array.
     * It also sets the mouted ref to true on first render
     */
    useEffect(() => {
        if (movies?.length) setMoviesList((prev) => [...prev, ...movies]);
        if (!mounted.current) mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, [movies]);

    return (
        <DiscoverWrapper>
            <Alert visible={!!moviesError}>{moviesError}</Alert>
            <MovieFilters>
                <SearchFilters
                    genres={genres}
                    ratings={ratingOptions}
                    languages={languageOptions}
                    keyword={search.keyword}
                    handleInputChange={handleInputChange}
                />
            </MovieFilters>
            <TotalCount>{totalCount} movies</TotalCount>
            <MovieResults>
                <MovieList movies={moviesList} genres={parseArrayToDictionary<Genre>(genres, 'id', 'name')} />
            </MovieResults>
            <LoaderWrapper>{moviesLoading && <Loader />}</LoaderWrapper>
            {/* Renders conditionally the InfiniteScroll component in order to avoid setting to next page and triggering the useGetMovies hook */}
            {movies && movies.length > 1 && !moviesError && pagesCount && page < pagesCount && !moviesLoading && (
                <InfiniteScroll handlePageChange={handlePageChange} />
            )}
            <ScrollToTopButton onClick={scrollToTop}>
                <ArrowIcon src={ArrowImage} alt="Arrow pointing up" />
            </ScrollToTopButton>
        </DiscoverWrapper>
    );
}

const DiscoverWrapper = styled.main`
    position: relative;
    padding: 35px;

    @media (max-width: 1200px) {
        padding: 15px;
    }
`;

const MovieResults = styled.div`
    display: inline-block;
    width: calc(100% - 295px);
    @media (max-width: 1200px) {
        width: 100%;
    }
`;

const MovieFilters = styled.div`
    width: 280px;
    float: right;
    margin-top: 35px;
    @media (max-width: 1200px) {
        width: 100%;
        margin-top: 0;
        float: none;
    }
`;

const TotalCount = styled.p`
    display: block;
    font-size: 0.9em;
    color: ${fontColor}99;
    margin: 0;
    @media (max-width: 1200px) {
        margin-top: 15px;
    }
`;

const LoaderWrapper = styled.div`
    width: 100%;
    min-height: 35px;
    display: flex;
    margin: 32px 0;
`;

const ScrollToTopButton = styled.button`
    position: fixed;
    width: 50px;
    height: 50px;
    right: 40px;
    bottom: 40px;
    border: 0;
    border-radius: 50%;
    background-color: ${primaryColor};
    color: #ffffff;
    cursor: pointer;
`;

const ArrowIcon = styled(Image)`
    transform: scaleY(-1);
    margin: 2px 2px 0 0;
`;
