
// todo)) Make a Pokedex API
const express = require('express');
const app = express(); // server app is created
const mongoose = require('mongoose'); // ODM
const cors = require('cors');

//* Middlewares 🥷🏻
// to use a middleware in express --> app.use()
app.use(express.json()); // it will parse JSON requests
app.use(cors()); // Cross Origin Resource Sharing

// Make a BluePrint of DB
//* Schema -> BluePrint
const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // user cannot leave it empty
  },
  type: {
    type: String,
    required: true,
  },
  power: {
    type: Number,
    required: true,
  },
});

//* when Schema is FINAL we have to make a model
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

//* DB connection
mongoose.connect('mongodb://127.0.0.1:27017/pokemonDB')
  .then(() => {
    console.log('MongoDB connected ✅');
  })
  .catch((err) => {
    console.log('❌ MongoDB connection problem', err);
  });

//* HTTP methods have a charateristic of statelessness -> each endpoint logic will not clash with other endpoint logic
// GET method
// Home route
app.get('/', (req, res) => {
  res.send('🧪 API is working');
});

// POST method --> add new data -> CREATE pokemon
app.post('/pokemons', async (req, res) => {
  console.log('data that user is typing in a form', req.body);
  const pokemon = await Pokemon.create(req.body); // data that user types is in DB now
  res.status(201).json(pokemon);
});

// GET method -> Get the list of all pokemons -> Read
app.get('/pokemons', async (req, res) => {
  const pokemons = await Pokemon.find({});
  res.status(200).json(pokemons);
});

//PUT -> Update method -> update the pokemon using id
//app.put('/pokemons/:name', async (req, res) => {
app.put('/pokemons/:id', async (req, res) => {
  const updated = await Pokemon.findByIdAndUpdate(req.params.id, req.body); // findByIdAndUpdate(id,newData)
  res.json(updated);
});

 // delete method
 app.delete('/pokemons/:id', async (req, res) => {
  try {
    const deleted = await Pokemon.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.json({ message: 'Pokemon deleted successfully', deleted });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
 

// app.get('/', (request, response) => {
//   response.send('Express Home Page 🏠');
// });

// // GET method --> getting data
// app.get('/about', (request, response) => {
//   response.send('About Page 😺');
// });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});