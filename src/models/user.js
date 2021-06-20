const database = require('../database')

const UserSchema = new database.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        maxLength: 20,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    valid: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    founds: {
        type: Number,
        default: 0.00
    },
    transactions: {
        type: Array,
        default: []
    },
    type: {
        type: Number,
        default: 0,
        required: true
    }
})

const Model = database.model('user', UserSchema)

module.exports = { UserSchema, Model}