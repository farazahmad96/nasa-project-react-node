const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

mongoose.set('strictQuery', false);
const MONGO_URL = 'mongodb+srv://nasa-api:C66SCVe8m8eX7iMm@cluster0.myfome9.mongodb.net/nasa?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function startServer() {
    await mongoose.connect(MONGO_URL, {
    });
    loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listinng of port ${PORT}...`);
    });
}

startServer();
//....