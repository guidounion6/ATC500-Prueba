const { Model, DataTypes } = require("sequelize")

const TEAMS_TABLE = "teams" 

class Teams extends Model { 
    static config(sequelize) {
        return {
            sequelize,
            tableName: TEAMS_TABLE,
            modelName: "Team",
            timestamps: false
        }
    }
}

const teamSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "name",
      },
}

module.exports = {
    Teams, 
    teamSchema
}