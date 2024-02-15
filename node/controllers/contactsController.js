const contactData = require("@jworkman-fs/asl/src/Data/contacts");
const Pager = require("@jworkman-fs/asl/src/Util/Pager");
const { PagerLimitExceededError } = require("../exceptions/pager");
const { InvalidContactSchemaError } = require("@jworkman-fs/asl/src/Exception/index");
const { sortContacts } = require("@jworkman-fs/asl/src/index");

function getContacts(req, res) {
    const {page, size, sort, direction} = req.query;
    try {
        if (size > 20) {
            throw new PagerLimitExceededError("The limit per page cannot exceed 20.")
        }
        if (direction && direction !== "asc" && direction !== "desc") {
            throw new InvalidContactSchemaError(`${direction} is not a valid direction. Valid directions are asc and desc.`);
        }
        const sortedData = sortContacts(contactData, sort ? sort : "fname", direction ? direction : "asc");
        const pager = new Pager(sortedData, page ? page : 1, size);
        res.status(200).json(pager.results());
    } catch(err) {
        switch(err.name) {
            case "PagerLimitExceededError":
            case "PagerOutOfRangeError":
            case "InvalidContactSchemaError":
                res.status(err.statusCode).json({
                    message: err.message
                });
                break;
            default:
                res.status(err.statusCode ? err.statusCode : 400).json(err);
        }
    }
}

module.exports = {
    getContacts,

}