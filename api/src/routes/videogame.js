const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const router = Router();
const API_GAME_URL = `https://api.rawg.io/api/games`;
const API_GENRES_URL = `https://api.rawg.io/api/genres`;
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');
const getDbVideogames = require('./dbVideoGames.js');

router.get('/', (req, res, next) => {
    if (!req.body) next('No videogame id was provided');
});

router.get('/:gameId', async (req, res, next) => {
    const { gameId } = req.params;
    try {
        let apiGameResult = (await axios.get(`${API_GAME_URL}/${gameId}?key=${API_KEY}`)).data;

        if (typeof apiGameResult === 'object' && apiGameResult.id === Number(gameId)) {
            const videoGame = {
                id: apiGameResult.id,
                name: apiGameResult.name,
                genres: apiGameResult.genres.map(g => g.name),
                image: apiGameResult.background_image,
                description: apiGameResult.description_raw,
                released: apiGameResult.released,
                rating: apiGameResult.rating,
                platforms: apiGameResult.platforms.map(p => p.platform.name),
            };
            res.json(videoGame);
        } else { res.json('No videogame found with such id') }
    } catch (apiError) {
        try {
            const dbVideoGames = await getDbVideogames(gameId);

            if (!dbVideoGames.length) next('No videogame found with such id')
            else res.json(dbVideoGames);
        } catch (dbError) {
            next(`${apiError}\n${dbError}`)
        }
    }
});

router.post('/', async (req, res, next) => {
    const { name, description, rating, released, genres, platforms } = req.body;
    const newVideoGame = {
        name,
        description,
        rating,
        released,
        platforms,
    }
    let errors = [];
    for (const prop in newVideoGame) {
        if (newVideoGame[prop] === undefined)
            errors.push(`${prop} was not provided`);
    }
    const apiGenres = (await axios.get(`${API_GENRES_URL}?key=${API_KEY}`)).data.results;
    const apiGenresIds = apiGenres.map(genre => genre.id);
    const allGenresAreValid = (genres.every(g => {
        return Number.isInteger(g) && apiGenresIds.includes(g)
    }));
    if (!genres || !allGenresAreValid) {
        errors.push(`At least one Genre is required and must be a valid existing id`);
    }

    if (!errors.length) {
        try {
            const [createdVideoGame, created] = await Videogame.findOrCreate({
                where: { name },
                defaults: newVideoGame,
            })
            if (!created) {
                res.status(400);
                next('A videogame with that name already exists!');
            }
            const fullyCreated = created && await createdVideoGame.addGenre(genres);
            fullyCreated && res.send('Videogame was successfully created!');
        } catch (dbError) {
            next(dbError);
        }
    } else {
        res.status(401);
        next({ Errors: errors });
    }
})

module.exports = router;