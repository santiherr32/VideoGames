import axios from 'axios';
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME';
export const GET_VIDEOGAMES_BY_ID = 'GET_VIDEOGAMES_BY_ID';
export const FILTER_VIDEOGAMES = 'FILTER_VIDEOGAMES';
export const SORT_VIDEOGAMES = 'SORT_VIDEOGAMES';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const CREATE_NEW_VIDEOGAME = 'CREATE_NEW_VIDEOGAME';
export const GET_GENRES = 'GET_GENRES';
const GLOBAL_URL = 'http://localhost:3001';
const VIDEOGAMES_URL = 'http://localhost:3001/videogames';


function getAllVideogames() {
    return async function (dispatch) {
        try {
            const videogames = (await axios.get(`${VIDEOGAMES_URL}/`)).data;

            dispatch({
                type: GET_ALL_VIDEOGAMES,
                payload: videogames,
            })
        } catch (error) {
            dispatch({
                type: GET_ALL_VIDEOGAMES,
                payload: error,
            })
        }
    }
}

function getVideogamesByName(name) {
    return async function (dispatch) {
        try {
            const videogames = (await axios.get(`${VIDEOGAMES_URL}?name=${name}`)).data;
            dispatch({
                type: GET_VIDEOGAMES_BY_NAME,
                payload: videogames,
            })
        } catch (error) {
            dispatch({
                type: GET_VIDEOGAMES_BY_NAME,
                payload: error,
            })
        }
    }
}

function getVideogamesById(id) {
    return async function (dispatch) {
        const actionType = GET_VIDEOGAMES_BY_ID;
        try {
            const videogame = (await axios.get(`${GLOBAL_URL}/videogame/${id}`)).data;

            dispatch({
                type: actionType,
                payload: videogame,
            })
        } catch (error) {
            dispatch({
                type: actionType,
                payload: error,
            })
        }
    }
}

function filterVideogames(types) {
    return function (dispatch) {
        const actionType = FILTER_VIDEOGAMES;
        dispatch({
            type: actionType,
            payload: types,
        })
    }
}

function createNewVideogame(videogame) {
    const actionType = CREATE_NEW_VIDEOGAME;
    return async function (dispatch) {

        const newVideogame = (await axios.post(`${GLOBAL_URL}/videogame`, {
            name: videogame.name,
            description: videogame.description,
            rating: videogame.rating,
            released: videogame.released,
            genres: videogame.genres,
            platforms: videogame.platforms,
        })).data;
        dispatch({
            type: actionType,
            payload: newVideogame,
        })
    }
}

function getGenres() {
    return async function (dispatch) {
        const actionType = GET_GENRES;
        try {
            const GENRES = (await axios.get(`${GLOBAL_URL}/genres`)).data;

            dispatch({
                type: actionType,
                payload: GENRES,
            })
        } catch (error) {
            dispatch({
                type: actionType,
                payload: error,
            })
        }
    }
}

function sortVideogames(sort) {
    return function (dispatch) {
        const actionType = SORT_VIDEOGAMES;
        dispatch({
            type: actionType,
            payload: sort,
        })
    }
}

export {
    getVideogamesByName,
    getVideogamesById,
    getAllVideogames,
    filterVideogames,
    getGenres,
    sortVideogames,
    createNewVideogame,
}