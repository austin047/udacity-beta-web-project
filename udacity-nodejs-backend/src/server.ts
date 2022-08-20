import express, {NextFunction, Request, Response} from 'express'
import bodyParser from 'body-parser'
import {config} from 'dotenv'
import morgan from 'morgan'
import apiRouter from './api'
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import APIError from './helpers/APIError'
import cors from 'cors'

config()

const app: express.Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));


app.use(cors())
app.use(morgan('dev'))

app.use('/api', apiRouter)
app.get('/', (_req: Request, res: Response) => res.json({'message': 'alive'}))

app.use((err: APIError, _req: Request, res: Response, _: NextFunction,) => {// eslint-disable-line no-unused-vars
    //err: APIError,
    let status: number;
    if (err.status) status = err.status
    else status = StatusCodes.INTERNAL_SERVER_ERROR
    // next(err) err.isPublic ? err.message : httpStatus[err.status],

    console.trace(err)

    let errorJson;

    if ((err as any).code === "23505") {
        // errorJson = {
        //     error: (err as any).detail
        // }

        return res.status(StatusCodes.CONFLICT).json({error: "Duplication Error, entity being created already exists"})
    } else {
        errorJson = {
            error: err.isPublic ? err.message : ReasonPhrases.INTERNAL_SERVER_ERROR,
            stack: (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'dev') ? err.stack : {}
        };
    }

    return res.status(status).json(errorJson)
});

export default app;
