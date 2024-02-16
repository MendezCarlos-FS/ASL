const express = require("express");
const { getContacts, getContactById, createContact, updateContact, deleteContact } = require("../controllers/contactsController");
const contactsRouter = express();

contactsRouter.get("/contacts", getContacts);
contactsRouter.get("/contacts/:id", getContactById);
contactsRouter.post("/contacts", createContact);
contactsRouter.put("/contacts/:id", updateContact);
contactsRouter.delete("/contacts/:id", deleteContact);

module.exports = contactsRouter;