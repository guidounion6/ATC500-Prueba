const PlayersService = require("../services/players.service")


const playersService = new PlayersService()

const createPlayer = async (req, res) => {
    try {
        const player = await playersService.createPlayer(req.body)
        res.status(201).json({ message: "Jugador registrado en la db", player })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error al registrar jugador", error })
    }
}

const getPlayers = async (req, res) => {
    try {
        const allPlayers = await playersService.findPlayers()
        res.status(200).json({ message: "jugadores encontrados: ", allPlayers })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }
}



module.exports = {
    createPlayer,
    getPlayers

}