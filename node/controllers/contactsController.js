const contactData = require("@jworkman-fs/asl/src/Data/contacts");
const Pager = require("@jworkman-fs/asl/src/Util/Pager");
const { PagerLimitExceededError } = require("../exceptions/pager");

function getContacts(req, res) {
    const {page, size} = req.query;
    try {
        if (size > 20) {
            throw new PagerLimitExceededError("The limit per page cannot exceed 20.")
        }
        const pager = new Pager(contactData, page ? page : 1, size);
        const data = pager.results();
        res.status(200).json(data);
    } catch(err) {
        switch(err.name) {
            case "PagerLimitExceededError":
            case "PagerOutOfRangeError":
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