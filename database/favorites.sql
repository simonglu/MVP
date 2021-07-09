/* Every time we run this schema, we want to drop it before so we don't get mixed up data */
DROP DATABASE IF EXISTS favoriteslist;

CREATE DATABASE favoriteslist;

/* \c means USE this database */
\c favoriteslist;

/*Same statement as above about the schema*/
DROP TABLE IF EXISTS favoriteplayers;

/*Create tables as usual*/
CREATE TABLE favoriteplayers (
  ID  SERIAL PRIMARY KEY,
  username varchar(255)
);