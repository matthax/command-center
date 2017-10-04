var express = require('express');
var router = express.Router();
var ms = require('mediaserver');

/* GET player page. */
router.get('/*', function(req, res, next) {
  ms.pipe(req, res, "./filestore/media/audio/50 Cent - In Da Club (San Holo Remix).mp3");
});

module.exports = router;
