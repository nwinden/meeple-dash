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

              $scope.boardgames = Array.isArray(turnXML(response.data).boardgames.boardgame) ? turnXML(response.data).boardgames.boardgame : [turnXML(response.data).boardgames.boardgame];

              console.log($scope.boardgames);

              for (var i = 0; i < $scope.boardgames.length; i++) {
                if (Array.isArray($scope.boardgames[i].name)) {
                  for (var j = 0; j < $scope.boardgames[i].name.length ; j++) {
                    if ($scope.boardgames[i].name[j]._primary) {
                      $scope.boardgames[i].gamename = $scope.boardgames[i].name[j].__text;
                    }
                  }
                } else {
                  $scope.boardgames[i].gamename = $scope.boardgames[i].name.__text;
                }

                // $scope.boardgames[i].minplaytime = $scope.boardgames[i].minplaytime != 0 ? ($scope.boardgames[i].minplaytime / 60).toFixed(1) : $scope.boardgames[i].minplaytime;
                //
                // $scope.boardgames[i].maxplaytime = $scope.boardgames[i].maxplaytime != 0 ? ($scope.boardgames[i].maxplaytime / 60).toFixed(1) : $scope.boardgames[i].maxplaytime;

                if ($scope.boardgames[i].thumbnail) {
                  $scope.boardgames[i].thumbnail = $scope.boardgames[i].thumbnail;
                } else {
                  $scope.boardgames[i].thumbnail = '/assets/images/img_not_available.png';
                }

              }

            }

          );

        }

      }

    );

  };

  $scope.addToCollection = function(game) {

    var newGame = new Boardgame(game);
    newGame.dbstored = 'collection';
    console.log(newGame);

    $http.post('/search/to-collection', newGame).then(function(response) {

      console.log(response);

      if (response.status == 200) {
        alert('You already have that game in your ' + response.data[0].location + '!');
      } else if (response.status == 201) {
        alert('Succesfully added ' + response.config.data.name + ' to your ' + response.config.data.dbstored + '.');
      }

    });

  }

  $scope.addToWishList = function(game) {

    var newGame = new Boardgame(game);
    newGame.dbstored = 'wish list';
    console.log(newGame);

    $http.post('/search/to-wish-list', newGame).then(function(response) {

      if (response.status == 200) {
        alert('You already have that game in your ' + response.data[0].location + '!');
      } else if (response.status == 201) {
        alert('Succesfully added ' + response.config.data.name + ' to your ' + response.config.data.dbstored + '.');
      }

    });

  }

}]);

function turnXML(xml) {
  var x2js = new X2JS();
  var json = x2js.xml_str2json( xml );
  return json;
}
