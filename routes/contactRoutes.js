const express = require('express');
const router = express.Router();

// routes form controller
const{ getContacts , getContact , createContact , updateContact, deleteContact}= require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');
// for our project /api/project is common so we create the routes for that

// path is same for get and post method so we can call like these
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);

// path is same for put , get contact by id and deltye by id

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);







module.exports = router;