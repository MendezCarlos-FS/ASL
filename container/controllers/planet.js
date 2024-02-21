const { Planet } = require("../models/index");

// Show all resources
const index = async (req, res) => {
  const planets = await Planet.findAll();
  // Respond with an array and 2xx status code
  res.status(200).json(planets)
}

// Show resource
const show = async (req, res) => {
  const { id } = req.params;
  const planet = await Planet.findOne({ where: { id }});
  // Respond with a single object and 2xx code
  res.status(200).json(planet);
}

// Create a new resource
const create = async (req, res) => {
  const { body } = req;
  await Planet.create(body);
  // Issue a redirect with a success 2xx code
  res.redirect(201, '/planets');
}

// Update an existing resource
const update = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  await Planet.update(body, { where: { id }});
  // Respond with a single resource and 2xx code
  res.status(200).json(`/planets/${req.params.id}`, )
}

// Remove a single resource
const remove = async (req, res) => {
  const { id } = req.params;
  await Planet.destroy({ where: { id }});
  // Respond with a 2xx status code and bool
  res.status(204).json(true)
}

// Export all controller actions
module.exports = { index, show, create, update, remove }
