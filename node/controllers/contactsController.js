const contactData = require("@jworkman-fs/asl/src/Data/contacts");

function getContacts(req, res) {
    console.log(req.method);
    res.status(200).json({
        contactData
    });
}

module.exports = {
    getContacts,

}