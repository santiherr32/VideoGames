const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const router = Router();
const API_GENRES_URL = `https://api.rawg.io/api/genres`;
const axios = require('axios').default;
const { Genre } = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const apiGenresResults = (await axios.get(`${API_GENRES_URL}?key=${API_KEY}`)).data.results;
        const dbGenres = await Genre.findAll();

        if (Array.isArray(apiGenresResults) && apiGenresResults.length) {
            const genres = apiGenresResults.map((vg) => {
                return ({
                    id: vg.id,
                    name: vg.name,
                })
            })
            if (genres.length) {
                try {
                    const dbGenres = await Genre.findAll();
                    if (!dbGenres.length) {
                        const created = await Genre.bulkCreate(genres);
                        created && res.json(genres);
                    } else {
                        res.json(dbGenres)
                    }
                } catch (createError) {
                    next(createError);
                }
            }
        } else { res.json('No genres found') }
    } catch (apiError) {
        try {
            const dbGenres = await Genre.findAll();
            if (!dbGenres.length) res.json('No genres found')
            else res.json(dbGenres);
        } catch (dbError) {
            next(`${apiError} \n ${dbError}`);
        }
    }
});

module.exports = router;
