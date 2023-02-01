const launchesDatabase = require('./launches.mongo');

const launches = new Map(); //lookup flight

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: 'Explorer IS1',
    launchData: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

function getAllLaunches() {
    return Array.from(launches.values());
}

async function saveLaunch(launch) {
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customers: ['Zero to Mastery', 'NASA'],
            flightNumber: latestFlightNumber,
        })
    );
}

function abortLaunchById(launchId) {
    // launches.delete(launchId);
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
}