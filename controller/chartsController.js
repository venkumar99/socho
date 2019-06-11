import path from 'path';

var chartsController = {};

chartsController.graphs = function(req, res) {
    let chartName = req.params.chartName + '.html';
    res.sendFile( chartName, { root: path.join(__dirname, '../public/charts')});
}

module.exports = chartsController;