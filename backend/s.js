
const sequelizeDB = require("./database.js");
const Utstyr = require("./models/Utstyr.js");
Utstyr.init(sequelizeDB);
Utstyr.sync({force: true}).then(() => {
    
    Utstyr.create({
        Produsent: "Hewlett Packard",
    })
    console.log("Utstyr table created");
})

