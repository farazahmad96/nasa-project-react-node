const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const planets = require('./planets.mongo');

const habitablePlanet = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    // habitablePlanet.push(data);
                    // TODO: Replace below creat with upsert = insert + update
                    // await planets.create({
                    //     keplerName: data.kepler_name,
                    // });
                }
            })
            .on('error', (err) => {
                console.log('on error');
                console.log(err);
                reject(err);
            })
            .on('end', () => {
                console.log(`${habitablePlanet.length} habitable planets found`);
                resolve();
            });

    });
}

function getAllPlanets() {
    return planets.find({});
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
};