var mongoose = require('mongoose');

// CONNECT
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

var contactSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },
  birthday:{
    type: String,
    required: true
  }
});

var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
