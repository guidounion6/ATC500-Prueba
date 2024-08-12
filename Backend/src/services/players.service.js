const { models } = require("../libs/sequelize")
const { v4: uuidv4 } = require("uuid")

class PlayersService {
    constructor() { }

    async createPlayer(playerData) {
        const { player_id, name, team_name, image } = playerData
        const validatePlayer = await models.Player.findOne({ where: { player_id } })

        try {
            if (!validatePlayer) {
                const newPlayer = await models.Player.create({
                    id: uuidv4(),
                    player_id,
                    name,
                    team_name,
                    image,
                })
                return newPlayer
            }
        } catch (error) {
            return error
        }

    }

    async findPlayers() {
        try {
            return await models.Player.findAll()
        } catch (error) {
            console.log(error)
        }
    }


}

module.exports = PlayersService