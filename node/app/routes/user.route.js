/**
 * Created by Admin on 16/12/2016.
 */

// user.route.js
"use strict";

var express = require("express");
var router = express.Router();



var user = require('./../controllers/user.controllers');

router.route('/users')
    .get(user.list)
    .post(user.token,user.create);
router.route('/users/:userId')
    .get(user.read)
    .put(user.update)
    .delete(user.delete);
router.param('userId', function(req, res, next, id) {
    req.userId = id;

    next();
});

module.exports = router;