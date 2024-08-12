const { Model, DataTypes } = require("sequelize")

const PLAYERS_TABLE = "players"

class Player extends Model {
    static config(sequelize) {
        return {
            sequelize, 
            tableName: PLAYERS_TABLE,
            modelName: "Player",
            timestamps: false
        }
    }
}

const playerSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      player_id: {
        allowNull: false,
        unique: true,
        type: DataTypes.BIGINT,
        field: "player_id",
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "name",
      },
      team_name: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "team_name",
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,
        field: "image"
      }
    }

    module.exports = {
      Player,
      playerSchema
    }