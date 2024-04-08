import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { config } from './config';
import { dataSource } from './dataSource';
import { buildRouter } from './router';

dotenv.config();

async function runApp() {
    try {
        console.log(`Initializing database...`);
        await dataSource.initialize();
        console.log(`Database initialized!`);
    } catch (error) {
        console.error(error);
    }

    const app = express();

    app.use(bodyParser.json());

    const router = buildRouter(dataSource);
    app.use(router);

    app.get('/', (_, res) => {
        console.log('GET /');
        res.sendStatus(200);
    });

    app.listen(config.SERVER_PORT, () => {
        console.log(`Server is running at http://localhost:${config.SERVER_PORT}`);
    });
}

runApp();
