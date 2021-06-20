const express = require('express')
const route = express.Router()
const { Model } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middlewares/auth')

route.put("/login", async (req, res) => {
    let { email, password } = req.body

    let foundUser = await Model.findOne({ email: email}).select("+password")

    if(!foundUser)
    {
        return res.send({success: false, result: "Usuário não encontrado"})
    }

    if(bcrypt.compareSync(password, foundUser.password))
    {
        const token = jwt.sign({id: foundUser._id}, process.env.JWT_SECRET, { expiresIn: '7d' })
        foundUser.password=undefined
        return res.cookie('token', token, {path: "/", httpOnly: false, maxAge: 18000}).json({success: true, result: foundUser, token})
    }

    else
    {
        return res.send({success: false, result: "Credenciais incorretas"})
    }
})

route.get("/home", async (req, res) => 
{
    const { token } = req.cookies

    if(!token)
    {
        res.json({success: false, result: "Token não apresentado."})
        return;
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET)

    if(verify)
    {
        Model.findById(verify.id, (req, doc) => {
            res.json(doc)
        })
        
    }

    else
    {
        res.json({success: false, result: "Token inválido."})
    }
})

route.post("/register", async (req, res) => {

    let { username, email, password } = req.body

    password = await bcrypt.hash(password, 10)
    
    Model.create({username, email, password}, (err, doc) => 
    {
        if(err)
        {
            return res.json({success: false, result: err.message})
        }

        doc.password=undefined
        return res.json({success: true, result: doc})
    })
})

module.exports = (app) => {
    app.use("/user", route)
}