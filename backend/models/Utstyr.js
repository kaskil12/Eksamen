const {Model, DataTypes} = require("sequelize");

module.exports = class Utstyr extends Model {
    static init(sequelize) {
        return super.init({
            number: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            Produsent: {
                type: DataTypes.STRING, 
                defaultValue: "Tom"
            },
            Beskrivelse: {
                type: DataTypes.STRING,
                defaultValue: "Tom"
            },
            Spesifikasjoner: {
                type: DataTypes.STRING,
                defaultValue: "Tom"
            },
            Innkjopsdato: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            Innkjopspris: {
                type: DataTypes.FLOAT,
                defaultValue: 0
            },
            ForventetLevetid: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            Kategori: {
                type: DataTypes.STRING,
                defaultValue: "Tom"
            },
            Utlånt: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            Lånt_av: {
                type: DataTypes.STRING,
                defaultValue: "Tom"
            }
        },
        {
            tableName: "Utstyr",
            createdAt: false,
            updatedAt: false,
            sequelize
        })
    }
}
// "Produsent": "Hewlett Packard",
//         "Beskrivelse": "HP Envy Desktop TE01-4254",
//         "Spesifikasjoner": "Intel Core i7-13700, 16GB RAM, 1TB SSD, Intel UHD Graphics 770, Windows 11 Home",
//         "Innkjopsdato": "15.08.2023",
//         "Innkjopspris": 999.99,
//         "Forventet levetid (i \u00e5r)": 5,
//         "Kategori": "Datamaskiner"
//     ,
// "Utlånt": false