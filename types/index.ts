export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export type Genre = {
    id: number;
    name: string;
};

export interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface GenresResponse {
    genres: Genre[];
}

export interface ErrorResponse {
    status_message: string;
    success?: boolean;
    status_code: number;
}

export type OptionType = { [key: number | string]: number | string };

export enum AxiosMethods {
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    DELETE = 'delete',
}

export interface UseAxiosRes<T> {
    data: T | undefined;
    error: string | undefined;
    loading: boolean;
}

export interface UseGetMoviesRes {
    movies: Movie[] | undefined;
    totalCount: number | undefined;
    pagesCount: number | undefined;
    moviesError: string | undefined;
    moviesLoading: boolean;
}

export interface UseGetGenresRes {
    genres: Genre[] | undefined;
    genresError: string | undefined;
    genresLoading: boolean;
}

export interface FilterOptions {
    id: number | string;
    name: number | string;
}

export interface SearchOptions {
    keyword: string;
    year: number;
}
