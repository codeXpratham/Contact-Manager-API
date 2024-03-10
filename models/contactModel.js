const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    
    user_id: {
      type : mongoose.Schema.Types.ObjectId,
      require : true,
      ref: "User",   
    },

    name: {
        type: String,
        required: [true, "Add the contact name"],
    },
    email: {
        type: String,
        required: [true, "Add the contact email"],
    },
    phone: {
        type: String,
        required: [true, "Add the contact phone number"],
    }
},
{ timestamps: true }
  
);

module.exports = mongoose.model("Contact" , contactSchema);