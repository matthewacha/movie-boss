import styled from 'styled-components';
import { Movie, OptionType } from '../../types';

import MovieItem from '../movieitem';
interface Props {
    movies: Movie[];
    genres: OptionType | undefined;
}

export default function MovieList({ movies, genres }: Props) {
    return (
        <MoviesWrapper>
            {movies.map((movie, i) => (
                <MovieItem key={i} movie={movie} genres={genres} />
            ))}
        </MoviesWrapper>
    );
}

const MoviesWrapper = styled.div`
    position: relative;
`;
