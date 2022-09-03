function saudacao(nome){
    return function(req, res, next){
        console.log(`Saudação ${nome}.`)
        next()
    }
}

module.exports = saudacao