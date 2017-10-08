var express = require('express');
var router = express.Router();
var ms = require('mediaserver');

/* GET player page. */
router.get('/audio/*', function(req, res, next) {
  ms.pipe(req, res, "./filestore/media/audio/GTA/Little Bit of This.mp3");
});
router.get('/video/*', (req, res) => {
  ms.pipe(req, res, './filestore/media/video/GTA ft. Vince Staples - Little Bit of This.mp4');
});

module.exports = router;
