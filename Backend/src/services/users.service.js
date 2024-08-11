const { models } = require("../libs/sequelize");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");


class UsersService {
    constructor() { }

    async register(userData) {
        const { name, email, password } = userData
        const hashedPassword = await bcrypt.hash(password, 10)
        const validateUser = await models.User.findOne({ where: { email } })

        try {
            if (!validateUser) {
                const user = await models.User.create({
                    id: uuidv4(),
                    name,
                    email,
                    password: hashedPassword,
                })
                return user
            } 
        } catch (error) {
            return error
        }
    }
   
    async findByEmail(email) {
        return await models.User.findOne({ where: { email } });
      }
}

module.exports = UsersService; 