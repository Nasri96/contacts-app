const express = require("express");
const router = express.Router({ mergeParams: true});
const { getContacts, createContact, getContact, updateContact, deleteContact } = require("../controllers/contact");
const { checkIsLoggedIn, checkUserAuthorization } = require("../middleware/auth");

// INDEX
router.get("/", checkIsLoggedIn, checkUserAuthorization, getContacts);

// CREATE
router.post("/", checkIsLoggedIn, checkUserAuthorization, createContact);

// SHOW
router.get("/:contactid", checkIsLoggedIn, checkUserAuthorization, getContact);

// UPDATE
router.patch("/:contactid", checkIsLoggedIn, checkUserAuthorization, updateContact);

// DELETE
router.delete("/:contactid", checkIsLoggedIn, checkUserAuthorization, deleteContact);

module.exports = router;