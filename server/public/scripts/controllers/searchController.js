boardApp.controller('SearchController', ['$scope', '$http', function($scope, $http) {

  console.log('Running');

  $scope.boardgames = [];

  $scope.modal = {info: false,
                  collection:false,
                  wishlist:false,
                  addedGame:{},
                  duplicate: false,
                  dublicateText: '',
                  results: false,
                  resultsText: '',
                  added: false,
                  addedText: ''};

  $scope.searchAPI = function(search) {

    $http.get('/search/search-api/' + search).then(
      function(response) {

        if(!turnXML(response.data).boardgames.boardgame){

          $scope.modal.resultsText= 'That query returned no results,\nplease try again!';
          $scope.modal.results = !$scope.modal.results;

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

              console.log(turnXML(response.data).boardgames.boardgame);

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

    $scope.modal.collection = !$scope.modal.collection;
    $scope.modal.addedGame = game;

  }

  $scope.toCollection = function () {

    $scope.modal.collection = !$scope.modal.collection;

    $scope.modal.addedGame.dbstored = 'collection';

    $http.post('/search/to-collection', $scope.modal.addedGame).then(function(response) {

      console.log(response);

      if (response.status == 200) {
        $scope.modal.duplicateText = 'You already have that game in your ' + response.data[0].location + '!';
        $scope.modal.duplicate = !$scope.modal.duplicate;
      } else if (response.status == 201) {
        $scope.modal.addedText = 'Succesfully added ' + response.config.data.name + ' to your ' + response.config.data.dbstored + '.';
        $scope.modal.added = !$scope.modal.added;
      }

    });
  }

  $scope.addToWishList = function(game) {

    $scope.modal.wishlist = !$scope.modal.wishlist;
    $scope.modal.addedGame = game;

  }

  $scope.toWishList = function () {

    $scope.modal.wishlist = !$scope.modal.wishlist;

    $scope.modal.addedGame.dbstored = 'wish list';

    $http.post('/search/to-wish-list', $scope.modal.addedGame).then(function(response) {

      if (response.status == 200) {
        $scope.modal.duplicateText = 'You already have that game in your ' + response.data[0].location + '!';
        $scope.modal.duplicate = !$scope.modal.duplicate;
      } else if (response.status == 201) {
        $scope.modal.addedText = 'Succesfully added ' + response.config.data.name + ' to your ' + response.config.data.dbstored + '.';
        $scope.modal.added = !$scope.modal.added;
      }

    });
  }

  $scope.toggleInfo = function(game) {
    $scope.modal.info = !$scope.modal.info;
    $scope.modalGame = game;
  };

}]);

function turnXML(xml) {
  var x2js = new X2JS();
  var json = x2js.xml_str2json( xml );
  return json;
}
