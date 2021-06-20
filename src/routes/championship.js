const express = require('express')
const route = express.Router()
const { ChampionshipModel } = require('../models/championship')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isAdminAuthenticated } = require('../middlewares/auth')

route.put("/:id/addteam", isAdminAuthenticated, (req, res) => {
    const { id } = req.params
    const { team } = req.body

    if(!id)
    {
        return res.json({success: false, result: "ID do campeonato não especificado"})
    }

    if(!team)
    {
        return res.json({success: false, result: "Nenhuma equipe especificada"})
    }

    ChampionshipModel.updateOne({ _id: id }, {$push: {teams: {
        team: team
    }}}, (err, doc) => {
        if(err)
        {
            return res.json({success: false, result: err.message})
        }

        return res.json({success: true, result: doc})
    })
})

route.put("/:id/edit", isAdminAuthenticated, (req, res) => {
    const { id } = req.params
    const { name } = req.body

    if(!id)
    {
        return res.json({success: false, result: "ID do campeonato não especificado"})
    }

    ChampionshipModel.updateOne({ _id: id }, {
        name: name
    }, {}, (err, doc) => {
        if(err)
        {
            return res.json({success: false, result: err.message})
        }

        return res.json({success: true, result: doc})
    })
})

route.post("/create", isAdminAuthenticated, (req, res) => {
    const { name } = req.body
    
    ChampionshipModel.create({name}, (err, doc) => {
        if(err)
        {
            return res.json({success: false, result: err.message})
        }

        return res.json({success: true, result: doc})
    })
})

module.exports = (app) => {
    app.use("/championship", route)
}