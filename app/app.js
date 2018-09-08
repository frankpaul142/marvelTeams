//import modules
import express from 'express'
import logger from 'morgan'
//import routes
import userRouter from './routes/userRoute'
import marvelRouter from './routes/marvelRoute'
import donationRouter from './routes/donationRoute'
import roleRouter from './routes/roleRoute'
import taskRouter from './routes/taskRoute'
//init express
const app = express();
//config express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//load routes
app.use('/api/user', userRouter);
app.use('/api/marvel', marvelRouter);
app.use('/api/donation', donationRouter);
app.use('/api/role', roleRouter);
app.use('/api/task', taskRouter);
//errors api
app.use((req, res, next) => {
    res.status(404).send({message: 'Método no implementado.'})
});
module.exports = app;