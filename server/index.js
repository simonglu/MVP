const express = require('express');
const axios = require('axios');
const APIToken = require('../config.js');
const morgan = require('morgan')
let app = express();


app.use(express.static(__dirname + '/../client/dist'));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.post('/playerInfo', (req, res) => {
  var username = req.body.username;
  axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`, {headers: { "X-Riot-Token": APIToken.TOKEN }})
  .then((response) => {
    res.send(response.data);
  })
  .catch((err)=> {
    res.send(404);
  });
})

app.get('/matchInfo', (req, res) => {
  var puuid = req.body.puuid;
  axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`, {headers: { "X-Riot-Token": APIToken.TOKEN }})
  .then((response) => {
    res.send(response.data);
  })
  .catch((err)=> {
    res.send(404);
  });
})




let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});