import Express from 'express';
import { buildAuthenticatedController } from './lib/buildAuthenticatedController';
import { DataSource } from 'typeorm';
import { buildPromptController } from './modules/prompts';
import Joi from 'joi';

function buildRouter(dataSource: DataSource) {
    const router = Express.Router();
    const promptController = buildPromptController(dataSource);

    router.get('/prompts', buildAuthenticatedController(promptController.getPrompts));
    router.post(
        '/prompts',
        buildAuthenticatedController(promptController.createPrompt, {
            schema: Joi.object({
                clientAddress: Joi.string().required(),
                prompt: Joi.string().required(),
                response: Joi.string(),
            }),
        }),
    );

    return router;
}

export { buildRouter };
