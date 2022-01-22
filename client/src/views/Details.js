import './Details.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getVideogamesById } from '../actions/actions';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import LoadingDots from '../components/LoadingDots';

function Details(params) {
    const { videogameId } = useParams();
    console.log(videogameId);
    const dispatch = useDispatch();
    const singleVideogame = useSelector(state => state.singleVideogame);
    const isLoading = useSelector(state => state.isLoading);
    const videogameDefaultImage = 'https://i.imgur.com/bRBeU5c.png';

    useEffect(() => {
        dispatch(getVideogamesById(videogameId))
    }, [videogameId, dispatch])
    console.log(singleVideogame)

    if (isLoading) {
        return (
            <LoadingDots></LoadingDots>
        )
    } else {
        return (
            <main className="details">
                {singleVideogame
                    ?
                    (
                        <article className='details__videogame' key={nanoid(10)}>
                            <section className='details__videogame-picture'>
                                <img
                                    className='details__videogame-picture__img'
                                    src={singleVideogame?.image || videogameDefaultImage}
                                    alt={`${singleVideogame.name || singleVideogame[0].name} videogame poster`} />
                            </section>
                            <section className='details__videogame-info'>
                                <header>
                                    <h2>{singleVideogame.name || singleVideogame[0].name}</h2>
                                </header>
                                <p style={{ fontWeight: '500' }}> Rating: {singleVideogame.rating || singleVideogame[0].rating}</p>
                                <p style={{ fontWeight: '500' }}> Released on: {singleVideogame.released || singleVideogame[0].released}</p>
                                <div className='details__videogame-info__genres'>
                                    {singleVideogame.genres
                                        ? singleVideogame.genres.map((genre, j) =>
                                            <div
                                                key={j}
                                                type='1'
                                                className='details__videogame-info__genre'>
                                                {genre}
                                            </div>
                                        )
                                        : singleVideogame[0].genres.map((genre, j) =>
                                            <div
                                                key={j}
                                                type='1'
                                                className='details__videogame-info__genre'>
                                                {genre}
                                            </div>)
                                    }
                                </div>
                            </section>
                            <section className='details__videogame-description'>
                                <h3>Description: </h3>
                                <p>{singleVideogame.description || singleVideogame[0].description}</p>
                            </section>
                            <section className='details__videogame-platforms'>
                                <h2>Platforms: </h2>
                                <div className='details__videogame-platforms__platforms-list'>
                                    {singleVideogame.platforms
                                        ? singleVideogame.platforms.map((platform, j) => {
                                            return (
                                                <div
                                                    key={j}
                                                    className='details__videogame-platforms__platform-item'
                                                >
                                                    {platform}
                                                </div>)
                                        })
                                        : singleVideogame[0].platforms.map((platform, j) => {
                                            return (
                                                <div
                                                    key={j}
                                                    className='details__videogame-platforms__platform-item'
                                                >
                                                    {platform}
                                                </div>)
                                        })}
                                </div>
                                <p></p>
                            </section>
                        </article>
                    )
                    : singleVideogame
                }
            </main>
        );
    }
}

export default Details;