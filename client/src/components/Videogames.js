import './Videogames.css';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames } from '../actions/actions';
import Videogame from './Videogame';
import LoadingDots from './LoadingDots';

function Videogames({ currPage, numVideogamesPerPage }) {
    const videogames = useSelector(state => state.videogames);
    const isLoading = useSelector(state => state.isLoading);
    const filteredVideogames = useSelector(state => state.filteredVideogames);
    const sortedVideogames = useSelector(state => state.sortedVideogames);
    const dispatch = useDispatch();
    const lastVideogame = currPage * numVideogamesPerPage;
    const firstVideogame = lastVideogame - numVideogamesPerPage;
    const currVideogamesToShow = useMemo(() => {
        let currVideogames = [];
        if (Array.isArray(videogames) && Array.isArray(filteredVideogames) && Array.isArray(sortedVideogames)) {
            if (!filteredVideogames.length && !sortedVideogames.length && videogames.length) {
                currVideogames = videogames.slice(firstVideogame, lastVideogame);
                // setCurrVideogamesToShow([...currVideogames]);
                console.log('Videogames')
            } else if (filteredVideogames.length && filteredVideogames !== videogames && !sortedVideogames.length) {
                currVideogames = filteredVideogames.slice(firstVideogame, lastVideogame);
                // setCurrVideogamesToShow([...currFilteredVideogames]);
                console.log('filtered Videogames')
            } else if (sortedVideogames.length && sortedVideogames !== videogames) {
                currVideogames = sortedVideogames.slice(firstVideogame, lastVideogame);
                // setCurrVideogamesToShow([...currSortedVideogames]);
                console.log('sorted Videogames')
            } else {
                // setCurrVideogamesToShow([...videogames]);
                currVideogames = [...videogames]
                console.log('here')
            }
        } else {
            if (filteredVideogames.length) {
                // setCurrVideogamesToShow([...filteredVideogames]);
                currVideogames = filteredVideogames.toString();
            } else if (sortedVideogames.length) {
                // setCurrVideogamesToShow([...sortedVideogames]);
                currVideogames = sortedVideogames.toString();
            } else {
                // setCurrVideogamesToShow([...videogames]);
                currVideogames = videogames.toString();
            }
        }
        return currVideogames;
    }, [videogames, filteredVideogames, sortedVideogames, firstVideogame, lastVideogame]);

    // const retrieveVideogames = useCallback(
    //     () => dispatch(getAllVideogames()),
    //     [dispatch]
    // )

    useEffect(() => {
        dispatch(getAllVideogames());
    }, [dispatch]);

    if (isLoading) {
        return (
            <LoadingDots></LoadingDots>
        )
    } else {
        return (
            <section className='videogames'>
                {(Array.isArray(currVideogamesToShow) && currVideogamesToShow.length)
                    ? currVideogamesToShow.map((videogame, i) => {
                        return (
                            <Videogame
                                videogameToShow={videogame}
                                key={nanoid(10)}
                            >
                            </Videogame>
                        )
                    })
                    : currVideogamesToShow
                }
            </section >
        )
    }
};

export default Videogames;