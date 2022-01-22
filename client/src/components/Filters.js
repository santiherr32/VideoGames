import './Filters.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterVideogames, getGenres } from '../actions/actions';

function Filters({ currPage, setCurrPage }) {
    const [currCheckboxes, setCurrCheckboxes] = useState([]);
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    // const isLoading = useSelector(state => state.isLoading);
    const [isFiltersButtonPressedCounter, setIsFiltersButtonPressedCounter] = useState(0);

    function clearAllFilters() {
        document.getElementsByName('genre').forEach(e => e.checked = false);
        setCurrCheckboxes([]);
        setCurrPage((prevCurrPage) => 1);
    }

    function handleChange(e) {
        const controlSelected = e.target.id;

        if (!(currCheckboxes.includes(controlSelected))) {
            setCurrCheckboxes([
                ...currCheckboxes,
                e.target.id,
            ]);
        } else {
            console.log('running')
            let filteredCurrentGenreTypes = currCheckboxes.filter(checkbox => checkbox !== controlSelected);
            setCurrCheckboxes(filteredCurrentGenreTypes);
        }
    }

    let counter = 0;
    useEffect(() => {
        document.querySelector('.show-filters-btn').addEventListener('click', () => {
            counter++;
            setIsFiltersButtonPressedCounter((prevCounter) => counter);
        })
    }, [isFiltersButtonPressedCounter, counter]);

    useEffect(() => {
        if (currCheckboxes.length) {
            console.log('not empty')
            dispatch(filterVideogames(currCheckboxes));
        } else if (!currCheckboxes.length && isFiltersButtonPressedCounter > 0) {
            console.log('empty')
            dispatch(filterVideogames());
        }
    }, [dispatch, currCheckboxes, isFiltersButtonPressedCounter]);

    useEffect(() => {
        dispatch(getGenres());
        document.querySelector('.search-box').addEventListener('click',
            () =>
                document.getElementsByName('genre').forEach(e =>
                    e.checked = false
                )
        )
    }, [dispatch])

    return (
        <section className='filters'>
            <form >
                <fieldset className='filters-set hidden'>
                    <legend>Select type of genres:</legend>
                    {Array.isArray(genres) && genres.length
                        ? genres.map((genre) => {
                            return (
                                <div key={genre.id}>
                                    <input type='checkbox'
                                        name='genre'
                                        id={genre.name}
                                        onChange={handleChange}></input>
                                    <label htmlFor={genre.name}>
                                        {genre.name}
                                    </label>
                                </div>
                            )
                        })
                        : genres}
                    <input type='button'
                        name='genre'
                        id='clear-filters-btn'
                        onClick={clearAllFilters}
                        value='Clear all'></input>
                </fieldset>
            </form>
        </section>
    )
};

export default Filters;