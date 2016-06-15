boardApp.controller('WishlistController', ['$scope', '$http', function($scope, $http) {

  console.log('Hey Buckaroo!');

  $scope.boardgames = [];

  $scope.modal = {info:false,
                  modalGame:{},
                  delete:false,
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


  $scope.deleteGame = function(game) {

    $scope.modal.modalGame = game;
    $scope.modal.delete = !$scope.modal.delete;

  }

  $scope.delete = function() {

    $scope.modal.delete = !$scope.modal.delete;

    $http.delete('/wishlist/' + $scope.modal.modalGame.api_id).then(
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

    $scope.modal.modalGame = game;
    $scope.modal.collection = !$scope.modal.collection;

  }

  $scope.toCollection = function () {

    $scope.modal.collection = !$scope.modal.collection;
    $scope.modal.modalGame.location = 'collection';

    $http.post('/wishlist', $scope.modal.modalGame).then(
      function(response) {

        if (response.status == 200) {
          $scope.modal.successText= 'successfully added to your collection.';
          $scope.modal.success = !$scope.modal.success;
        }

        $scope.getWishlist();

      }

    );

  }

  $scope.toggleInfo = function(game) {

    $scope.modal.modalGame = game;
    $scope.modal.info = !$scope.modal.info;
  };

}]);
