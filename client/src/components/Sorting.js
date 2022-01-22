import './Sorting.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortVideogames } from '../actions/actions';

function Sorting() {
    const [sortSelection, setSortSelection] = useState('');
    const dispatch = useDispatch();
    // const recipes = useSelector(state => state.recipes);

    function handleSelectionChange(e) {
        const option = e.target.value;
        setSortSelection(prevSelection => option);
    }

    useEffect(() => {
        console.log(sortSelection);
        if (sortSelection !== '') {
            dispatch(sortVideogames(sortSelection));
        }
    }, [dispatch, sortSelection]);

    return (
        <section className='sorting'>
            <h4>Sort by: </h4>
            <form>
                <select className='sorting_selector'
                    onChange={handleSelectionChange}>
                    <option value='No_sort'>No sort</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                    <option value='rating_ASC'>Rating ASC</option>
                    <option value='rating_DESC'>Rating DESC</option>
                </select>
            </form>
        </section>
    )
};

export default Sorting;