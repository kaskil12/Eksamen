const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const port = 8080;
const sequelizeDB = require("./database.js");
const Utstyr = require("./models/Utstyr.js");
const Users = require("./models/Users.js");

Utstyr.init(sequelizeDB);
Users.init(sequelizeDB);
const data = require("./DATA.json");

app.use(cors({ origin: "10.0.0.155:8080" }));
app.use(express.json());
app.use(express.static("public"));

const JWT_SECRET = "your_jwt_secret";

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
      Lånt_av: item.Lånt_av,
      Mobil: item.Mobil,
    });
  });
}

app.get("/getAll", async (req, res) => {
  const allItems = await Utstyr.findAll();
  res.send(allItems);
});

app.post("/loanOut/:id/:name/:mobil", async (req, res) => {
  console.log(req.params);
  try {
    const { id, name } = req.params;
    await Utstyr.update(
      { Utlånt: "Ja", Lånt_av: name, Mobil: req.params.mobil },
      { where: { number: id } }
    );
    res.send({ status: "Device successfully loaned out" });
  } catch (error) {
    console.error("Error loaning out device:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/returnDevice/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Utstyr.update(
      { Utlånt: "Nei", Lånt_av: "Tom", Mobil: "Tom" },
      { where: { number: id } }
    );
    res.send({ status: "Device successfully returned" });
  } catch (error) {
    console.error("Error returning device:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/add", async (req, res) => {
  try {
    const newDevice = await Utstyr.create(req.body);
    res.json(newDevice);
  } catch (error) {
    console.error("Error adding device:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/:code", async (req, res) => {
  try {
    await Utstyr.destroy({ where: { code: req.params.code } });
    res.send("Kult");
  } catch (error) {
    console.error("Error deleting device:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  const { username, password, phone } = req.body; // Extract phone number
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({ username, password: hashedPassword, phone });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/user/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await Users.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Assuming you have a field named 'phone' in the Users model
    const userData = { name: user.username, mobilnummer: user.phone };
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

Utstyr.sync({ force: true })
  .then(() => {
    createAll(data);
  })
  .then(() => {
    Users.sync({ force: true });
    return Users.initialize();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  });
