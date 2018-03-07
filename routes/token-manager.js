var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = 'H6k23H7d9Ak9';
exports.tokenValidator = expressJwt({
    secret: secret,
    getToken: function (req) {
        return req.cookies.authToken;
    }
}).unless({path: [
        // Caminhos que não exigirão login
        '/',
        '/cadastro',
        '/login',
        '/login/desconectar',
        {url: '/users', methods: ['POST']}
    ]});

exports.createToken = function (usuario) {
    return jwt.sign(usuario, secret, {expiresIn: '1d'});
};