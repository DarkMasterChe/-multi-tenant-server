//const express = require('express');
//const bodyParser = require('body-parser');
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import * as userService from './services/users';
import { connectAllDb } from './connectionManager';
import * as connectionResolver from './middlewares/connectionResolver';
import './env';


//const PORT = 4455; //PORT
const app = express(); //



//app.set('port', PORT);
app.use(bodyParser.json());
dotenv.config();

connectAllDb();
app.use(connectionResolver.resolve);

const PORT = process.env.PORT;


app.get('/', (req, res, next) => { 
    console.log('Connection'); //Routing
    res.json({ body: 'RESPONS' });
    console.log(res);
});


app.get('/users', userService.getAll);

app.get('/user', (req, res, next) => {
    res.json({ body: 'User' });
    console.log(res);
});


app.get('/user/port', (req, res, next) => {
    res.json(`${PORT}`);
    console.log(res);
});







app.listen(PORT, () => {
    console.log(`Listen port ${PORT}`);
})