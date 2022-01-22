import './Videogame.css';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';

function Videogame({ videogameToShow }) {
    const videogameDefaultImage = 'https://i.imgur.com/bRBeU5c.png';

    return (
        <article key={videogameToShow.id} className='videogame'>
            <Link to={`/videogames/${videogameToShow.id}`}>
                <section className='videogame__section videogame__picture-section'>
                    <img
                        className='videogame__image'
                        src={videogameToShow.image || videogameDefaultImage}
                        alt={`${videogameToShow.name} videogame name`} />
                </section>
                <section key={nanoid()} className='videogame__section videogame__details-section'>
                    <header>{videogameToShow.name}</header>
                    <p>{videogameToShow.rating}</p>
                    <div className='genres'>
                        {videogameToShow?.genres?.map((genre, j) =>
                            <div className='genre' key={j}>
                                {genre}
                            </div>
                        )}
                    </div>
                </section>
            </Link>
        </article>
    )
};

export default Videogame;