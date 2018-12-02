const router = require('express').Router();
const checkJwt = require('./auth').checkJwt;

module.exports = (router) => {
    router.get('/api/test', (req,res,next) => {
        return res.send('Hello World');
    });
    router.get('/api/authtest', checkJwt, (req,res,next) => {
        return res.send('Hello Auth World');
    });
}
