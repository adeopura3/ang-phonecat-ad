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
      expect(phoneList.count()).toBe(20);
      
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
      
      query.clear();
      query.sendKeys('Motorola xoom');
      
      element(by.model('orderProp')).element(by.css('option[value="age"]')).click();

      expect(getNames()).toEqual([
        "Motorola XOOM\u2122 with Wi-Fi",
        "MOTOROLA XOOM\u2122"
      ]);

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        "MOTOROLA XOOM\u2122",
        "Motorola XOOM\u2122 with Wi-Fi"
      ]);
    });
  
  it('should show phone specific links', function() {
      var query = element(by.model('query'));
      query.sendKeys('nexus');
      element(by.css('.phones li a')).click();
      browser.getLocationAbsUrl().then(function(url) {
        // relative
        expect(url).toEqual('/phones/nexus-s');
      });
    });
  
  it('should redirect index.html to index.html#/phones', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/phones');
      });
    });
  });

  describe('Phone detail view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/phones/nexus-s');
    });


    it('should display nexus-s page', function() {
      expect(element(by.binding('phone.name')).getText()).toBe('Nexus S');
    });
    
    
    it('should display 4 images in the nexus-s page details', function() {
      
      expect(element.all(by.repeater('img in phone.images')).count()).toEqual(4);      
    });
    
    it('should display the first phone image as the main phone image', function() {
      expect(element(by.css('img.phone')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
    });


    it('should swap main image if a thumbnail image is clicked on', function() {
      element(by.css('.phone-thumbs li:nth-child(3) img')).click();
      expect(element(by.css('img.phone')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.2.jpg/);

      element(by.css('.phone-thumbs li:nth-child(1) img')).click();
      expect(element(by.css('img.phone')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
    });
     
     
  });
  
  
     
});
