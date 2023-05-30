const express = require('express');                              // Import Express
const mongoose = require('mongoose');                            // Import Moongoes For database connectivity
const app = express();                                           // Import express methods                                              // Secure the port no. for backend
var cors = require('cors')


app.use(express.json());                                         // Give Support of JSON to get & post
app.use(cors());
mongoose.connect('mongodb+srv://gharwalapvt:Gharwala%40pvt1@gw0.cfigeup.mongodb.net/gharwala').then(() => console.log('Connected!'));

// Schema for creating user model
const Users = mongoose.model('Users', {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Schema for creating room model
const Properties = mongoose.model('Properties', {
  address: {
    type: String,
  },
  price: {
    type: String,
  },
  rooms: {
    type: String,
  },
  types: {
    type: String,
  },
  facilities: {
    type: String,
  },
  allowed: {
    type: String,
  },
  avilabiltiy: {
    type: Boolean,
  },

  date: {
    type: Date,
    default: Date.now
  }


});

// Route 1 : Create an endpoint at ip:4000/ for checking connection to backend
app.all('/', (req, res) => {
  res.send('api working')
})

//
app.post('/signup', async (req, res) => {
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  user.save().then(() => console.log("User Saved"));
  success = true;
  const token = user.email;
  res.json({ success, token })

})

app.post('/addproperty', async (req, res) => {
  const property = new Properties({
    address: req.body.address,
    price: req.body.price,
    rooms: req.body.rooms,
    types: req.body.types,
    allowed: req.body.allowed,
    facilities: req.body.facilities,
    avilabiltiy: true
  })
  property.save().then(() => console.log("Property Saved"));
  success = true;
  res.json(success)
})

app.get('/property', async (req, res) => {
  let proper = await Properties.find({ avilabiltiy: true });
  res.send(proper);
})

// Route 3 : Create an endpoint at ip:4000/login for login the user and giving token
app.post('/login', async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    let success = false;
    if (user) {
      if (req.body.password === user.password) {
        success = true;
        let token = user.email;
        res.json({ success, token });
      }
      else {
        return res.status(400).json({ success: success, errors: "please try with correct email/password" })
      }

    }
    else {
      return res.status(400).json({ success: success, errors: "please try with correct email/password" })
    }
  } catch (error) {
    console.log("login");
  }

})

// Route 4 : Create an endpoint at ip:4000/login for login the user and giving token
app.post('/ownerlogin', async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    let success = false;
    if (user) {
      if (req.body.password === user.password);
      {
        success = true;
        let token = user.email;
        res.json({ success, token });
      }
      return res.status(400).json({ success: success, errors: "please try with correct email/password" })
    }
    else {
      return res.status(400).json({ success: success, errors: "please try with correct email/password" })
    }
  } catch (error) {
    console.log("signup");
  }

})

app.listen(process.env.PORT || 4000) 