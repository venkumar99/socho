import mongoose from 'mongoose';
import Beer from '../models/beer';


var Controller = {};

//controller.save = function(req,res) {
Controller.addBeer = function(req,res) {
    var beer = new Beer();
    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;

    beer.save(function(err) {
        if(err) {
            res.send('Error Sabing Beer');
        }
        else {
            res.send('Beer added: '+ beer);
        }
    });
    
}

//Get list of all Beers
Controller.list = function(req,res) {
    console.log('Inside list');
    Beer.find({}).exec(function (err,beers) {
        if(err) {
            res.send('Eror geeting list of Beers');
        }
        else {
            res.send(beers);
        }
    });
}

//Get Beer by ID
Controller.getBeerById = function(req,res) {
    console.log('Inside getBeersById');
    Beer.findOne({_id:req.params.beer_id}).exec(function(err,beer){
        if(err) {
            res.send('Error Getting Beer');
        }
        else {
            res.send('Beer = '+beer);
        }
    });
}

//Update the Beer
Controller.updateBeer = function(req,res) {
    //var beer = new Beer();
    Beer.findOne({_id:req.params.beer_id}).exec(function(err,beer){
        if(err) {
            res.send('Error finding Beer to Update');
        }
        else {
            beer.quantity = req.body.Quantity;
            console.log('bodyQuantity = '+req.body.Quantity);
            
            beer.save(function(err){
                if(err) {
                    res.send('Error updating Beer Quantity');
                }
                else {
                    res.send('Beer Updated: '+ beer.quantity)
                }
            });
            
        }
    });
}


module.exports = Controller;

