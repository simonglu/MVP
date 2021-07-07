const express = require('express');
const axios = require('axios');
let app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static(__dirname + '/../client/dist'));

let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});