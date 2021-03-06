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

    client.query( 'SELECT * FROM dash_collection ORDER BY gamename ASC',
                  function(err, result) {

                    done();

                    if (err) {
                      res.sendStatus(500);
                    }

                    res.send(result.rows)

                  });

  });

});

router.delete('/:id', function (req, res) {

  pg.connect(connectionString, function (err, client, done) {

    if (err) {
      res.sendStatus(500);
    }

    client.query('DELETE FROM dash_collection WHERE api_id = $1', [req.params.id],
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

router.put('/lend', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
    client.query('UPDATE dash_collection SET is_lent = $1, person_lent = $2, date_lent = $3 WHERE api_id = $4',
      [req.body.is_lent, req.body.person_lent, req.body.date_lent, req.body.api_id],
      function(err, result){
        done();
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      })
  });
});

router.put('/return', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
    client.query('UPDATE dash_collection SET is_lent = $1, person_lent = $2, date_lent = $3 WHERE api_id = $4',
      [req.body.is_lent, req.body.person_lent, req.body.date_lent, req.body.api_id],
      function(err, result){
        done();
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      })
  });
});

router.put('/update', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
    client.query('UPDATE dash_collection SET maxplayers = $1, maxplaytime = $2, minplayers = $3, minplaytime = $4 WHERE api_id = $5',
      [req.body.maxplayers, req.body.maxplaytime, req.body.minplayers, req.body.minplaytime, req.body.api_id],
      function(err, result){
        done();
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      })
  });
});

module.exports = router;
