const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname,'/public/main.html'));
})

app.post('/:id', (req, res, next) => {
    res.send("post request");
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})