import {
    GET_VIDEOGAMES_BY_NAME,
    GET_VIDEOGAMES_BY_ID,
    GET_ALL_VIDEOGAMES,
    FILTER_VIDEOGAMES,
    GET_GENRES,
    SORT_VIDEOGAMES,
    CREATE_NEW_VIDEOGAME,
} from "../actions/actions";
const initialState = {
    videogames: [],
    genres: [],
    platforms: [],
    filteredVideogames: [],
    sortedVideogames: [],
    singleVideogame: [],
    resultInfo: '',
    isLoading: true,
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_VIDEOGAMES_BY_NAME:
            return {
                ...state,
                videogames: action.payload,
                sortedVideogames: [],
                filteredVideogames: [],
                singleVideogame: [],
                resultInfo: Array.isArray(state.videogames)
                    ? ''
                    : state.videogames,
            }
        case GET_VIDEOGAMES_BY_ID:
            return {
                ...state,
                singleVideogame: typeof action.payload === 'object'
                    ? action.payload
                    : [],
                resultInfo: typeof action.payload === 'object'
                    ? ''
                    : action.payload,
                isLoading: action.payload ? false : true,
            }
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogames: state.sortedVideogames.length
                    ? state.sortedVideogames
                    : action.payload,
                sortedVideogames: [],
                filteredVideogames: [],
                resultInfo: Array.isArray(state.videogames)
                    ? ''
                    : state.videogames,
                isLoading: state.videogames ? false : true,
            }
        case FILTER_VIDEOGAMES:
            let filterVideogames = [];
            if (!action.payload) {
                filterVideogames = [...state.videogames];
            } else {
                if (Array.isArray(state.videogames) && state.videogames.length) {
                    if (Array.isArray(state.sortedVideogames) && state.sortedVideogames.length) {
                        filterVideogames = state.sortedVideogames.filter((videogame) => {
                            return action.payload.every((genre) => videogame.genres.includes(genre));

                        })
                    } else if (Array.isArray(state.filteredVideogames) && state.filteredVideogames.length) {
                        filterVideogames = state.filteredVideogames.filter((videogame) => {
                            return action.payload.every((genre) => videogame.genres.includes(genre));

                        })
                    } else {
                        filterVideogames = state.videogames.filter((videogame) => {
                            return action.payload.every((genre) => videogame.genres.includes(genre));
                        })
                    }
                }
            }
            return {
                ...state,
                filteredVideogames: !filterVideogames.length
                    ? 'No videogames match'
                    : filterVideogames,
                sortedVideogames: filterVideogames,
                resultInfo: Array.isArray(state.filteredVideogames)
                    ? ''
                    : state.filteredVideogames,
                isLoading: state.filteredVideogames ? false : true,
            }
        case SORT_VIDEOGAMES:
            let sortVideogames, videogamesToSort = [];
            if (Array.isArray(state.filteredVideogames) && state.filteredVideogames.length && state.filteredVideogames !== videogamesToSort) {
                videogamesToSort = [...state.filteredVideogames];
            } else {
                videogamesToSort = [...state.videogames];
            }

            switch (action.payload) {
                case 'A-Z':
                    sortVideogames = videogamesToSort.sort((a, b) => {
                        const videogameAName = a.name.toUpperCase();
                        const videogameBName = b.name.toUpperCase();
                        if (videogameAName < videogameBName) return -1;
                        if (videogameAName > videogameBName) return 1;
                        return 0;
                    });
                    break;
                case 'Z-A':
                    sortVideogames = videogamesToSort.sort((a, b) => {
                        const videogameAName = a.name.toUpperCase();
                        const videogameBName = b.name.toUpperCase();
                        if (videogameAName > videogameBName) return -1;
                        if (videogameAName < videogameBName) return 1;
                        return 0;
                    });
                    break;
                case 'rating_ASC':
                    sortVideogames = videogamesToSort.sort((a, b) => {
                        const videogameARating = a.rating
                        const videogameBRating = b.rating
                        if (videogameARating < videogameBRating) return -1;
                        if (videogameARating > videogameBRating) return 1;
                        return 0;
                    });
                    break;
                case 'rating_DESC':
                    sortVideogames = videogamesToSort.sort((a, b) => {
                        const videogameARating = a.rating
                        const videogameBRating = b.rating
                        if (videogameARating > videogameBRating) return -1;
                        if (videogameARating < videogameBRating) return 1;
                        return 0;
                    });
                    break;
                default:
                    sortVideogames = [];
                    console.log('No sorting');
                    break;
            }
            return {
                ...state,
                sortedVideogames: sortVideogames,
                resultInfo: Array.isArray(state.sortedVideogames)
                    ? ''
                    : state.sortedVideogames,
                isLoading: state.sortedVideogames ? false : true,
            }
        case CREATE_NEW_VIDEOGAME:
            return {
                ...state,
                resultInfo: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;