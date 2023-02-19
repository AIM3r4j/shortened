import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import {
    errorMiddleware,
    routeNotFoundMiddleware,
} from '@/middleware/error.middleware';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
        const apiLimiter = rateLimit({
            windowMs: 60 * 60 * 1000, // 1 hour
            max: 5, // limit each IP to 5 requests per windowMs
            handler: (req: Request, res: Response, next: NextFunction) => {
                res.status(429).json({
                    success: false,
                    message:
                        'You have reached the limit of requests, please try again after 1 hour.',
                });
            },
        });
        this.express.use('/api/urls', apiLimiter);
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        this.express.use(errorMiddleware);
        this.express.use(routeNotFoundMiddleware);
    }

    private initialiseDatabaseConnection(): void {
        const { MONGO_PATH } = process.env;

        mongoose.connect(`${MONGO_PATH}`);
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(
                `Backend is listening on http://localhost:${this.port}`
            );
        });
    }
}

export default App;
