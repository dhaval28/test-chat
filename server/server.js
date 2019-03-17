const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

app.use(express.static(publicPath));

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/testPost', (req, res) => res.send('Post is working fine!'));


app.listen(port, () => {
    console.log(`Chat app listening on port ${port}!`);
});