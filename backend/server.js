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
      ForventetLevetid: item.ForlentetLevetid,
      Kategori: item.Kategori,
      Utlånt: item.Utlånt,
    });
  });
}

app.get('/getAll', async (req, res) => {
  console.log(await Utstyr.findAll());
  res.send(await Utstyr.findAll());
});

app.get('/getAllDevices', async (req, res) => {
  try {
    const devices = await Utstyr.findAll({
      attributes: ['id', 'Beskrivelse']
    });
    res.json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/loanOut/:id', async (req, res) => {
  try {
    const deviceId = req.params.id;

    await Utstyr.update({ Utlånt: 'Ja' }, { where: { id: deviceId } });

    res.send({ status: "Device successfully loaned out" });
  } catch (error) {
    console.error('Error loaning out device:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/returnDevice/:id', async (req, res) => {
  try {
    const deviceId = req.params.id;

    await Utstyr.update({ Utlånt: 'Nei' }, { where: { id: deviceId } });

    res.send({ status: "Device successfully returned" });
  } catch (error) {
    console.error('Error returning device:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/add', async (req, res) => {
  try {
    const newDevice = await Utstyr.create({
      Produsent: req.body.Produsent,
      Beskrivelse: req.body.Beskrivelse,
      Spesifikasjoner: req.body.Spesifikasjoner,
      Innkjopsdato: req.body.Innkjopsdato,
      Innkjopspris: req.body.Innkjopspris,
      ForventetLevetid: req.body.ForlentetLevetid,
      Kategori: req.body.Kategori,
      Utlånt: req.body.Utlånt,
    });
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
