const route = require('express').Router()

route.use('/users', require('./users'))
route.use('/products', require('./products'))
route.use('/log', require('./log'))
route.use('/wish',require('./wish'))
route.use('/message',require('./message'))

exports = module.exports = {
    route
}