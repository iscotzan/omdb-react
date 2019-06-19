
export const Actions = (type) => ({
    START: `${type}/FETCH_${type}_START`,
    SUCCESS: `${type}/FETCH_${type}_SUCCESS`,
    FAIL: `${type}/FETCH_${type}_FAIL`
});



export const GET_MOVIE_DETAIL = Actions('MOVIE_DETAIL')
export const SEARCH_MOVIES = Actions('SEARCH_MOVIES')
export const SET_SELECTED_MOVIE = "SET_SELECTED_MOVIE"
