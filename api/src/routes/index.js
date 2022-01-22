const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGameRouter = require('./videogame.js');
const videoGamesRouter = require('./videogames.js');
const genresRouter = require('./genres.js');

const router = Router();
router.use('/videogames', videoGamesRouter);
router.use('/videogame', videoGameRouter);
router.use('/genres', genresRouter);


module.exports = router;