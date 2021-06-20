const mongoose = require('mongoose')

const host = process.env.HOST;

mongoose.connect(host, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err) => {
    if(err)
    {
        console.log(err.message);
        return;
    }

    console.log("Conexão com o bando de dados em " + host + " estabelecida.");
})

module.exports = mongoose