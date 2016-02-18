'use strict';

/* Controllers */

phonecatApp.controller('PhoneListCtrl', ['$scope', 'phoneDataService', function($scope, phoneDataService) {
  // Use data service instead of the http call
  $scope.phones = phoneDataService.query();
  $scope.orderProp = 'age';
}]);

phonecatApp.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'phoneDataService', function($scope, $routeParams, phoneDataService) {
      $scope.phone = phoneDataService.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
      });
    
  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  };
    
}]);

