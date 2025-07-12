import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/pokemons'; //! our backend API

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [form, setForm] = useState({ name: '', type: '', power: '' });
  const [editId, setEditId] = useState(null);

  // get the pokemons data from backend
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setPokemons(response.data);
    } catch (err) {
      console.error('Failed to fetch pokemon list: ', err.message);
      alert('⚠ Error fetching data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  // Add or Update Pokemon
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {

        await axios.put(`${API_URL}/${editId}`, form);
        alert('Pokemon Updated Successfully ✅');
        setEditId(null); 
      } else {
        await axios.post(API_URL, form);
        alert('Pokemon added Successfully ✅');
      }
      setForm({ name: '', type: '', power: '' });
      fetchData();
    } catch (err) {
      console.error('error in submitting the form', err.message);
      alert('❌ Failed to submit Pokemon');
    }
  };

  // edit Pokemon
  const handleEdit = (poke) => {
    setForm({ name: poke.name, type: poke.type, power: poke.power });
    setEditId(poke._id);
  };





  // while user is typing handleChange will run again and again
  // e is the event that user is typing -> it is an object
  const handleChange = (e) => {
    console.log(e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log('formData', form);

  //handle delete
  // Delete Pokemon
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this Pokémon?");
    if (!confirm) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      alert('Pokemon deleted successfully ❌');
      fetchData(); // refresh the list
    } catch (err) {
      console.error('Failed to delete pokemon', err.message);
      alert('⚠ Failed to delete Pokémon');
    }
  };




  return (
    <div style={{ padding: 20, margin: 'auto', maxWidth: 300 }}>
      <h1>Pokemon CRUD 🔥</h1>
      <br /><br />
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <label>Name </label>
        <input name='name' value={form.name} onChange={handleChange} required />
        <br /><br />
        <label>Type </label>
        <input name='type' value={form.type} onChange={handleChange} required />
        <br /><br />
        <label>Power </label>
        <input
          name='power'
          value={form.power}
          type='number'
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type='submit' style={{ backgroundColor: 'green', color: 'white' }}>
         Add a Pokemon
         
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {pokemons.map((item) => {
          console.log(item);
          return (
            <><li>
              <strong>Name:  {item.name}</strong>
            </li><li>
                <strong>Type:  {item.type}</strong>
              </li>
              <li>
                <strong>Power:  {item.power}</strong>
                <br /><br />
                <button onClick={() => handleEdit(item)} style={{ marginRight: 10 }}>Edit ✏️</button>
                <button onClick={() => handleDelete(item._id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete 🗑️</button>
              </li><br />




            </>

          );
        })}
      </ul>

    </div>
  );
};

export default App;
