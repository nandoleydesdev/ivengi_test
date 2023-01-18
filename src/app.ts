import express, { Application } from 'express';
import mongoose from 'mongoose';
import bookRouter from './routers/book.router';
import authorRouter from './routers/author.router';

class App {
    public app: Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.initDatabaseConnection();
        this.initMiddleware();
        this.initRouters();
    }

    private initDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

        mongoose.set('strictQuery', true);
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    }

    private initMiddleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    private initRouters(): void {
        this.app.use('/books', bookRouter);
        this.app.use('/authors', authorRouter);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`The app is listening on port ${this.port}`);
        });
    }
}

export default App;