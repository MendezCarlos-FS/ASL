// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const planetCtlr = require(`../controllers/planet.js`)
const { checkAcceptHeader } = require("../utilities/middleware.js")

// Create a new Router instance and call it "router"
const router = new express.Router()

// RESTful resource mappings
router.get(`/`, checkAcceptHeader, planetCtlr.index)
router.post(`/`, planetCtlr.create)
router.get(`/:id`, checkAcceptHeader, planetCtlr.show) 
router.put(`/:id`, planetCtlr.update) 
router.delete(`/:id`, planetCtlr.remove) 

// export "router"
module.exports = router
