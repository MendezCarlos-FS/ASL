const express = require("express");
const { getContacts, getContactById } = require("../controllers/contactsController");
const contactsRouter = express();

contactsRouter.get("/contacts", getContacts);
contactsRouter.get("/contacts/:id", getContactById);
contactsRouter.post("/contacts");
contactsRouter.put("/contacts");
contactsRouter.delete("/contacts");

module.exports = contactsRouter;