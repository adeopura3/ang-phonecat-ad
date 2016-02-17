'use strict';

// controller tests
describe('PhoneListCtrl Controller', function() {
  
  beforeEach(module('phonecatApp'))
  
  it('should have 3 phones', inject(function($controller){
    var scope = {};
    var phoneListController = $controller('PhoneListCtrl', {$scope: scope});
    
    expect(scope.phones.length).toBe(3);
    
  }));

});