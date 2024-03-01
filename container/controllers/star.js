const { Star, Planet, Galaxy, StarsPlanets, Sequelize } = require("../models/index");

// Show all resources
const index = async (req, res) => {
  const stars = await Star.findAll({ include: [
    {
      model: Planet,
      through: {attributes: []}
    },
    {
      model: Galaxy
    }
  ] });
  if (res.locals.asJson) {
    // Respond with an array and 2xx status code
    res.status(200).json(stars);
    return;
  }

  res.status(200).render('views/Star/stars.html.twig', {
    stars
  });
}

// Show resource
const show = async (req, res) => {
  const { id } = req.params;
  const star = await Star.findOne({ where: { id }, include: [
    {
      model: Planet,
      through: {attributes: []}
    },
    {
      model: Galaxy
    }
  ] });
  if (res.locals.asJson) {
    // Respond with a single object and 2xx code
    res.status(200).json(star);
    return;
  }

  res.status(200).render('partials/star.html.twig', {
    star
  });
}

const form = async(req, res) => {
  const { id } = req.params || -1;
  let star;
  let selectedPlanetIds = [];
  if (id >= 0) {
    star = await Star.findOne({ where: { id }, include: [
      {
        model: Planet,
        through: {attributes: []}
      }
    ] });
    selectedPlanetIds = star.Planets.map(star => star.id);
  }
  const planets = await Planet.findAll();
  const galaxies = await Galaxy.findAll();
  res.render("views/Star/starForm.html.twig", { star, planets, galaxies, selectedPlanetIds });
}

// Create a new resource
const create = async (req, res) => {
  const { body } = req;
  const { planetIds } = body;
  const tempStar =  {
    ...body,
    galaxyId: body.galaxyId ? body.galaxyId : null
  }
  const star = await Star.create(tempStar);
  await star.addPlanets(planetIds);
  if (res.locals.asJson) {
    // Issue a redirect with a success 2xx code
    res.redirect(201, '/stars');
    return;
  }

  res.redirect(303, "/stars");
}

// Update an existing resource
const update = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const tempStar =  {
    ...body,
    galaxyId: body.galaxyId ? body.galaxyId : null
  }
  const planetIds = typeof body.planetIds === "string" ? [body.planetIds] : (body.planetIds || []);
  await Star.update(tempStar, { where: { id }});
  planetIds.forEach(async planetId => {
    await StarsPlanets.findOrCreate({ where: { planetId, starId: id }});
  });
  const Op = Sequelize.Op;
  await StarsPlanets.destroy({where: { planetId: { [Op.notIn]: planetIds} , starId: id }});
  if (res.locals.asJson) {
    // Respond with a single resource and 2xx code
    res.status(200).json(`/stars/${req.params.id}`);
    return;
  }

  res.redirect(303, `/stars`);
}

// Remove a single resource
const remove = async (req, res) => {
  const { id } = req.params;
  await StarsPlanets.destroy({where: { starId: id }});
  await Star.destroy({ where: { id }});
  if (res.locals.asJson) {
    // Respond with a 2xx status code and bool
      res.status(204).json(true);
      return;
    }

  res.redirect(303, "/stars");
}

// Export all controller actions
module.exports = { index, show, form, create, update, remove }
