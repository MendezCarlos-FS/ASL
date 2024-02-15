const express = require("express");
const { getContacts, getContactById, createContact } = require("../controllers/contactsController");
const contactsRouter = express();

contactsRouter.get("/contacts", getContacts);
contactsRouter.get("/contacts/:id", getContactById);
contactsRouter.post("/contacts", createContact);
contactsRouter.put("/contacts");
contactsRouter.delete("/contacts");

module.exports = contactsRouter;