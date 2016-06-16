boardApp.controller('CollectionController', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

  console.log('Hey Buckaroo!');

  $scope.boardgames = [];

  $scope.modal = {info:false,
                  modalGame:{},
                  delete:false,
                  lend:false,
                  return:false,
                  update:false,
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

    $scope.modal.modalGame = game;
    $scope.modal.lend = !$scope.modal.lend;

  }

  $scope.lendOutGame = function (person) {

    $scope.modal.lend = !$scope.modal.lend;
    $scope.modal.modalGame.is_lent = true;
    $scope.modal.modalGame.person_lent = person;
    $scope.modal.modalGame.date_lent = new Date();

    $http.put('/collection/lend', $scope.modal.modalGame).then(
      function(response) {

        if (response.status == 200) {
          $scope.modal.successText= 'successfully lent out to ' + $scope.modal.modalGame.person_lent + '.';
          $scope.modal.success = !$scope.modal.success;
        }

        $scope.getCollection();

      }

    );
  }

  $scope.returnGame = function(game) {

    $scope.modal.modalGame = game;
    $scope.modal.return = !$scope.modal.return;

  }

  $scope.gameReturned = function () {

    $scope.modal.return = !$scope.modal.return;
    $scope.modal.modalGame.is_lent = false;
    $scope.modal.modalGame.person_lent = null;
    $scope.modal.modalGame.date_lent = null;

    $http.put('/collection/return', $scope.modal.modalGame).then(
      function(response) {

        if (response.status == 200) {
          $scope.modal.successText= 'successfully returned.';
          $scope.modal.success = !$scope.modal.success;
        }

        $scope.getCollection();

      }

    );

  }

  $scope.updateGame = function (game) {

    $scope.modal.modalGame = game;
    $scope.modal.update = !$scope.modal.update;

  }

  $scope.update = function () {

    $scope.modal.update = !$scope.modal.update;

    $http.put('/collection/update', $scope.modal.modalGame).then(
      function(response) {

        if (response.status == 200) {
          $scope.modal.successText= 'successfully updated.';
          $scope.modal.success = !$scope.modal.success;
        }

        $scope.getCollection();

      }

    );

  }

  $scope.toggleInfo = function(game) {

    $scope.modal.modalGame = game;
    $scope.modal.info = !$scope.modal.info;

  };

}]);
