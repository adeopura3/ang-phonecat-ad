'use strict';

/* Controllers */

phonecatApp.controller('PhoneListCtrl', ['$scope', '$http', function($scope, $http) {
  // Get all the phones, they are stored in a json file
  $http.get('phones/phones.json').success(function(phoneList) {
    // this is an aync call so we need to wait for success
    // callback before we proceed
    $scope.phones = phoneList;
  });

  $scope.orderProp = 'age';
}]);

phonecatApp.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
      $scope.phone = data;
      $scope.mainImageUrl = data.images[0];
  });
    
  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  };
    
}]);

