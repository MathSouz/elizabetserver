const database = require('../database')

const TeamSchema = new database.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imgurl: {
        type: String,
    }
})

const TeamModel = database.model('team', TeamSchema)

module.exports = { TeamSchema, TeamModel }