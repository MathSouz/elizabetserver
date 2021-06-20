const express = require('express')
const route = express.Router()
const { TeamModel } = require('../models/teams')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isAdminAuthenticated } = require('../middlewares/auth')

route.put("/:id/setname", isAdminAuthenticated, (req, res) => {
    const { id } = req.params
    const { name } = req.body

    if(!id)
    {
        return res.json({success: false, result: "ID da equipe não especificada"})
    }

    if(!name)
    {
        return res.json({success: false, result: "Nome da equipe não especificada"})
    }

    TeamModel.updateOne({ _id: id }, {
        name: name
    }, (err, doc) => {
        if(err)
        {
            return res.json({success: false, result: err.message})
        }

        return res.json({success: true, result: doc})
    })
})

route.put("/:id/setimg", isAdminAuthenticated, (req, res) => {
    const { id } = req.params
    const { imgurl } = req.body

    if(!id)
    {
        return res.json({success: false, result: "ID do campeonato não especificado"})
    }

    TeamModel.updateOne({ _id: id }, {
        imgurl: imgurl
    }, (err, doc) => {
        if(err)
        {
            return res.json({success: false, result: err.message})
        }

        return res.json({success: true, result: doc})
    })
})

route.post("/add", isAdminAuthenticated, (req, res) => {
    const { name, imgurl } = req.body

    if(!name)
    {
        return res.json({success: false, result: "Nome da equipe não especificada"})
    }
    
    TeamModel.create({name, imgurl}, (err, doc) => 
    {
        if(err)
        {
            return res.json({success: false, result: err.message})
        }

        return res.json({success: true, result: doc})
    })
})

module.exports = (app) => {
    app.use("/teams", route)
}