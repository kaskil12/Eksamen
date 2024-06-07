const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = class Users extends Model {
  static init(sequelize) {
    return super.init(
      {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        tableName: "Users",
        createdAt: true,
        updatedAt: true,
        sequelize,
      }
    );
  }



  static async createDefaultAdmin() {
    try {
      const existingAdmin = await this.findOne({ where: { username: "admin" } });
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash("123", 10);
        await this.create({
          username: "admin",
          password: hashedPassword,
          isAdmin: true,
        });
        console.log("Default admin user created successfully.");
      } else {
        console.log("Default admin user already exists.");
      }
    } catch (error) {
      console.error("Error creating default admin user:", error);
    }
  }
  
  

  static async initialize() {
    await this.sync();
    await this.createDefaultAdmin();
  }
};
