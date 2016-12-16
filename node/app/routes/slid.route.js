/**
 * Created by Admin on 16/12/2016.
 */
"use strict";

var multer = require("multer");
var SlidController = require("./../controllers/slid.controller.js");
var express = require("express");
var router = express.Router();


var storage = multer.memoryStorage();
var multerMiddleware = multer({"storage":storage});
router.route('/slids')
    .get(SlidController.list)
    .post(multerMiddleware.single("file"), function(request, response) {
        SlidController.create(request,response);
    });

router.route('/slids/:slidId')
    .get(SlidController.read);


router.param('slidId', function(req, res, next, id) {
    req.slidId = id;
    next();
});
module.exports = router;
