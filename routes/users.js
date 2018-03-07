var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

/* GET users */
/* @todo Admin only route */
router.get('/', function (req, res, next) {
    User.find()
            .then(function (rows) {
                res.json(rows);
            })
            .catch(function (err) {
                console.error(err);
                next({'status': 500, 'message': 'An error occurred while getting the users.'});
            });
});

/* GET user */
/* @todo Admin only route, or for the proper user */
router.get('/:id', function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send();
    }
    User.findById(req.params.id)
            .then(function (user) {
                if (user) {
                    res.json(user);
                } else {
                    res.status(404).send();
                }
            })
            .catch(function (err) {
                console.error(err);
                next({'status': 500, 'message': 'An error occurred while getting the user.'});
            });
});

/* POST user. */
router.post('/', function (req, res, next) {
    var newUser = new User(req.body);
    var crypto = require('crypto');
    newUser.password = crypto.createHash('md5').update(newUser.password).digest('hex');
    newUser.save()
            .then(function (user) {
                res.status(201).send();
            })
            .catch(function (err) {
                console.error(err);
                if (err.name === 'ValidationError') {
                    next({'status': 400, 'message': err.message});
                } else {
                    next({'status': 500, 'message': 'An error occurred while saving the user.'});
                }
            });
});

/* PUT user. */
/* @todo Admin only route, or for the proper user */
router.put('/:id', function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send();
    }
    var crypto = require('crypto');
    User.findById(req.params.id).select('+password')
            .then(function (user) {
                if (user) {
                    user.name = req.body.name;
                    user.email = req.body.email;
                    if (req.body.password) {
                        user.password = crypto.createHash('md5').update(req.body.password).digest('hex');
                    } else {
                        // Will result in a validation error, so the user will receive the notification for that
                        user.password = null;
                    }
                    return user.save();
                }
                return false;
            })
            .then(function (user) {
                if (user === false) {
                    res.status(404).send();
                } else {
                    res.status(204).send();
                }
            })
            .catch(function (err) {
                console.error(err);
                if (err.name === 'ValidationError') {
                    next({'status': 400, 'message': err.message});
                } else {
                    next({'status': 500, 'message': 'An error occurred while saving the user.'});
                }
            });
});

/* DELETE user. */
/* @todo Admin only route */
router.delete('/:id', function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send();
    }
    User.findById(req.params.id)
            .then(function (user) {
                if (user) {
                    return user.remove();
                }
                return false;
            })
            .then(function (user) {
                if (user === false) {
                    res.status(404).send();
                } else {
                    res.status(204).send();

                }
            })
            .catch(function (err) {
                console.error(err);
                next({'status': 500, 'message': 'An error occurred while deleting the user.'});
            });
});

module.exports = router;
