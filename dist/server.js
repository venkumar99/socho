import express from 'express';
import bodyParser from 'body-parser';
import moment from 'moment';

var app = express();

app.use('/', (req, res) => {
     res.send("Hello World");
});

app.listen(3000);