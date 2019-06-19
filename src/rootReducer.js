/*
 src/reducers/rootReducer.js
*/
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import {reducer as form} from 'redux-form';
import moviesReducer from './pages/MoviesSearchPage/Movies.reducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    form,
    moviesReducer
});