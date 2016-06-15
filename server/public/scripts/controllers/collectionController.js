boardApp.controller('CollectionController', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

  console.log('Hey Buckaroo!');

  $scope.boardgames = [];

  $scope.modal = {info:false,
                  modalGame:{},
                  delete:false,
                  lend:false,
                  success:false,
                  successText:''};

  $scope.getCollection = function() {

    $http.get('/collection').then(
      function(response) {

        console.log(response.data);

        $scope.boardgames = response.data;

      }

    );

  }

  $scope.deleteGame = function(game) {

    $scope.modal.modalGame = game;
    $scope.modal.delete = !$scope.modal.delete;

  }

  $scope.delete = function () {

    $scope.modal.delete = !$scope.modal.delete;

    $http.delete('/collection/' + $scope.modal.modalGame.api_id).then(
      function(response) {

        $scope.getCollection();

        if (response.status == 200) {
          $scope.modal.successText= 'successfully deleted from your collection.'
          $scope.modal.success = !$scope.modal.success;
        }

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

  $scope.toggleInfo = function(game) {

    $scope.modal.modalGame = game;
    $scope.modal.info = !$scope.modal.info;

  };

}]);
