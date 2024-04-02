import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';
import { config } from '../config';

export { buildAuthenticatedController };

function buildAuthenticatedController<
    paramsT extends Record<string, string>,
    queryT extends Record<string, string>,
    bodyT,
>(
    controller: (params: { query: queryT; urlParams: paramsT; body: bodyT }) => any | Promise<any>,
    options?: {
        schema?: Joi.Schema;
    },
) {
    return async (req: Request, res: Response) => {
        const apiKey = req.headers['X-API-KEY'];
        if (apiKey !== config.API_KEY) {
            res.sendStatus(httpStatus.UNAUTHORIZED);
            return;
        }

        if (options?.schema) {
            const { error } = options.schema.validate(req.body);
            if (error) {
                console.error(error);
                res.status(httpStatus.BAD_REQUEST).send(error.message);
                return;
            }
        }

        try {
            const result = await controller({
                query: req.query as queryT,
                urlParams: req.params as paramsT,
                body: req.body,
            });
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        } catch (error) {
            console.error(error);
            res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}
