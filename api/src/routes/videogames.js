const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const router = Router();
const API_GAME_URL = `https://api.rawg.io/api/games`;
const axios = require('axios').default;
const getDbVideogames = require('./dbVideoGames');

router.get('/', async (req, res, next) => {
    const { name } = req.query;
    let videoGames;

    if (!name) {
        try {
            const apiVideoGamesOnFirstPage = (await axios.get(`${API_GAME_URL}?&page=1&page_size=100&key=${API_KEY}`)).data.results;
            const apiVideoGamesOnSecondPage = (await axios.get(`${API_GAME_URL}?&page=2&page_size=100&key=${API_KEY}`)).data.results;
            const apiVideoGamesOnThirdPage = (await axios.get(`${API_GAME_URL}?&page=3&page_size=100&key=${API_KEY}`)).data.results.slice(0, 20);

            const allApiVideoGames = [...apiVideoGamesOnFirstPage, ...apiVideoGamesOnSecondPage, ...apiVideoGamesOnThirdPage];

            if (Array.isArray(allApiVideoGames) && allApiVideoGames.length) {
                videoGames = allApiVideoGames.map((vg) => {
                    return ({
                        id: vg.id,
                        name: vg.name,
                        rating: vg.rating,
                        genres: vg.genres.map(g => g.name),
                        image: vg?.background_image,
                        platforms: vg?.platforms.map(p => ({
                            id: p.platform.id,
                            name: p.platform.name,
                        }))
                    })
                })

                try {
                    const dbVideoGames = await getDbVideogames();
                    const allVideoGames = dbVideoGames.length ? [...videoGames, ...dbVideoGames] : videoGames;

                    if (!allVideoGames.length) next('No videogames found')
                    else res.json(allVideoGames);
                } catch (dbError) {
                    next(dbError)
                }
            }
        } catch (apiError) {
            try {
                const dbVideoGames = await getDbVideogames();

                if (!dbVideoGames.length) next('No videogames found')
                else res.json(dbVideoGames);
            } catch (dbError) {
                next(`${apiError} \n ${dbError}`)
            }
        }
    } else {
        try {
            const apiGameResults = (await axios.get(`${API_GAME_URL}?search=${name.toString()}&page_size=15&key=${API_KEY}`)).data.results;
            // apiGameResults = apiGameResults.slice(0, 15);

            if (Array.isArray(apiGameResults) && apiGameResults.length) {
                videoGames = apiGameResults.map((vg) => {
                    return ({
                        id: vg.id,
                        name: vg.name,
                        rating: vg.rating,
                        genres: vg.genres.map(g => g.name),
                        image: vg?.background_image,
                    })
                })
                res.json(videoGames);
            } else { res.json('No videogame matches that name') }
        } catch (error) {
            try {
                const dbVideoGames = await getDbVideogames(name.toString());

                if (!dbVideoGames.length) next('No videogames found')
                else res.json(dbVideoGames);
            } catch (dbError) {
                next(`${apiError} \n ${dbError}`)
            }
        }
    }
});

module.exports = router;