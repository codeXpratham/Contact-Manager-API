const express = require('express');

const router = express.Router();
const {getContact, deleteContact, updateContact, getContactid, createContact} = require('../controllers/contactControllers');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.route("/").get(getContact).post(createContact);
router.route("/:id").get(getContactid).put(updateContact).delete(deleteContact);



module.exports = router;