var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const resolvePath = require('resolve-path');


const files = (root) => {
  /* GET files listing. */
  const base = path.basename(root);
  router.get('/*', function(req, res, next) {
    try {
      const fullpath = resolvePath(root, decodeURIComponent(req.path).substr(1));
      fs.stat(fullpath, (err, stats) => {
        if (err) res.send({error: err.message});
        else {
          if (stats.isDirectory()) {
            fs.readdir(fullpath, (err, files) => {
              if (err) res.send({error: err.message});
              else {
                res.send({
                  directory: path.relative(root, fullpath), // path.join(base, ...)
                  // base: base,
                  files: files,
                });
              }
            });
          }
          else if (stats.isFile()) {
            res.send({
              file: path.basename(fullpath),
              size: stats.size
            });
          }
          else {
            res.send({error: 'file not found'});
          }
        }
      });
    }
    catch (err) {
      res.send({error: err.message});
    }
  });
  return router;
}

module.exports = files;