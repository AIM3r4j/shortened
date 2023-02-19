import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import authenticatedMiddleware from '@/middleware/authenticated.middleware';
import validate from '@/resources/url/url.validation';
import UrlService from '@/resources/url/url.service';

class UrlController implements Controller {
    public path = '/urls';
    public router = Router();
    private UrlService = new UrlService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            authenticatedMiddleware,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.get(
            `${this.path}/:urlId`,
            authenticatedMiddleware,
            validationMiddleware(validate.get),
            this.get
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { originalUrl } = req.body;

            const url = await this.UrlService.create(originalUrl);

            res.status(201).json({ url });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { urlId } = req.params;
            const url = await this.UrlService.get(urlId);

            res.status(200).json({ url });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default UrlController;
