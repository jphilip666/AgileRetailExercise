import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { z } from 'zod';

type RequestSource = 'body' | 'params' | 'query';

export const validateRequest = (
    schema: z.ZodType,
    source: RequestSource = 'body',
): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            next(result.error);
            return;
        }

        // Replace the request data with the validated data.
        if (source === 'body') {
            req.body = result.data;
        } else if (source === 'params') {
            req.params = result.data as typeof req.params;
        } else {
            res.locals.validatedQuery = result.data;
        }

        next();
    };
};
