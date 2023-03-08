import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config() 
import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import routes from './routes'


const app = express()

app.use(express.json())
app.use(routes)


app.use((err: Error, req: Request, res: Response, nxt: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({ error: err.message })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server errror'
    })
})


app.listen( process.env.PORT || 9090, () => console.log('Server is running in http://localhost:9090'))