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
  
  it ("should show the phones based on the chosen sort order", function(){
      // by default we have 3 phones
      var phoneNameColumn = element.all(by.repeater('phone in phones').column('phone.name'));
      
      function getNames() {
        // returns an array with the names as present in each
        // of the phone name columns
        return phoneNameColumn.map(function(elm) {
          return elm.getText();
        });
      }
      
      element(by.model('orderProp')).element(by.css('option[value="age"]')).click();

      expect(getNames()).toEqual([
        "Motorola XOOM\u2122 with Wi-Fi",
        "Nexus S",
        "MOTOROLA XOOM\u2122"
      ]);

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        "MOTOROLA XOOM\u2122",
        "Motorola XOOM\u2122 with Wi-Fi",
        "Nexus S"
      ]);
    });
  
  });

});
