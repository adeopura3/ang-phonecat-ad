'use strict';

// controller tests
describe('PhoneCat Controllers', function() {

  beforeEach(module('phonecatApp'));
  
  describe('PhoneListCtrl Controller', function() {
    var scope, phoneListController, $httpBackend;
    
    
    // Move the scope and controller to common actions
    // before each test
    // http backend is mock service for http
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/phones.json').
        respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
      scope = $rootScope.$new();
      phoneListController = $controller('PhoneListCtrl', {$scope: scope});
    }));
    
    it('should have 2 phones', function(){
      // undefined
      expect(scope.phones).toBeUndefined();
      
      // flush http backend (emulates response from the server)
      $httpBackend.flush();
      
      expect(scope.phones.length).toBe(2);
      expect(scope.phones).toEqual([{name: 'Nexus S'},
                                   {name: 'Motorola DROID'}]);      
    });
    
    it('should have default scope order as age', function(){
      expect(scope.orderProp).toBe("age");
    });
  
  });
  
  describe('PhoneDetailCtrl', function(){
    var scope, $httpBackend, phoneDetailController;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond({name:'phone xyz'});

      $routeParams.phoneId = 'xyz';
      scope = $rootScope.$new();
      phoneDetailController = $controller('PhoneDetailCtrl', {$scope: scope});
    }));


    it('should fetch phone detail', function() {
      expect(scope.phone).toBeUndefined();
      $httpBackend.flush();

      expect(scope.phone).toEqual({name:'phone xyz'});
    });
  });

});