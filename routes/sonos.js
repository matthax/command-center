var express = require('express');
var router = express.Router();
const sonos_api = require('sonos');
const Sonos = sonos_api.Sonos;

/**
 * curl -X GET "https://api.spotify.com/v1/search?q=Way+Down+Merkules&type=track" -H "Accept: application/json" -H "Authorization: Bearer BQCFxd3mzGU9ooHdqoXXkRsQEH5N2nZOczA1R4NaeB6HjcmSpxTGvpj3jFQI5TsbukF4aBSijwi4J2Fm2htIesfT3hQ6fGGfLeNU0LLoMe_KyiAPMgOHjic7cG7UxNe4g7FcAsW67-TQ2X5G8VIQfcorw7R6R4yY2k2fAR8E8BV9wyrIIg"
 * @param {*https://developer.spotify.com/web-api/console} sonos_host 
 */
// "spotify:track:2A64H8yfFoTbeuSLTijfT8"
// https://developer.spotify.com/web-api/console/
const SonosPlayer = (sonos_host) => {
  const sonos = new Sonos(sonos_host);
  router.get('/spotify/play', function(req, res, next) {
    const track = 'spotify:track:5a3cnyx9ic2LxkRiXj9PyW';
    sonos.play(track, (err, result) => {
      if (err) {
        console.error(err);
        res.send({error: err.message});
      }
      else {
        res.send(result);
      }
    })
  });
  router.get('/spotify/add', function(req, res, next) {
    const track = "2A64H8yfFoTbeuSLTijfT8";
    sonos.addSpotify(track, (err, result) => {
      if (err) {
        console.error(err);
        res.send({error: err.message});
      }
      else {
        res.send(result);
      }
    })
  });
  router.get('/spotify/radio', (req, res) => {
    sonos.playSpotifyRadio("4oYZcPoj3q3DneXomtQBzg", "Merkules", (err, result) => {
      if (err) {
        console.error(err);
        res.send({error: err.message});
      }
      else res.send(result);
    });
  });
  router.get('/state', (req, res) => {
    sonos.getCurrentState((err, track) => {
      if (err) res.send({error: err.message});
      else res.send({track});
    })
  });
  router.get('/current', (req, res) => {
    sonos.currentTrack((err, track) => {
      if (err) res.send({error: err.message});
      else {
        sonos.getCurrentState((err, state) => {
          if (err) res.send({error: err.message, track});
          else res.send({track, state});
        });
      }
    });
  });
  router.get('/play', (req, res) => {
    sonos.play((err, playing) => {
      if (err) res.send({error: err.message});
      else res.send({playing});
    })
  });
  router.get('/pause', (req, res) => {
    sonos.pause((err, paused) => {
      if (err) res.send({error: err.message});
      else res.send({paused});
    });
  });
  router.get('/search', (req, res) => {
    sonos.searchMusicLibrary('tracks', 'Way Down', {}, (err, results) => {
      if (err) res.send({error: err.message});
      else res.send(results);
    })
  });
  router.get('/devices', (req, res) => {
    const devices = [];
    const collect = (device, model) => {
      devices.push({ device, model });
    };
    sonos_api.search({timeout: 2000}, collect);
    setTimeout(() => {
      res.send(devices);
    }, 2000);
  });

  return router;
};

module.exports = SonosPlayer;
