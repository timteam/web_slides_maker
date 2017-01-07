/**
 * Created by Admin on 16/12/2016.
 */
"use strict";

// slid.route.js
var multer = require("multer");
var SlidController = require("./../controllers/slid.controller.js");
var express = require("express");
var router = express.Router();

module.exports = router;
var storage = multer.memoryStorage();
var multerMiddleware = multer({
    "storage": storage
});

router.get("/slids", function(request, response) {
    SlidController.list(request, response);
});

//crée la slide (create)
//@param file
router.post("/slids", multerMiddleware.single("file"), function(request, response) {
    SlidController.create(request, response);
});

//retourne slide (read)
/*@param slidId
 @return JSON */
router.route("/slids/:slidId").get(function(request, response) {
    SlidController.read(request, response);
});
