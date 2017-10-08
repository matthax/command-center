var express = require('express');
var router = express.Router();
const path = require('path');
var ms = require('mediaserver');

const player = (root) => {
  const media = path.join(root, 'media');
  const audio = path.join(media, 'audio');
  const video = path.join(media, 'video');
  /* GET player page. */
  router.get('/audio/:file', function(req, res, next) {
    try {
      const fullpath = path.join(audio, req.params.file);
      console.log(req.params.file, fullpath);
      ms.pipe(req, res, fullpath);
    }
    catch (err) {
      res.send({error: err.message});
    }
    
  });
  return router;
};

module.exports = player;
