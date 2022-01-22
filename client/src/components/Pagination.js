import './Pagination.css';
import { useSelector } from 'react-redux';

function Pagination({ currPage, setCurrPage, numVideogamesPerPage }) {
    const videogames = useSelector(state => state.videogames);
    const filteredVideogames = useSelector(state => state.filteredVideogames);
    const sortedVideogames = useSelector(state => state.sortedVideogames);
    let videogamesToPaginate = [];
    if (Array.isArray(videogames) && Array.isArray(filteredVideogames) && Array.isArray(sortedVideogames)) {
        if (!filteredVideogames.length && !sortedVideogames.length && videogames.length) {
            videogamesToPaginate = videogames;
            // console.log('videogames');
        } else if (filteredVideogames.length && filteredVideogames !== videogames) {
            videogamesToPaginate = filteredVideogames;
            // console.log('filtered videogames')
        } else if (sortedVideogames.length && sortedVideogames !== videogames) {
            videogamesToPaginate = sortedVideogames;
            // console.log('sorted videogames')
        } else {
            videogamesToPaginate = videogames;
        }
    } else {
        if (filteredVideogames.length) {
            videogamesToPaginate = filteredVideogames;
        } else if (sortedVideogames.length) {
            videogamesToPaginate = sortedVideogames;
        } else {
            videogamesToPaginate = videogames;
        }
    }

    let totalPages = 1;
    let pageNumbers = [];
    if (Array.isArray(videogamesToPaginate) && numVideogamesPerPage < videogamesToPaginate.length)
        totalPages = Math.ceil(videogamesToPaginate.length / numVideogamesPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <button
                className={currPage === i
                    ? 'pages__number-btn active'
                    : 'pages__number-btn'}
                key={i}
                id={i}
                onClick={(e) => {
                    setCurrPage(prevCurrPage => i);
                }}
            >
                {i}
            </button>)
    }

    return (
        <section className='pages'>
            {currPage > 1
                ? <button
                    className="pages__prev-btn"
                    onClick={() =>
                        setCurrPage(prevCurrPage => prevCurrPage - 1)
                    }
                >Prev
                </button>
                : null}
            {pageNumbers}
            {currPage < totalPages
                ? <button
                    className="pages__next-btn"
                    onClick={() =>
                        setCurrPage(prevCurrPage => prevCurrPage + 1)
                    }
                >Next
                </button>
                : null}
        </section>
    )
};

export default Pagination;