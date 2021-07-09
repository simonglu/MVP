const { Pool, Client } = require('pg');
const pool = new Pool({
  user: 'Simon',
  database: 'favoriteslist'
});

//If connected, console log connected to postgres
pool.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to Postgres');
  }
});


module.exports = pool;