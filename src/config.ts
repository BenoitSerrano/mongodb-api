import dotenv from 'dotenv';

dotenv.config();

const config = {
    SERVER_PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
    MONGO_PORT: process.env.MONGO_PORT ? Number(process.env.MONGO_PORT) : 27017,
    MONGO_HOST: process.env.MONGO_HOST || '',
    MONGO_NAME: process.env.MONGO_NAME || '',
    MONGO_USER: process.env.MONGO_USER || '',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || '',
    API_KEY: process.env.API_KEY || '',
    SHOULD_LOAD_DB: process.env.SHOULD_LOAD_DB === 'true' ? true : false,
};

export { config };
