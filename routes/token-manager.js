var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = 'yyIzDPEWRwxeffVQAG5SyeDx2LxkV4vjxtJfAZQQ94JB96s3UJ05mV2jWdLGSHf';
exports.tokenValidator = expressJwt({
    secret: secret,
    getToken: function (req) {
        var token = req.headers['authorization'];
        if (token) {
            token = token.replace('Bearer ', '');
        }
        return token;
    }
}).unless({path: [
        // Caminhos que não exigirão login
        {url: '/'},
        {url: '/users', methods: ['POST']},
        {url: '/users/authenticate', methods: ['POST']}
    ]});

exports.createToken = function (user) {
    var payload = {
        name: user.name,
        email: user.email
    };
    return jwt.sign(payload, secret, {expiresIn: '1d'});
};