// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const planetCtlr = require(`../controllers/planet.js`)
const { checkAcceptHeader, uploadImage } = require("../utilities/middleware.js")

// Create a new Router instance and call it "router"
const router = new express.Router()

const bodyParser = require("body-parser");
router.use(express.static(`${__dirname}/../public/uploads/planets/images/`));

// RESTful resource mappings
router.get(`/`, checkAcceptHeader, planetCtlr.index)
router.get('/create', planetCtlr.form);
router.post(`/`, checkAcceptHeader, bodyParser.urlencoded({extended: true}), planetCtlr.create, uploadImage)
router.get(`/:id`, checkAcceptHeader, planetCtlr.show) 
router.get('/:id/edit', planetCtlr.form);
router.put(`/:id`, checkAcceptHeader, planetCtlr.update);
// POST method with ID needed since forms do not support PUT method
router.post(`/:id`, bodyParser.urlencoded({extended: true}), planetCtlr.update, uploadImage); 
router.get(`/:id/delete`, planetCtlr.remove);
router.delete(`/:id`, checkAcceptHeader, planetCtlr.remove);

// export "router"
module.exports = router
