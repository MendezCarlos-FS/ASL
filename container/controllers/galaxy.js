const { Galaxy, Star, Planet } = require("../models/index");

// Show all resources
const index = async (req, res) => {
  const galaxies = await Galaxy.findAll({ include: {
    model: Star,
    include: {
      model: Planet,
      through: {attributes: []}
    }
  }});
  // Respond with an array and 2xx status code
  res.status(200).json(galaxies);
}

// Show resource
const show = async (req, res) => {
  const { id } = req.params;
  const galaxy = await Galaxy.findOne({ where: { id }, include: {
    model: Star,
    include: {
      model: Planet,
      through: {attributes: []}
    }
  }});
  // Respond with a single object and 2xx code
  res.status(200).json(galaxy)
}

// Create a new resource
const create = async (req, res) => {
  const { body } = req;
  await Galaxy.create(body);
  // Issue a redirect with a success 2xx code
  res.redirect(`/galaxies`, 201)
}

// Update an existing resource
const update = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  await Galaxy.update(body, { where: { id }});
  // Respond with a single resource and 2xx code
  res.status(200).json(`/galaxies/${req.params.id}`, )
}

// Remove a single resource
const remove = async (req, res) => {
  const { id } = req.params;
  await Galaxy.destroy({ where: { id }});
  // Respond with a 2xx status code and bool
  res.status(204).json(true)
}

// Export all controller actions
module.exports = { index, show, create, update, remove }
