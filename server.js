const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 8080;

const { Node, LinkedList} = require(`./utils/linked-list.js`);

app.use(cors());
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(morgan('dev'));

let history = new LinkedList();

app.get('/verse', (req, res, next) => {
    res.sendFile(path.join(__dirname,'/public/main.html'));
})

app.get('/history', (req, res, next) => {
    res.send(history);
})

app.post('/history', (req, res, next) => {
    let body = req.body;
    history.addToHead(body);
    // history.push(body);
    res.status(204).send();
    // res.send(body);
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})