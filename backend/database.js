const { Sequelize } = require('sequelize')


module.exports = new Sequelize({
  storage:"./db.sqlite",
  dialect:'sqlite',
  logging:true,
  sync: {force:true}
});


function saveToDatabase(item) {
  db.run(`INSERT INTO Items(Code, ObjectName) VALUES(?, ?)`, [item.Code, item.ObjectName], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
}
