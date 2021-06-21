const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//const messages = require('./db/messages');
const dishesh = require('./db/dishesh');

const app = express();

app.use(morgan('tiny'));
app.use(cors());

app.use(bodyParser.json());

app.get('/dishesh', (req, res) => {
    dishesh.getAll().then((dishesh) => {
        res.json(dishesh);
    });
});

app.post('/dishesh', (req, res) => {
    console.log(req.body);
    dishesh.addDish(req.body).then((dish) => {
        res.json(dish);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

app.delete('/dishesh/:id', (req, res) => {
    dishesh.deleteDish(req.params.id);
    dishesh.getAll().then((dishesh) => {
        res.json(dishesh);
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
}); 