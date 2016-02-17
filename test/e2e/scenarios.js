'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
// end to end testsa
describe('PhoneCat Application', function() {

  describe('Phone List View', function() {

    beforeEach(function() {
      // get to the page
      browser.get('app/index.html');
    });
    
  
  var phoneList = element.all(by.repeater('phone in phones'));
  var query = element(by.model('query'));
  
  it ("should show only the filtered phones as user types into search box", function(){
      // by default we have 3 phones
      expect(phoneList.count()).toBe(3);
      
      // send query
      query.clear();
      query.sendKeys('XOOM');
      expect(phoneList.count()).toBe(2);
      
      // send query
      // note that filter is case insensitive
      // and nexus will match Nexus
      query.clear();
      query.sendKeys('nexus');
      expect(phoneList.count()).toBe(1);
      
      // send query
      query.clear();
      query.sendKeys('random');
      expect(phoneList.count()).toBe(0);
      
    });
  
  it ("should show the title based on the text currently in the search filter", function(){
    query.clear();
    expect(browser.getTitle()).toMatch(/Google Phone Gallery:\s*$/);
    
    query.clear();
    query.sendKeys('motorola');
    expect(browser.getTitle()).toMatch(/Google Phone Gallery: motorola$/);
  });
    
  
  });

});
