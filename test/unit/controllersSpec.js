'use strict';

// controller tests
describe('PhoneCat Controllers', function() {

  describe('PhoneListCtrl Controller', function() {
    var scope, phoneListController;
    
    beforeEach(module('phonecatApp'));
    // Move the scope and controller to common actions
    // before each test
    beforeEach(inject(function($controller) {
        scope = {};
        phoneListController = $controller('PhoneListCtrl', {$scope:scope});
      }));
    
    it('should have 3 phones', function(){
      expect(scope.phones.length).toBe(3);
    });
    
    it('should have default scope order as age', function(){
      expect(scope.orderProp).toBe("age");
    });
  
  });

});