
const local = 'local';
const staging = 'staging';
const production = 'production';
const ENVIRONMENT = local;

let urls = {};

switch (ENVIRONMENT) {
  case local:
    urls = {
      BASE_URL: 'http://www.omdbapi.com/',
      // BASE_URL: 'http://localhost:1337/',
      CLIENT_ENV: 'localhost:3000'
    };
    break;
  case staging:
    urls = {
      BASE_URL: 'https://api.themoviedb.org/3/',

      CLIENT_ENV: 'localhost:3000'
    };
    break;
  case production:
    urls = {
      BASE_URL: 'https://api.themoviedb.org/3/',
      CLIENT_ENV: 'localhost:3000'
    };
    break;
  default:
    break;
}

export const BASE_URL = urls.BASE_URL;
export const IMAGE_BASE_URL = urls.IMAGE_BASE_URL;
export const CLIENT_ENV = urls.CLIENT_ENV; //local
export const API_KEY = '566a3ce2';
export const ACTIONS = {
  GET: 'get',
  POST: 'post',
  UPDATE: 'update',
  DELETE: 'delete'
};

export const ENDPOINTS = {

  // GET_MOVIE_DETAIL: 'movie/',
  // SEARCH_MOVIES: 'search/movie',
  GET_MOVIE_DETAIL: '',
  SEARCH_MOVIES: '',
};
