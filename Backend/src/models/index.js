const { User, userSchema } = require("./users.model");

function setupModels(sequelize) {
    User.init(userSchema, User.config(sequelize));
}

module.exports = setupModels