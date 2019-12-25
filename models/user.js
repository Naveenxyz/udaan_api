let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/flights', {useNewUrlParser: true});
let uschema=mongoose.Schema({
    name: {
        "type": "String"
      },
    bookings: {
        "type": [
          "Mixed"
        ]
      }
})
module.exports = mongoose.model('uschema', uschema)


// Approximate model for user

// {
//     "name": "Naveen",
//     "bookings": [{
//       "id":"someid",
//       "nos":12,
//       "source":"Bangalore",
//       "destination":"mumbai",
//       "date":"10/12/2016"
//     }]
//   }