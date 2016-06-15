boardApp.controller('WishlistController', ['$scope', '$http', function($scope, $http) {

  console.log('Hey Buckaroo!');

  $scope.boardgames = [];

  $scope.modal = {info:false,
                  delete:false,
                  deleteID:'',
                  collection:false,
                  addedGame:{},
                  success:false,
                  successText:''};

  $scope.getWishlist = function() {

    $http.get('/wishlist').then(
      function(response) {

        $scope.boardgames = response.data;

      }

    );

  }


  $scope.deleteGame = function(id) {

    $scope.modal.delete = !$scope.modal.delete;
    $scope.modal.deleteID = id;

  }

  $scope.delete = function() {

    $scope.modal.delete = !$scope.modal.delete;

    $http.delete('/wishlist/' + $scope.modal.deleteID).then(
      function(response) {

        $scope.getWishlist();

        if (response.status == 200) {
          $scope.modal.successText= 'successfully deleted from your wish list.'
          $scope.modal.success = !$scope.modal.success;
        }

      }

    );

  }

  $scope.addToCollection = function(game) {

    $scope.modal.collection = !$scope.modal.collection;
    $scope.modal.addedGame = game;
    
  }

  $scope.toCollection = function () {

    $scope.modal.collection = !$scope.modal.collection;
    $scope.modal.addedGame.location = 'collection';

    $http.post('/wishlist', $scope.modal.addedGame).then(
      function(response) {

        if (response.status == 200) {
          $scope.modal.successText= 'successfully added ' + response.config.data.gamename + ' to your collection.'
          $scope.modal.success = !$scope.modal.success;
        }

        $scope.getWishlist();

      }

    );

  }

  $scope.toggleInfo = function(game) {
    $scope.modal.info = !$scope.modal.info;
    $scope.modalGame = game;
  };

}]);
