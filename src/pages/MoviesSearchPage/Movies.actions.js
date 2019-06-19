import { BASE_URL, ENDPOINTS, API_KEY } from './../../common/api/consts';
import { get } from 'axios';
import { SEARCH_MOVIES, GET_MOVIE_DETAIL, SET_SELECTED_MOVIE } from './Movies.actionTypes';

const optionsQuery = `?apikey=${API_KEY}`


export function GO_SEARCH_MOVIES(searchStr, page = 1, type = 'movie') {
    const { START, SUCCESS, FAILED } = SEARCH_MOVIES;
    return async (dispatch) => {
        dispatch({ type: START });
        try {
            const request = await get(BASE_URL + ENDPOINTS.SEARCH_MOVIES + optionsQuery + '&s=' + searchStr + `&page=${page}&type=${type}`);
            // console.log('result: ', request)
            dispatch({ type: SUCCESS, payload: request.data });
        } catch (e) {
            dispatch({ type: FAILED, payload: e });
        }
    };
}

export function GO_GET_MOVIE_DETAILS(id, plot = 'short', page = 1, type = 'movie') {
    const { START, SUCCESS, FAILED } = GET_MOVIE_DETAIL;
    // console.log('going to bring movie ', id, page);
    return async (dispatch) => {
        dispatch({ type: START });
        try {
            const request = await get(BASE_URL + ENDPOINTS.GET_MOVIE_DETAIL + optionsQuery + `&i=${id}&plot=${plot}`);

            dispatch({ type: SUCCESS, payload: request.data });
        } catch (e) {
            dispatch({ type: FAILED, payload: e });
        }
    };
}

export function GO_SET_SELECTED_MOVIE(movie) {
    return async (dispatch) => {
        dispatch({ type: SET_SELECTED_MOVIE, payload: movie });
    };
}
