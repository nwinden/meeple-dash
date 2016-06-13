var boardApp = angular.module('boardApp', ['ngRoute', 'smart-table']);

//Routes for the site views
boardApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/collection', {
      templateUrl: '/views/collection.html',
      controller: "CollectionController"
    })
    .when('/wishlist', {
      templateUrl: '/views/wishlist.html',
      controller: "WishlistController"
    })
    .when('/search', {
      templateUrl: '/views/search.html',
      controller: "SearchController"
    })
    .otherwise({
      redirectTo: 'collection'
    })
}]);
