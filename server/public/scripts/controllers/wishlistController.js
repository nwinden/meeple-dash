boardApp.controller('WishlistController', ['$scope', '$http', function($scope, $http) {

  console.log('Hey Buckaroo!');

  $scope.boardgames = [];

  $scope.getWishlist = function() {

    $http.get('/wishlist').then(
      function(response) {

        console.log(response.data);

        $scope.boardgames = response.data;

      }

    );

  }

  $scope.deleteGame = function(id) {

    $http.delete('/wishlist/' + id).then(
      function(response) {

        $scope.getWishlist();

      }

    );

  }

  $scope.addToCollection = function(game) {

    game.location = 'collection';

    $http.post('/wishlist', game).then(
      function(response) {

        $scope.getWishlist();

      }

    );

  }

}]);
