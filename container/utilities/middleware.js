const util = require("util");
const path = require("path");

// Load in our Sequelize models
const { Planet, Star, Galaxy } = require('../models')

function checkAcceptHeader(req, res, next) {
    const acceptHeader = req.get("Accept");
    if (acceptHeader?.indexOf("application/json") >= 0) {
        res.locals.asJson = true;
    }
    next();
}

async function uploadImage(req, res, next) {
    // Define the absolute final file path for this image
    let uploadPath = `${__dirname}/../public/uploads/`;
    let id;
    let model;

    // If the previous middleware did not pass us an id then bail
    if (req.planetId) {
        id = req.planetId;
        uploadPath += `planets/images/%s%s`;
        model = Planet;
    } else if (req.starId) {
        id = req.starId;
        uploadPath += `stars/images/%s%s`;
        model = Star;

    } else if (req.galaxyId) {
        id = req.galaxyId;
        uploadPath += `galaxies/images/%s%s`;
        model = Galaxy;
    } else {
        return;
    }

    const files = req.files || [];

    // Check to see if there are any files to upload
    if (Object.keys(files).length > 0) {
        // Get the extension from the incoming file (ie: .png,.jpg,.gif)
        const extension = path.extname(req.files.image.name);
        // Render the final file path based off the imageId and file extension
        uploadPath = util.format(uploadPath, id, extension);
        
        // Perform the move/mv operation that moves the file from a temp directory to our final path
        return await req.files.image.mv(uploadPath)
        // Update the model with the new file extension uploaded
        .then(async () => await model.update(
                { extension },
                { where: { id: Number(id) } }
            )
        )
    }
}

module.exports = {
    checkAcceptHeader,
    uploadImage
}