const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const saudacao = require('./saudacaomid')
const usuarioApi = require('./api/usuario')
require('./api/procuto')(app, 'com param!')


app.post('/usuario', usuarioApi.salvar)
app.get('/usuario', usuarioApi.obter)

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(saudacao('Don'))

app.use((req, res, next) => {
    console.log('Antes')
    next()
})

app.get('/clientes/relatorio', (req, res) => {
    res.send(`Cliente relatório: completo = ${req.query.completo}, ano = ${req.query.ano}`)
})

app.post('/corpo', (req, res) => {
    // let corpo = ''
    // req.on('data', function(parte){
    //     corpo += parte
    // })
    // req.on('end', function(){
    //     res.send(corpo)
    // })
    res.send(req.body.nome)
})

app.get('/clientes/:id', (req, res, next) => {
    res.send(`Cliente ${req.params.id} selecionado!`)
})


app.get('/', (req, res, next) => {
    console.log('Durante')
    res.json({
        data: [
        {id: 7, nome: 'Ana', position: 1},
        {id: 35, nome: 'Bia', position: 2},
        {id: 73, nome: 'Carlos', position: 3}
        ],
        count: 30,
        skip: 0,
        limit: 3
})
next()
    // res.json({
    //     name: 'ipad 32Gb',
    //     price: 1899.00,
    //     disocunt: 0.12
    // })
    // res.send('estou vendo')
})

app.use((req, res, next) => {
    console.log('Depois')
    next()
})

app.listen(3000, () => {
    console.log('Backend executando')
})

