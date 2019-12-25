let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/flights', {useNewUrlParser: true});
let fschema=mongoose.Schema({
    source: {
        "type": "String"
      },
      destination: {
        "type": "String"
      },
      seats: {
        "type": "Number"
      },
      booked: {
        "type": "Number"
      },
      date: {
        "type": "String"
      }
})
module.exports = mongoose.model('fschema', fschema)
