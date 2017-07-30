var selectedCompNAme;
module.exports = {

    before: function (browser) {
        browser.init();
    },
    
	'Create and read a new computer' : function (browser) {
        
		var homePage  = browser.page.homePage();
        var addAndEditPage = browser.page.addAndEditPage();
        var name = '12345';
        var introducedDate = '1997-04-12';
        var discontinuedDate = '2017-05-12';
        var companyName = addAndEditPage.elements.companySelectOption1.selector;

        homePage.waitForElementVisible('@addComputerButton', 4000);
        homePage.click('@addComputerButton');
        createUpdateComputer(browser, name, introducedDate, discontinuedDate, companyName);
        homePage.assert.containsText('@alertMessage', 'Computer '+ name + ' has been created');
        readTableRow(browser, name, introducedDate, discontinuedDate, 'Apple Inc.');
    },

    'Update and read a computer' : function (browser) {
        
		var homePage  = browser.page.homePage();
        var addAndEditPage = browser.page.addAndEditPage();
        var name = '12334';
        var introducedDate = '1997-04-11';
        var discontinuedDate = '2017-05-11';
        var companyName = addAndEditPage.elements.companySelectOption2.selector;

        homePage.waitForElementVisible('@addComputerButton', 4000);
        homePage.click('@computerNameCellValue');
        createUpdateComputer(browser, name, introducedDate, discontinuedDate, companyName);
        homePage.assert.containsText('@alertMessage',  'Computer '+ name + ' has been updated');
        readTableRow(browser, name, introducedDate, discontinuedDate, 'Thinking Machines');
    },

    'Delete a computer' : function (browser) {
        
		var homePage  = browser.page.homePage();
        var addAndEditPage = browser.page.addAndEditPage();
        
        homePage.click('@computerNameCellValue');
        addAndEditPage
            .waitForElementVisible('@deleteButton', 4000)
            .click('@deleteButton');
        browser.pause(1000);
        homePage.assert.containsText('@alertMessage', 'Computer has been deleted')
        homePage.getText('@computerNameCellValue', function(result) {
            this.assert.notEqual('@computerNameCellValue', '12334')
        })
    },
    
    after: function (browser) {
        browser.end();
    }
}
var createUpdateComputer = function(browser, name, introducedDate, discontinuedDate, companyName) {
    var homePage  = browser.page.homePage(); 
    var addAndEditPage = browser.page.addAndEditPage();
        
    addAndEditPage
        .waitForElementVisible('@createButton', 4000)     
        .clearValue('@nameInput')  
        .setValue('@nameInput', name)
        .clearValue('@introducedDateInput')  
        .setValue('@introducedDateInput', introducedDate)
        .clearValue('@discontinuedDateInput')  
        .setValue('@discontinuedDateInput', discontinuedDate)
        .click('@companySelect');
    browser.pause(1000);
    addAndEditPage.click(companyName);
    browser.pause(1000);
    addAndEditPage.click('@createButton');   
    homePage.waitForElementVisible('@addComputerButton', 4000);
    return this;     
    };

var readTableRow = function(browser, name, introducedDate, discontinuedDate, companyName) {
    var homePage  = browser.page.homePage(); 
    var tableIntroDate, tableDiscDate;
    var inputIntroDate = new Date(introducedDate);
    var inputIntroDay = inputIntroDate.getDate();
    var inputIntroMonth = inputIntroDate.getMonth();
    var inputIntroYear = inputIntroDate.getFullYear();
    var inputDiscDate = new Date(discontinuedDate);
    var inputDiscDay = inputDiscDate.getDate();
    var inputDiscMonth = inputDiscDate.getMonth();
    var inputDiscYear = inputDiscDate.getFullYear();
    
    homePage
        .assert.containsText('@computerNameCellValue', name)
        .assert.containsText('@companyCellValue', companyName)
        .getText('@introducedCellValue', function(result) {
            var tableIntroDate = new Date(result.value);
            var tableIntroDay = tableIntroDate.getDate();
            var tableIntroMonth = tableIntroDate.getMonth();
            var tableIntroYear = tableIntroDate.getFullYear();
            this.assert.equal(inputIntroDay, tableIntroDay);
            this.assert.equal(inputIntroMonth, tableIntroMonth);
            this.assert.equal(inputIntroYear, tableIntroYear);
        })
        .getText('@discontinuedCellValue', function(result) {
            var tableDiscDate = new Date(result.value);
            var tableDiscDay = tableDiscDate.getDate();
            var tableDiscMonth = tableDiscDate.getMonth();
            var tableDiscYear = tableDiscDate.getFullYear();
            this.assert.equal(inputDiscDay, tableDiscDay);
            this.assert.equal(inputDiscMonth, tableDiscMonth);
            this.assert.equal(inputDiscYear, tableDiscYear);
         });
    return this;
  };

