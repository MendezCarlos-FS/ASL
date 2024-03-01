// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const starCtlr = require(`../controllers/star.js`)
const { checkAcceptHeader } = require("../utilities/middleware.js");

// Create a new Router instance and call it "router"
const router = new express.Router()

const bodyParser = require("body-parser");

// RESTful resource mappings
router.get(`/`, checkAcceptHeader, starCtlr.index)
router.get('/create', starCtlr.form);
router.post(`/`, bodyParser.urlencoded({extended: true}), starCtlr.create)
router.get(`/:id`, checkAcceptHeader, starCtlr.show) 
router.get('/:id/edit', starCtlr.form);
router.put(`/:id`, starCtlr.update) 
// POST method with ID needed since forms do not support PUT method
router.post(`/:id`, bodyParser.urlencoded({extended: true}), starCtlr.update);
router.get(`/:id/delete`, starCtlr.remove);
router.delete(`/:id`, starCtlr.remove);

// export "router"
module.exports = router
