var express = require('express');
var router = express.Router();
var request = require('request');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/meeple_dash';

router.get('/', function(req, res) {

  pg.connect(connectionString, function(error, client, done) {

    if (error) {
      res.sendStatus(500);
    }

    client.query( 'SELECT * FROM wish_list ORDER BY gamename ASC',
                  function(err, result) {

                    done();

                    if (err) {
                      res.sendStatus(500);
                    }

                    res.send(result.rows)

                  });

  });

});

router.post('/', function(req, res) {

  var game = req.body;

  pg.connect(connectionString, function(error, client, done) {

    if (error) {
      res.sendStatus(500);
    }

      client.query( 'INSERT INTO dash_collection (api_id, categories, description, designers, image, is_lent,'
                    + ' maxplayers, maxplaytime, minplayers, minplaytime, '
                    + 'gamename, suggested_age, thumbnail, yearpublished)' +
                    ' values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
                    [game.api_id, game.categories, game.description, game.designers, game.image, game.is_lent, game.maxplayers,
                    game.maxplaytime, game.minplayers, game.minplaytime,
                    game.gamename, game.suggested_age, game.thumbnail,
                    game.yearpublished],
                    function(err, result) {

                      if (err) {
                        res.sendStatus(500);
                      }
                      client.query('UPDATE game_ids SET location = $1 WHERE api_id = $2',
                        [game.location, game.api_id],
                        function(err, result){
                          if (err) {
                            res.sendStatus(500);
                            return;
                          }
                          client.query('DELETE FROM wish_list WHERE api_id = $1', [game.api_id],
                            function(err, result){
                              done();
                              if (err) {
                                res.sendStatus(500);
                              }

                              res.sendStatus(200);
                        })

                    });

    });

  });

});

router.delete('/:id', function (req, res) {

  pg.connect(connectionString, function (err, client, done) {

    if (err) {
      res.sendStatus(500);
    }

    client.query('DELETE FROM wish_list WHERE api_id = $1', [req.params.id],
      function(err, result){

        if (err) {
          res.sendStatus(500);
        }

        client.query('DELETE FROM game_ids WHERE api_id = $1', [req.params.id],
          function(err, result){
            done();

            if (err) {
              res.sendStatus(500);
            }

            res.sendStatus(200);

          });

      });

  });

});

module.exports = router;
