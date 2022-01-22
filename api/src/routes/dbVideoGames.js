const { Videogame, Genre, Op } = require('../db.js');

async function getDbVideogames(videogame) {
    let dbVideoGames = [];
    //Check if given videogame value corresponds to an id
    if (videogame && (/(\d+)-/g).test(videogame)) {
        const dbSingleVideoGame = await Videogame.findByPk(videogame, {
            include: [
                {
                    model: Genre,
                    as: 'genres',
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            ],
        });

        if (dbSingleVideoGame) {
            dbVideoGames = [{
                id: dbSingleVideoGame.id,
                name: dbSingleVideoGame.name,
                genres: dbSingleVideoGame.genres.map(g => g.name),
                description: dbSingleVideoGame.description.replace(/<[^>]*>?/g, ''),
                released: dbSingleVideoGame.released,
                rating: dbSingleVideoGame.rating,
                platforms: dbSingleVideoGame.platforms.map(p => p.platform)
            }];
        }

    } else if (videogame) {
        const dbFoundVideoGames = await Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${videogame.toLowerCase()}%`
                }
            },
            include: {
                model: Genre,
                as: 'genres',
                attributes: ['name'],
                through: { attributes: [] }
            }
        });

        dbVideoGames = dbFoundVideoGames.map(r => {
            return {
                id: r.id,
                name: r.name,
                genres: r.genres.map(g => g.name),
                description: r.description.replace(/<[^>]*>?/g, ''),
                released: r.released,
                rating: r.rating,
                platforms: r.platforms.map(p => p.platform),
            }
        });
    } else {
        const dbFoundVideoGames = await Videogame.findAll({
            include: {
                model: Genre,
                as: 'genres',
                attributes: ['name'],
                through: { attributes: [] }
            }
        });

        dbVideoGames = dbFoundVideoGames.map(r => {
            return {
                id: r.id,
                name: r.name,
                genres: r.genres.map(g => g.name),
                description: r.description.replace(/<[^>]*>?/g, ''),
                released: r.released,
                rating: r.rating,
                platforms: r.platforms.map(p => p.platform),
            }
        });
    }
    return dbVideoGames;
}

module.exports = getDbVideogames;