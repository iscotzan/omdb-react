import { SEARCH_MOVIES, GET_MOVIE_DETAIL, SET_SELECTED_MOVIE } from './Movies.actionTypes';

const initialState = {
    isAuth: false,
    user: {},
    isLoading: false,
    isError: false,
    data: {
        items: [],
        page: 1,
        item: {}
    }
}
export default (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type) {

        case SEARCH_MOVIES.START:
            return { ...state, status: 'start', isLoading: true, isError: false }
        case SEARCH_MOVIES.SUCCESS:
            // console.log('auth success!');
            return { ...state, status: 'success', isLoading: false, isError: false, data: { ...state.data, items: action.payload.Search } };
        case SEARCH_MOVIES.FAIL:
            return { ...state, isError: action.payload, status: 'fail', isLoading: false, data: { ...state.data, items: [] } }

        case GET_MOVIE_DETAIL.START:
            return { ...state, status: 'start', isLoading: true, isError: false }
        case GET_MOVIE_DETAIL.SUCCESS:
            return { ...state, status: 'success', isLoading: false, isError: false, data: { ...state.data, item: action.payload } };
        case GET_MOVIE_DETAIL.FAIL:
            return { ...state, isError: action.payload, status: 'fail', isLoading: false }

        case SET_SELECTED_MOVIE:
            console.log('set selected movie ', action.payload)
            return { ...state, status: 'success', isLoading: false, isError: false, data: { ...state.data, item: action.payload } }

        default:
            return state;
    }
}