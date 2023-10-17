const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");


// @route .....GET /api/contacts
// @access ......Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts);
});

// @desc ....Get single contact
// @route .....GET /api/contacts/:id
// @access ......Private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc ....Create a new contact
// @route .....POST /api/contacts
// @access ......Private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({ name, email, phone , user_id:req.user.id });
  res.status(201).json(contact);
});

// @desc ....Update a contact
// @route .....PUT /api/contacts/:id
// @access ......Private
const updateContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  const checkContact = await Contact.findById(req.params.id);
  if(checkContact.user_id.toString() !== req.user.id) {
    res.status(404);
    throw new Error("no permission to acess other contacts");
  }
  if (!checkContact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { name, email, phone },
    { new: true, runValidators: true }
  );
  res.status(200).json(contact);
});

// @desc ....Delete a contact
// @route .....DELETE /api/contacts/:id
// @access ......Private
const deleteContact = asyncHandler(async (req, res) => {
  const checkContact = await Contact.findById(req.params.id);
  if(checkContact.user_id.toString() !== req.user.id) {
    res.status(404);
    throw new Error("no permission to acess other contacts");
  }
  if (!checkContact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const contact = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
