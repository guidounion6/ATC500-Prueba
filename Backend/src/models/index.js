const { User, userSchema } = require("./users.model");
const { Player, playerSchema } = require("./players.models");

function setupModels(sequelize) {
    User.init(userSchema, User.config(sequelize));
    Player.init(playerSchema, Player.config(sequelize))

}

module.exports = setupModels