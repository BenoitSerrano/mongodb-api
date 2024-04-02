import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from './config';
import { Prompt } from './modules/prompts';

const dataSource = new DataSource({
    type: 'mongodb',
    host: config.MONGO_HOST,
    port: config.MONGO_PORT,
    database: config.MONGO_NAME,
    username: config.MONGO_USER,
    password: config.MONGO_PASSWORD,
    entities: [Prompt],
});

export { dataSource };
