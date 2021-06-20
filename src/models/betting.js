const database = require('../database')
const { TransactionModel } = require('./transactions')

const BettingSchema = new database.Schema({
    homeTeam: {
        type: String,
        required: true
    },
    awayTeam: {
        type: String,
        required: true
    },
    bets: {
        type: [TransactionModel]
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
    endedAt: {
        type: Date
    }
})

const BettingModel = database.model('betting', BettingSchema)

module.exports = { BettingSchema, BettingModel }