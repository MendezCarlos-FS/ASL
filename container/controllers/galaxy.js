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
  if (res.locals.asJson) {
    // Respond with an array and 2xx status code
    res.status(200).json(galaxies);
    return;
  }

  res.status(200).render('views/Galaxy/galaxies.html.twig', {
    galaxies
  });
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
  if (res.locals.asJson) {
    // Respond with a single object and 2xx code
    res.status(200).json(galaxy);
    return;
  }

  res.status(200).render('views/Galaxy/galaxy.html.twig', {
    galaxy
  });
}

const form = async(req, res) => {
  const { id } = req.params || -1;
  let galaxy;
  if (id >= 0) {
    galaxy = await Galaxy.findOne({ where: { id }});
  }
  res.render("views/Galaxy/galaxyForm.html.twig", { galaxy });
}

// Create a new resource
const create = async (req, res, next) => {
  const { body } = req;
  const galaxy = await Galaxy.create(body);

  req.galaxyId = galaxy.id;
  next();

  if (res.locals.asJson) {
    // Issue a redirect with a success 2xx code
    res.redirect(201, '/galaxies');
    return;
  }

  res.redirect(303, "/galaxies");
}

// Update an existing resource
const update = async (req, res, next) => {
  const { body } = req;
  const { id } = req.params;
  await Galaxy.update(body, { where: { id }});

  req.galaxyId = id;
  next();

  if (res.locals.asJson) {
    // Respond with a single resource and 2xx code
    res.status(200).json(`/galaxies/${req.params.id}`);
    return;
  }

  res.redirect(303, `/galaxies`);
}

// Remove a single resource
const remove = async (req, res) => {
  const { id } = req.params;
  await Galaxy.destroy({ where: { id }});
  if (res.locals.asJson) {
    // Respond with a 2xx status code and bool
    res.status(204).json(true);
    return;
  }

  res.redirect(303, "/galaxies");
}

// Export all controller actions
module.exports = { index, show, form, create, update, remove }
