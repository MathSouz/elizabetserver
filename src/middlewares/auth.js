const jwt = require('jsonwebtoken')
const database = require('../database')
const { Model } = require('../models/user')

async function isAuthenticated(req, res, next)
{
    if(!req.cookies.token)
    {
        res.json({success: false, result: "Token não apresentado."})
        return;
    }

    if(jwt.verify(req.cookies.token, process.env.JWT_SECRET))
    {
        next()
    }

    else
    {
        res.json({success: false, result: "Token inválido."})
    }
}

async function isAdminAuthenticated(req, res, next)
{
    if(!req.cookies.token)
    {
        res.json({success: false, result: "Token não apresentado."})
        return;
    }

    const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET)

    const isAdmin = await Model.findOne({_id: payload.id, type: 1})

    if(payload)
    {
        if(!isAdmin)
        {
            return res.json({success: false, result: "Acesso restrito."})
        }

        next()
    }

    else
    {
        res.json({success: false, result: "Token inválido."})
    }
}

module.exports = { isAuthenticated, isAdminAuthenticated }