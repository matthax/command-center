var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const resolvePath = require('resolve-path');
const jsmediatags = require("jsmediatags");


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
  const supported_tag_files = ['.mp3', '.mp4', '.flac'];
  const tags = (file, tags) => {
    const extension = path.extname(file).toLocaleLowerCase();
    tags = tags || [
      'title',
      'artist',
      'album',
      'year',
      'track',
      'genre',
    ];
    if (supported_tag_files.indexOf(extension) >= 0) {
      return new Promise((resolve, reject) => {
        new jsmediatags.Reader(file).setTagsToRead(tags).read({
          onSuccess: resolve,
          onError: reject,
        });
      });
    }
    else return new Promise((resolve, reject) => {
      resolve({});
    });
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
                  const filepath = path.join(fullpath, file);
                  fs.stat(filepath, (err, stats) => {
                    if(err) reject(err);
                    else resolve({file, filepath, stats});
                  });
                });
              })).then((filestats) => {
                const files = Promise.all(filestats.map(({file, filepath, stats}) => {

                  const details = {
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
                  };
                  if (details.isDirectory) {
                    return new Promise((resolve, reject) => {
                      resolve(details);
                    });
                  }
                  return tags(filepath).then((tag) => {
                    details.tag = tag;
                    return details;
                  }).catch((err) => {
                    console.error(err);
                    details.error = err.message;
                    return details;
                  });
                })).then((files) => {
                  res.send({
                    directory: path.relative(root, fullpath),
                    files: files.filter((file) => !file.ignore),
                  });
                });
              });
            });
          }
          else if (stats.isFile()) {
            const file = path.basename(fullpath);
            const details = {
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
            };
            tags(fullpath, ['title', 'artist', 'album', 'year', 'track', 'genre', 'picture']).then((tag) => {
              details.tag = tag;
              res.send(details);
            }).catch((err) => {
              details.error = err.message;
              res.send(details);
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