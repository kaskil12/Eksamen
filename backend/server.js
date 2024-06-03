const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const sequelizeDB = require("./database.js");
const Utstyr = require("./models/Utstyr.js");
Utstyr.init(sequelizeDB);
const data = require('./DATA.json');

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.static('public'));

async function createAll(data) {
  data.map((item) => {
    return Utstyr.create({
      Produsent: item.Produsent,
      Beskrivelse: item.Beskrivelse,
      Spesifikasjoner: item.Spesifikasjoner,
      Innkjopsdato: item.Innkjopsdato,
      Innkjopspris: item.Innkjopspris,
      ForventetLevetid: item.ForventetLevetid,
      Kategori: item.Kategori,
      Utlånt: item.Utlånt,
      Lånt_av: item.Lånt_av
    });
  });
}

app.get('/getAll', async (req, res) => {
  const allItems = await Utstyr.findAll();
  res.send(allItems);
});

app.post('/loanOut/:id/:name', async (req, res) => {
  console.log(req.params);
  try {
    const { id, name } = req.params;
    await Utstyr.update({ Utlånt: 'Ja', Lånt_av: name }, { where: { number: id } });
    res.send({ status: "Device successfully loaned out" });
  } catch (error) {
    console.error('Error loaning out device:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/returnDevice/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Utstyr.update({ Utlånt: 'Nei', Lånt_av: 'Tom' }, { where: { number: id } });
    res.send({ status: "Device successfully returned" });
  } catch (error) {
    console.error('Error returning device:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/add', async (req, res) => {
  try {
    const newDevice = await Utstyr.create(req.body);
    res.json(newDevice);
  } catch (error) {
    console.error('Error adding device:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/:code', async (req, res) => {
  try {
    await Utstyr.destroy({ where: { code: req.params.code } });
    res.send("Kult");
  } catch (error) {
    console.error('Error deleting device:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

Utstyr.sync({ force: true }).then(() => {
  createAll(data);
}).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
