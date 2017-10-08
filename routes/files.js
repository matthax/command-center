var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const resolvePath = require('resolve-path');


const files = (root, media_extensions, ignore_extensions) => {
  /* GET files listing. */
  const base = path.basename(root);
  const playable = media_extensions || [ '.mp3', '.mp4' ];
  const isPlayable = (file) => playable.indexOf(path.extname(file)) >= 0;
  const ignore = ignore_extensions || [ /\.gitignore/gi ];
  const isIgnored = (file) => {
    return ignore.filter((ext) => {
      if (ext && typeof ext.test !== 'undefined') return ext.test(file);
      else return path.extname(file).toLocaleLowerCase() === ext;
    }).length > 0;
  };
  router.get('/*', function(req, res, next) {
    try {
      const fullpath = resolvePath(root, decodeURIComponent(req.path).substr(1));
      fs.stat(fullpath, (err, stats) => {
        if (err) res.send({error: err.message});
        else {
          if (stats.isDirectory()) {
            fs.readdir(fullpath, (err, files) => {
              if (err) res.send({error: err.message});
              Promise.all(files.map((file) => {
                return new Promise((resolve, reject) => {
                  fs.stat(path.join(fullpath, file), (err, stats) => {
                    if(err) reject(err);
                    else resolve({file, stats});
                  });
                });
              })).then((filestats) => {
                const files = filestats.map(({file, stats}) => {
                  return { 
                    file, 
                    playable: isPlayable(file), 
                    ignore: isIgnored(file), 
                    isFile: stats.isFile(), 
                    isDirectory: stats.isDirectory(), 
                    size: stats.size,
                    created: stats.birthtime,
                    modified: stats.mtime,
                    accessed: stats.atime,
                    changed: stats.ctime,
                  }
                }).filter((file) => !file.ignore);
                res.send({
                  directory: path.relative(root, fullpath),
                  files
                })
              });
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