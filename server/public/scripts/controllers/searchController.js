boardApp.controller('SearchController', ['$scope', '$http', function($scope, $http) {

  console.log('Running');

  $scope.boardgames = [];

  $scope.searchAPI = function(search) {

    $http.get('/search/search-api/' + search).then(
      function(response) {

        if(!turnXML(response.data).boardgames.boardgame){

          alert('That query returned no results,\nplease try again!');

        } else {

          var games = Array.isArray(turnXML(response.data).boardgames.boardgame) ? turnXML(response.data).boardgames.boardgame : [turnXML(response.data).boardgames.boardgame];

          var ids = '';

          for (var i = 0; i < games.length; i++) {

            if (i == games.length-1) {
              ids += games[i]._objectid;
            } else {
              ids += games[i]._objectid + ',';
            }


          }

          $http.get('/search/get-games/' + ids).then(
            function(response) {

              games = Array.isArray(turnXML(response.data).boardgames.boardgame) ? turnXML(response.data).boardgames.boardgame : [turnXML(response.data).boardgames.boardgame];

              for (var i = 0; i < games.length; i++) {

                games[i] = new Boardgame(games[i]);

              }

              $scope.boardgames = games;

              console.log($scope.boardgames);

            }

          );

        }

      }

    );

  };

  $scope.addToCollection = function(game) {

    game.dbstored = 'collection';

    $http.post('/search/to-collection', game).then(function(response) {

      console.log(response);

      if (response.status == 200) {
        alert('You already have that game in your ' + response.data[0].location + '!');
      } else if (response.status == 201) {
        alert('Succesfully added ' + response.config.data.name + ' to your ' + response.config.data.dbstored + '.');
      }

    });

  }

  $scope.addToWishList = function(game) {

    game.dbstored = 'wish list';

    $http.post('/search/to-wish-list', game).then(function(response) {

      if (response.status == 200) {
        alert('You already have that game in your ' + response.data[0].location + '!');
      } else if (response.status == 201) {
        alert('Succesfully added ' + response.config.data.name + ' to your ' + response.config.data.dbstored + '.');
      }

    });

  }

  $scope.myData = { modalShown: false };

  $scope.toggleInfo = function(game) {
    $scope.myData.modalShown = !$scope.myData.modalShown;
    $scope.modalGame = game;
  };

}]);

function turnXML(xml) {
  var x2js = new X2JS();
  var json = x2js.xml_str2json( xml );
  return json;
}
