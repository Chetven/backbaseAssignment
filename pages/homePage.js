var readCommands = {
  
    readTableRow: function(browser, name, introducedDate, discontinuedDate, companyName) {
      return this
        browser
        .assert('@computerNameCellValue', name)
        .assert('@introducedCellValue', introducedDate)
        .assert('@discontinuedCellValue', discontinuedDate)
        .assert('@companyCellValue', companyName)
  }
    
};
module.exports = {
	commands: [readCommands],
    elements : {
		title : '#main>h1',
		filterInput : '#searchbox',
		filterButton : '#searchsubmit',
		addComputerButton : '.success',
		computerNameHeader : '.col2.header',
        introducedHeader : '.col3.header',
        discontinuedHeader : '.col4.header',
        companyHeader : '.col5.header',
        computerNameCellValue : 'tbody>tr:first-child>td:first-child>a',
        introducedCellValue : 'tbody>tr:first-child>td:nth-of-type(2)',
        discontinuedCellValue : 'tbody>tr:first-child>td:nth-of-type(3)',
        companyCellValue : 'tbody>tr:first-child>td:nth-of-type(4)',
        prevPagination : '#pagination > ul> li.prev',
        currentPagination : '#pagination > ul> li.current',
        nextPagination : '#pagination > ul> li.next',
        alertMessage: '.alert-message.warning'
	}
    
}