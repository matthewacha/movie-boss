import styled from 'styled-components';

import { primaryColor } from '../../styles/colors';
import { Movie, OptionType } from '../../types';

interface Props {
    movie: Movie;
    genres: OptionType | undefined;
}

export default function MovieItem({ movie, genres }: Props) {
    const generateGenresList = (id: number, index: number) =>
        genres ? `${genres[id]} ${index !== movie.genre_ids.length - 1 ? '| ' : ''}` : '';

    return (
        <MovieItemWrapper>
            <LeftCont>
                {movie.poster_path ? (
                    <Poster src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt="Movie poster" />
                ) : (
                    <DummyPoster />
                )}
            </LeftCont>
            <RightCont>
                <VoteAvg>{movie.vote_average}</VoteAvg>
                <div>
                    <Title>{movie.title}</Title>
                    {movie.genre_ids.map((id, i) => (
                        <Genres key={id}>{generateGenresList(id, i)}</Genres>
                    ))}
                    <Overview>{movie.overview}</Overview>
                </div>
                <ReleseDate>{movie.release_date}</ReleseDate>
            </RightCont>
        </MovieItemWrapper>
    );
}

const MovieItemWrapper = styled.div`
    position: relative;
    background-color: white;
    border-radius: 5px;
    padding: 20px;
    margin: 15px 0;
    display: flex;
    @media (max-width: 576px) {
        flex-direction: column;
    }
`;

const LeftCont = styled.div`
    display: inline-block;
`;

const RightCont = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    @media (max-width: 576px) {
        margin-left: 0;
    }
`;

const Title = styled.h2`
    font-size: 1.4em;
    margin: 0;
    max-width: 270px;
    @media (max-width: 576px) {
        margin-top: 8px;
        max-width: 100%;
    }
`;

const Overview = styled.p`
    font-size: 0.9em;
`;

const VoteAvg = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 25px;
    border-radius: 5px;
    background-color: ${primaryColor};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Genres = styled.span`
    color: ${primaryColor};
    font-size: 0.8em;
    margin: 0;
`;

const ReleseDate = styled.p`
    color: ${primaryColor};
    font-size: 0.9em;
    margin: 0;
`;

const Poster = styled.img`
    height: 250px;
    width: 180px;
`;

const DummyPoster = styled.div`
    height: 250px;
    width: 180px;
    border-radius: 2px;
    background-color: #d3d3d366;
`;
