const express = require('express');
const axios = require('axios');
const APIToken = require('../config.js');
const morgan = require('morgan')
let app = express();


var pool = require('../database/database.js');

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

app.post('/matches', (req, res) => {
  var puuid = req.body.puuid;
  axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`, {headers: { "X-Riot-Token": APIToken.TOKEN }})
  .then((response) => {
    res.send(response.data);
  })
  .catch((err)=> {
    res.send(404);
  });
})

app.get('/individualMatch', (req, res) => {
  var matchId = req.query.individualMatch;
  axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`, {headers: { "X-Riot-Token": APIToken.TOKEN }})
  .then((response) => {
    console.log(response.data);
    res.send(response.data);
  })
  .catch((err)=> {
    res.send(404);
  });
})

app.get('/favoritesList', (req, res) => {
  pool.query(`SELECT * FROM favoriteplayers;`, (err, result) => {
    if (err) {
      console.log(err);
      res.send(404);
    }
    console.log(result.rows);
    res.send(result.rows);
  });
});

app.post('/newFavorite', (req, res) => {
  var userToBeAdded = req.body.username;
  pool.query(`INSERT INTO favoritePlayers (username) VALUES ('${userToBeAdded}');`, (err, result) => {
    if (err) {
      console.log(err);
      res.send(404);
    }
    res.send(200);
  });
});

app.post('/removeFavorite', (req, res) => {
  var userToBeDeleted = req.body.username;
  console.log(userToBeDeleted);
  pool.query(`DELETE FROM favoriteplayers
              WHERE username = '${userToBeDeleted}';`, (err, result) => {
    if (err) {
      console.log(err);
      res.send(404);
    }
    res.send(200);
  });
});


let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});