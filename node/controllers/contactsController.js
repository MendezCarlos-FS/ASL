const contactData = require("@jworkman-fs/asl/src/Data/contacts");
const Pager = require("@jworkman-fs/asl/src/Util/Pager");
const { PagerLimitExceededError } = require("../exceptions/pager");
const { InvalidContactSchemaError } = require("@jworkman-fs/asl/src/Exception/index");
const { sortContacts, filterContacts } = require("@jworkman-fs/asl/src/index");

const validOperators = ["eq", "gt", "gte", "lt", "lte"];

function getContacts(req, res) {
    const {page, size, sort, direction} = req.query;
    const filterBy = req.headers["x-filter-by"];
    const filterOperator = req.headers["x-filter-operator"];
    const filterValue = req.headers["x-filter-value"];

    try {
        if (size > 20) {
            throw new PagerLimitExceededError("The limit per page cannot exceed 20.")
        }
        if (direction && direction !== "asc" && direction !== "desc") {
            throw new InvalidContactSchemaError(`${direction} is not a valid direction. Valid directions are asc and desc.`);
        }
        if (filterOperator && !validOperators.includes(filterOperator)) {
            throw new InvalidContactSchemaError(`${filterOperator} is not a valid operator. Valid operators are eq, gt, gte, lt or lte.`);
        }
        const filteredData = filterContacts(filterBy, filterOperator, filterValue, contactData);
        const sortedData = sortContacts(filteredData, sort ? sort : "fname", direction ? direction : "asc");
        const pager = new Pager(sortedData, page ? page : 1, size);
        res.set("X-Page-Total", pager.pages)
        res.set("X-Page-Next", pager.next())
        res.set("X-Page-Prev", pager.prev())
        res.status(200).json(pager.results());
    } catch(err) {
        switch(err.name) {
            case "PagerLimitExceededError":
            case "PagerOutOfRangeError":
            case "InvalidContactSchemaError":
            case "NoContactsFoundError":
                res.status(err.statusCode).json({
                    message: err.message
                });
                break;
            default:
                const message = err.message ? err.message : "A bad request was received. There might be an invalid value in the request."
                res.status(err.statusCode ? err.statusCode : 400).json(message);
        }
    }
}

module.exports = {
    getContacts,

}