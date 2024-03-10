const asyncHandler = require('express-async-handler');
const { findByIdAndUpdate } = require('../models/contactModel');
const Contact = require("../models/contactModel");
asyncHandler();

// @desc get all contacts
// @routes GET /api/contacts
// @access private 
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
    // res.status(200).json({messege: "get all contacts"});
}); 


// @desc Get contacts
// @routes GET /api/contacts/:id
// @access private 

const createContact = asyncHandler(async (req, res) => {
    console.log("req body is" , req.body);

    const {name , email, phone} = req.body;
    if(!name || !email || !phone){
        // res.status(404).json({messege: "body is not valid"});
        res.status(404);
        throw new Error("all fields are required");
    }
    
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id : req.user.id
    });
    res.status(201).json(contact);
    // res.status(201).json({messege: "create contact"});
}); 

// @desc get all contacts
// @routes GET /api/contacts/:id
// @access private 

const getContactid = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact); 
    // res.status(200).json({messege: `get contact for${req.params.id}`}); 
}); 
// @desc PUT new contacts
// @routes PUT /api/contacts/:id
// @access private 

const updateContact = asyncHandler(async  (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    
    if(contact.user_id.toString() !== req.user.id){
       res.status(403);
       throw new Error("User don't have permission to update other user contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(200).json(updatedContact); 
    // res.status(200).json({messege: `update contact ${req.params.id}`}); 
}); 

// @desc Delete new contacts
// @routes DELETE /api/contacts/:id
// @access private 

const deleteContact = asyncHandler(async (req, res) => {
    
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contact");
     }
    
     await Contact.deleteOne({_id: req.params.id}); 
    // await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json(contact); 
    // res.status(200).json({messege: `delete contact for ${req.params.id}`}); 
}); 

module.exports = {getContact , createContact , updateContact , deleteContact , getContactid};