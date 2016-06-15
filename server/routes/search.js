var express = require('express');
var router = express.Router();
var request = require('request');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/meeple_dash';



router.get('/search-api/:search', function (req, res) {

  var req = 'https://www.boardgamegeek.com/xmlapi/search?search=' + req.params.search;

  request(req, function(err, response, games) {

    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(games);

  });

});

router.get('/get-games/:id', function (req, res) {

  var req = 'http://www.boardgamegeek.com/xmlapi/boardgame/' + req.params.id;

  request(req, function(err, response, game) {

    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(game);

  });

});

router.post('/to-collection', function(req, res) {

  var game = req.body;

  pg.connect(connectionString, function(error, client, done) {

    if (error) {
      res.sendStatus(500);
    }

    client.query( 'SELECT * FROM game_ids WHERE game_ids.api_id = $1' , [game.apiID],
                  function(err, result) {

                    if (err) {
                      res.sendStatus(500);
                    }

                    if (result.rows.length == 0) {

                      client.query( 'INSERT INTO game_ids (api_id, location)' +
                                    ' values($1, $2)',
                                    [game.apiID, game.dbstored],
                                    function(err, result) {

                                      if (err) {
                                        res.sendStatus(500);
                                      }

                                      client.query( 'INSERT INTO dash_collection (api_id, categories, description, designers, image,    is_lent,'
                                                    + ' maxplayers, maxplaytime, minplayers, minplaytime, '
                                                    + 'gamename, suggested_age, thumbnail, yearpublished, publishers)' +
                                                    ' values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14 ,$15)',
                                                    [game.apiID, game.categories, game.description, game.designers, game.image, game.isLent, game.maxPlayers,
                                                    game.maxPlaytime, game.minPlayers, game.minPlaytime,
                                                    game.name, game.suggestedAge, game.thumbnail,
                                                    game.yearPublished, game.publishers],
                                                    function(err, result) {
                                                      done();

                                                      if (err) {
                                                        res.sendStatus(500);
                                                      }

                                                      res.sendStatus(201);

                                                    });

                                    }

                                  );
                    } else {
                      res.send(result.rows);
                    }


                  });

  });

});

router.post('/to-wish-list', function(req, res) {

  var game = req.body;

  pg.connect(connectionString, function(error, client, done) {

    if (error) {
      res.sendStatus(500);
    }

    client.query( 'SELECT * FROM game_ids WHERE game_ids.api_id = $1' , [game.apiID],
                  function(err, result) {

                    if (err) {
                      res.sendStatus(500);
                    }

                    if (result.rows.length == 0) {
                      client.query( 'INSERT INTO game_ids (api_id, location)' +
                                    ' values($1, $2)',
                                    [game.apiID, game.dbstored],
                                    function(err, result) {

                                      if (err) {
                                        res.sendStatus(500);
                                      }

                                      client.query( 'INSERT INTO wish_list (api_id, categories, description, designers, image, is_lent,'
                                                    + ' maxplayers, maxplaytime, minplayers, minplaytime, '
                                                    + 'gamename, suggested_age, thumbnail, yearpublished, publishers)' +
                                                    ' values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
                                                    [game.apiID, game.categories, game.description, game.designers, game.image, game.isLent, game.maxPlayers,
                                                    game.maxPlaytime, game.minPlayers, game.minPlaytime,
                                                    game.name, game.suggestedAge, game.thumbnail,
                                                    game.yearPublished, game.publishers],
                                                    function(err, result) {
                                                      done();

                                                      if (err) {
                                                        res.sendStatus(500);
                                                      }

                                                      res.sendStatus(201);

                                                    });

                                    }

                                  );
                    } else {
                      res.send(result.rows);
                    }


                  });

  });

});

// CREATE TABLE dash_collection (
//     id SERIAL PRIMARY KEY,
//     categories varchar(100)[],
//     description text,
//     designers varchar(100)[],
//     image varchar(100),
//     is_lent boolean,
//     api_id varchar(100),
//     maxplayers varchar(100),
//     maxplaytime varchar(100),
//     minplayers varchar(100),
//     minplaytime varchar(100),
//     gamename varchar(100),
//     suggested_age varchar(100),
//     thumbnail varchar(100),
//     yearpublished varchar(100),
//     publishers varchar(100)[],
//     person_lent varchar(100),
//     date_lent timestamp,
// );

// CREATE TABLE wish_list (
//     id SERIAL PRIMARY KEY,
//     categories varchar(100)[],
//     description text,
//     designers varchar(100)[],
//     image varchar(100),
//     is_lent boolean,
//     api_id varchar(100),
//     maxplayers varchar(100),
//     maxplaytime varchar(100),
//     minplayers varchar(100),
//     minplaytime varchar(100),
//     gamename varchar(100),
//     suggested_age varchar(100),
//     thumbnail varchar(100),
//     yearpublished varchar(100),
//     publishers varchar(100)[]
// );

// CREATE TABLE game_ids (
//     id SERIAL PRIMARY KEY,
//     api_id varchar(100),
//     location varchar(100)
// );

module.exports = router;
