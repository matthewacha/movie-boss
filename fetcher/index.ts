// TODO: All of your API requests should be in this file
// See the README file for more information about the APIs you would need to use
import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

import { MoviesResponse, GenresResponse, ErrorResponse, AxiosMethods, UseAxiosRes, UseGetMoviesRes, UseGetGenresRes } from '../types';
import { formatParams } from '../utils';

const baseUrl = process.env.REACT_APP_BASE_URL || 'https://api.themoviedb.org/3';
const defaultError = 'Error, please try again later';

//Setting token for all axios requests
axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODFmMmVkMDg4NWIyODVlNzg0MmI3ZjQ3Y2FkNzY3NiIsInN1YiI6IjYyN2FjNDczZDQwMGYzMTBiYjljMTQ2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICszC3ZeooYKJEDRao3JYvO0s601xjVhoQodhcucAHE`;

//Defining interceptors callbacks in order to normalize both the successful and the error response
axios.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error: AxiosError<ErrorResponse>) => Promise.reject(error?.response?.data?.status_message || defaultError)
);

/**
 * Custom hook to fetch popular movies
 * @param options.page Current page number.
 * @param options.query A text query to search.
 * @param options.year The movie release year
 */
export const useGetMovies = (page: number, query?: string, year?: number): UseGetMoviesRes => {
    const endpoint = query || year ? '/search/movie' : '/movie/popular';
    const options = query || year ? { page, query, year } : { page };
    const { data, error, loading } = useAxios<MoviesResponse>(endpoint, AxiosMethods.GET, undefined, options);
    return {
        movies: data?.results,
        totalCount: data?.total_results,
        pagesCount: data?.total_pages,
        moviesError: error,
        moviesLoading: loading,
    };
};

/**
 * Custom hook to fetch genres list
 */
export const useGetGenres = (): UseGetGenresRes => {
    const { data, error, loading } = useAxios<GenresResponse>('/genre/movie/list', AxiosMethods.GET);
    return { genres: data?.genres, genresError: error, genresLoading: loading };
};

/**
 * Custom hook to do axios requests'
 * @param url The endpoint url.
 * @param method The request method 'get' | 'post' | 'patch' | 'delete'.
 * @param payload The data to send with the request
 * @param paramsObj Params object. Every parameter will be formatted to '&{key}={value}'
 */
function useAxios<T, P = {}>(url: string, method: AxiosMethods, payload?: P, paramsObj?: {}): UseAxiosRes<T> {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const params = paramsObj && JSON.stringify(paramsObj);

    useEffect(() => {
        (async () => {
            setError(undefined);
            setLoading(true);
            try {
                const queryStr = params ? formatParams(JSON.parse(params)) : '';
                const response: T = await axios[method](`${baseUrl}${url}?${queryStr}`, payload);
                setData(response);
                setLoading(false);
            } catch (error: any) {
                setLoading(false);
                setError(error);
            }
        })();
    }, [url, method, payload, params]);

    return { data, error, loading };
}
