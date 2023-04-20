import express from 'express';
import http from 'http';
import { json } from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './router';


const app = express();


mongoose.connect('mongodb://localhost:27017/translation');

app.use(morgan('combined'));
app.use(json());
app.use(cors());


router(app);


const port = process.env.PORT || 3030;
const server = http.createServer(app);
server.listen(port);

console.log('Server listening on:', port);