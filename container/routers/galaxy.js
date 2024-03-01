// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`)
const { checkAcceptHeader, uploadImage } = require("../utilities/middleware.js");

// Create a new Router instance and call it "router"
const router = new express.Router()

const bodyParser = require("body-parser");
router.use(express.static(`${__dirname}/../public/uploads/galaxies/images/`));

// RESTful resource mappings
router.get(`/`, checkAcceptHeader, galaxyCtlr.index);
router.get('/create', galaxyCtlr.form);
router.post(`/`, checkAcceptHeader, bodyParser.urlencoded({extended: true}), galaxyCtlr.create, uploadImage);
router.get(`/:id`, checkAcceptHeader, galaxyCtlr.show);
router.get('/:id/edit', galaxyCtlr.form);
router.put(`/:id`, checkAcceptHeader, galaxyCtlr.update);
// POST method with ID needed since forms do not support PUT method
router.post(`/:id`, bodyParser.urlencoded({extended: true}), galaxyCtlr.update, uploadImage);
router.get(`/:id/delete`, galaxyCtlr.remove);
router.delete(`/:id`, checkAcceptHeader, galaxyCtlr.remove);

// export "router"
module.exports = router
