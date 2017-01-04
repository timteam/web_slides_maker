/**
 * Created by Admin on 16/12/2016.
 */


var path = require("path");
const fs = require('fs');
var express = require("express");
var slidModel = require("./../models/slid.model.js");
var utils = require("./../utils/utils.js");
var CONFIG = JSON.parse(process.env.CONFIG);



exports.list = function list(req, res){

    var dir = CONFIG.contentDirectory;
    var extension = "json";
    presentationList= {};

    fs.readdir(dir, function(err,list) {

        if (err) {
            console.log('Error reading directory ' + dir);
            console.log(err);
            return;
        }
        list.forEach(function(file) {

            if(path.extname(file) === "." + extension){

                var contents = fs.readFileSync(path.join(dir, file));
                var parsedFile = JSON.parse(contents);

                presentationList[parsedFile.id] = parsedFile;

            }
        });
        res.json(presentationList);

    });

}


exports.create = function create(req, res){
    if (!req.file) {
        console.log("No file to create");
        return res.json ("No file to create");
    }

    var uid = utils.generateUUID();
    console.log(req.file);
    var metadata = {
        id: uid,
        type:  utils.getFileType(req.file.mimetype),
        title: req.file.originalname.split('.')[0],
        fileName:  utils.getNewFileName(uid, req.file.originalname)
    }

    var slid = new slidModel(metadata);
    slid.setData(req.file.buffer);
    slidModel.create(slid, function(err) {
        if (err) {
            res.end(err);
        }
        res.end('ok');
    });
}


exports.read = function read(req, res){
    slidModel.read(req.params.slidId, function(err, slid) {
        if(err) return res.json(err);

        if(req.get('json')){
            return res.json(slid);
        }
        else{
            res.sendFile(path.join(__dirname, "../..", utils.getDataFilePath(slid.fileName)) );
        }
    });
}
