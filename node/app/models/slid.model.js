    /**
     * Created by Admin on 15/12/2016.
     */


    var path = require("path");
    const fs = require('fs');
    var bodyParser = require('body-parser');

    var CONFIG = JSON.parse(process.env.CONFIG);

    var SlidModel = function (slid){
        this.type = slid && slid.type ? slid.type : null;
        this.id = slid && slid.id ?slid.id : null;
        this.title = slid && slid.title? slid.title : null;
        this.fileName = slid && slid.fileName? slid.fileName : null;
        var data = slid && slid.data ? slid.data : null;

        this.getData= function()
        {
            return this.data;
        };

        this.setData= function(data)
        {
            this.data = data;
        };

    }


    SlidModel.create= function(slid,callback) {

        // Vérifier que le slid est valide
        if(!slid.id || !slid.fileName || !slid.title || ! slid.type) {
            if (callback) {
                callback("Error : Slid passé en paramétre invalide");
            }
            return;
        }

        var dir = CONFIG.contentDirectory;

        var savedFile = path.join(dir, slid.fileName);

        var savedMeta= path.join(dir, slid.id + ".meta.json");

        var metaData = JSON.parse(JSON.stringify(slid))
        delete metaData.data;

        fs.writeFile(savedFile, slid.getData(), 'binary', function (err) {

            if(err) {
                if (callback) {
                    callback(err);
                }
                return;
            }

            fs.writeFile(savedMeta, JSON.stringify(metaData), 'utf8', function (err) {

                if(err) {
                    if (callback) {
                        callback(err);
                    }
                    return;
                }
                callback();
            });
        });

    }

    SlidModel.read= function(id,callback) {

        var dir = CONFIG.contentDirectory;

        fs.readFile(path.join(dir, id +".meta.json"), function(err,data) {

            if(err) {
                if (callback) {
                    callback(err);
                }
                return;
            }

            if (callback) {
                callback(null,JSON.parse(data));
            }

        });
    }

    SlidModel.update= function(slid,callback) {

        // Vérifier que le slid est valide
        if(!slid.id || !slid.fileName || !slid.title || ! slid.type) {
            if (callback) {
                callback("Error : Slid passé en paramétre invalide");
            }
            return;
        }
        var dir = CONFIG.contentDirectory;

        var savedMeta= path.join(dir, slid.id + ".meta.json");

        var metaData = JSON.parse(JSON.stringify(slid))
        delete metaData.data;

        fs.writeFile(savedMeta, JSON.stringify(metaData), 'utf8',  function (err) {
            console.log("Mon erreur" + err);
            if(err) {
                if (callback) {
                    callback(err);
                }
                return;
            }
            if (slid.data !=null && slid.data.length> 0 ) {
                var savedFile = path.join(dir, slid.fileName);
                fs.writeFile(savedFile, slid.getData(), 'binary', function (err) {

                    if(err) {
                        if (callback) {
                            callback(err);
                        }
                        return;
                    }
                });
            }
            callback();
        });

    }

    SlidModel.delete= function(id,callback) {

        var dir = CONFIG.contentDirectory;

        SlidModel.read(id, function (err,data) {

            var savedFile = path.join(dir, data.fileName);
            var savedMeta= path.join(dir, data.id + ".meta.json");

            fs.unlink(savedFile, function (err) {
                if(err) {
                    if (callback) {
                        callback(err);
                    }
                    return;
                }
                fs.unlink(savedMeta, function (err) {
                    if(err) {
                        if (callback) {
                            callback(err);
                        }
                        return;
                    }
                    callback();
                });
            });
        })

    }

    module.exports = SlidModel ;


