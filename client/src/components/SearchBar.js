import './SearchBar.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogamesByName, getAllVideogames } from '../actions/actions';

function SearchBar() {
    const [searchInput, setSearchInput] = useState([]);
    const videogames = useSelector(state => state.videogames);
    const [dispatched, setDispatched] = useState(false);
    const dispatch = useDispatch();

    function handleChange(e) {
        const input = e.target.value;
        setSearchInput((prevInput) => input);
    }

    function clearSearch(e) {
        setSearchInput((prevInput) => []);
        dispatch(getAllVideogames());
        setDispatched(true);
    }

    function searchVideogame(e) {
        var key = e.keyCode || e.which;
        if (key === 13) {
            e.preventDefault();
            dispatch(getVideogamesByName(searchInput));
            setDispatched(true);
        } else {
            setDispatched(false);
        }
    }
    // function setActive(e) {
    //     document.querySelector('.search').classList.add('active');
    // }

    // function removeActive(e) {
    //     if (e.target.value.length === 0)
    //         document.querySelector('.search').classList.remove('active');
    // }
    useEffect(() => {
        // console.log(searchInput);
        // console.log(videogames);
        if (dispatched) {
            if (videogames.length) {
                console.log('videogames retrieved')
            }
        }
    }, [videogames, dispatched])

    return (
        <form className="search-box"
            onSubmit={searchVideogame}
            onBlur={() => setDispatched(false)}>
            <input type="text" placeholder="Search a videogame" value={searchInput}
                onChange={handleChange} onKeyPress={searchVideogame} />
            <button type="reset" onClick={clearSearch}></button>
        </form>
    )
}

export default SearchBar;