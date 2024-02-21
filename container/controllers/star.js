const { Star, Planet } = require("../models/index");

// Show all resources
const index = async (req, res) => {
  const stars = await Star.findAll({ include: [{model: Planet}] });
  // Respond with an array and 2xx status code
  res.status(200).json(stars);
}

// Show resource
const show = async (req, res) => {
  const { id } = req.params;
  const star = await Star.findOne({ where: { id }, include: [{model: Planet}] });
  // Respond with a single object and 2xx code
  res.status(200).json(star);
}

// Create a new resource
const create = async (req, res) => {
  const { body } = req;
  console.log(body);
  await Star.create(body);
  // Issue a redirect with a success 2xx code
  res.redirect(`/stars`, 201)
}

// Update an existing resource
const update = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  await Star.update(body, { where: { id }});
  // Respond with a single resource and 2xx code
  res.status(200).json(`/stars/${req.params.id}`, )
}

// Remove a single resource
const remove = async (req, res) => {
  const { id } = req.params;
  await Star.destroy({ where: { id }});
  // Respond with a 2xx status code and bool
  res.status(204).json(true)
}

// Export all controller actions
module.exports = { index, show, create, update, remove }
