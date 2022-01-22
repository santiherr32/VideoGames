import './Home.css';
import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import Videogames from '../components/Videogames';
import Filters from '../components/Filters';
import Sorting from '../components/Sorting';
import Pagination from '../components/Pagination';

function Home() {
    const [currPage, setCurrPage] = useState(1);
    const [numVideogamesPerPage] = useState(15);

    function toggleFilters() {
        const filtersSet = document.querySelector('.filters-set');
        if (filtersSet.classList.contains('hidden')) {
            filtersSet.classList.remove('hidden');
            filtersSet.classList.add('visible');
        } else if (filtersSet.classList.contains('visible')) {
            filtersSet.classList.remove('visible');
            filtersSet.classList.add('hidden');
        } else { return }
    }

    return (
        <main className="home">
            <section className='home_top-bar'>
                <Logo></Logo>
                <SearchBar></SearchBar>
            </section>
            <section className='home_selectors'>
                <button className='show-filters-btn' onClick={toggleFilters}>
                    <span>Filters</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 74 74" height="34" width="34">
                        <circle strokeWidth="3" stroke="black" r="35.5" cy="37" cx="37"></circle>
                        <path fill="black" d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"></path>
                    </svg>
                </button>
                <Sorting></Sorting>
            </section>
            <Filters currPage={currPage} setCurrPage={setCurrPage}></Filters>
            <Videogames currPage={currPage} numVideogamesPerPage={numVideogamesPerPage}></Videogames>
            <Pagination currPage={currPage} setCurrPage={setCurrPage} numVideogamesPerPage={numVideogamesPerPage}></Pagination>
            <Link to='/create' id='home_create-btn'>
                <span>Create new videogame</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 74 74" height="34" width="34">
                    <circle strokeWidth="3" stroke="white" r="35.5" cy="37" cx="37"></circle>
                    <path fill="white" d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"></path>
                </svg>
            </Link>
        </main>
    );
}

export default Home;