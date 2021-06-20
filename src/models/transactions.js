const database = require('../database')

const TransactionSchema = database.Schema({
    user: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    when: {
        type: Date,
        default: Date.now
    }
})
const TransactionModel = database.model('transaction', TransactionSchema)

module.exports = { TransactionSchema, TransactionModel}