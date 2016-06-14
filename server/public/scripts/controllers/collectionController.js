boardApp.controller('CollectionController', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

  console.log('Hey Buckaroo!');

  $scope.boardgames = [];
  $scope.modalGame = {};

  $scope.getCollection = function() {

    $http.get('/collection').then(
      function(response) {

        console.log(response.data);

        $scope.boardgames = response.data;

      }

    );

  }

  $scope.deleteGame = function(id) {

    $http.delete('/collection/' + id).then(
      function(response) {

        $scope.getCollection();

      }

    );

  }

  $scope.lendGame = function(game) {

    game.is_lent = true;

    $http.put('/collection/lend', game).then(
      function(response) {


        $scope.getCollection();

      }

    );

  }

  $scope.returnGame = function(game) {

    game.is_lent = false;

    $http.put('/collection/return', game).then(
      function(response) {


        $scope.getCollection();

      }

    );

  }

  $scope.myData = { modalShown: false };

  $scope.toggleInfo = function(game) {
    $scope.myData.modalShown = !$scope.myData.modalShown;
    $scope.modalGame = game;
  };

}]);
