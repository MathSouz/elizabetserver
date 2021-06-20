const database = require('../database')

const ChampionshipSchema = new database.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    teams: {
        type: []
    }
})

const ChampionshipModel = database.model('championship', ChampionshipSchema)

module.exports = { ChampionshipSchema, ChampionshipModel }