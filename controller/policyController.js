import fs from 'fs';


var policyController = {};

policyController.getTermOfService = function(req, res) {

    console.log("term and service");
    var pdfData = fs.readFileSync('./public/TermsOfService.pdf');
    //console.log("pdf", pdfData);
    res.contentType("application/pdf");
    res.send(pdfData);
};

module.exports = policyController;